import pg from 'pg';
import type { MoveEventEnvelope } from './bcs-decode';

export class PostgresEventWriter {
  private pool: pg.Pool;

  constructor(connectionString = process.env.DATABASE_URL) {
    if (!connectionString) throw new Error('DATABASE_URL is required');
    this.pool = new pg.Pool({ connectionString });
  }

  async migrate(): Promise<void> {
    await this.pool.query(`
      create table if not exists sui_move_events (
        tx_digest text not null,
        event_seq integer not null,
        checkpoint bigint not null,
        event_type text not null,
        payload jsonb not null,
        inserted_at timestamptz not null default now(),
        primary key (tx_digest, event_seq)
      );
      create table if not exists sui_indexer_state (
        id text primary key,
        last_checkpoint bigint not null
      );
    `);
  }

  async lastCheckpoint(): Promise<number> {
    const result = await this.pool.query('select last_checkpoint from sui_indexer_state where id = $1', ['default']);
    return Number(result.rows[0]?.last_checkpoint ?? 0);
  }

  async writeEvent(event: MoveEventEnvelope, payload: Record<string, unknown>): Promise<void> {
    await this.pool.query('begin');
    try {
      await this.pool.query(
        `insert into sui_move_events (tx_digest, event_seq, checkpoint, event_type, payload)
         values ($1, $2, $3, $4, $5)
         on conflict (tx_digest, event_seq) do nothing`,
        [event.txDigest, event.eventSeq, event.checkpoint, event.type, payload],
      );
      await this.pool.query(
        `insert into sui_indexer_state (id, last_checkpoint) values ($1, $2)
         on conflict (id) do update set last_checkpoint = greatest(sui_indexer_state.last_checkpoint, excluded.last_checkpoint)`,
        ['default', event.checkpoint],
      );
      await this.pool.query('commit');
    } catch (error) {
      await this.pool.query('rollback');
      throw error;
    }
  }
}
