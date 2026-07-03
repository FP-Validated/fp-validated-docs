import { request } from 'undici';

export type DeadlineOptions = { timeoutMs?: number };

export class SuiGrpcClient {
  constructor(readonly endpoint = process.env.SUI_GRPC_ENDPOINT ?? 'http://127.0.0.1:9000') {}

  async unary<TRequest extends object, TResponse>(service: string, method: string, body: TRequest, options: DeadlineOptions = {}): Promise<TResponse> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 5_000);
    try {
      const response = await request(`${this.endpoint}/${service}/${method}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'content-type': 'application/json' },
        signal: controller.signal,
      });
      const text = await response.body.text();
      if (response.statusCode >= 400) throw new Error(`${service}/${method} HTTP ${response.statusCode}: ${text}`);
      return JSON.parse(text) as TResponse;
    } finally {
      clearTimeout(timeout);
    }
  }
}

export class SuiGraphQLClient {
  constructor(readonly endpoint = process.env.SUI_GRAPHQL_ENDPOINT ?? 'https://fullnode.mainnet.sui.io/graphql') {}

  async query<T>(query: string, variables: Record<string, unknown>): Promise<T> {
    const response = await request(this.endpoint, {
      method: 'POST',
      body: JSON.stringify({ query, variables }),
      headers: { 'content-type': 'application/json' },
    });
    const json = await response.body.json() as { data?: T; errors?: unknown };
    if (response.statusCode >= 400 || json.errors) throw new Error(`GraphQL query failed: ${JSON.stringify(json.errors ?? response.statusCode)}`);
    return json.data as T;
  }
}
