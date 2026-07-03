import os
import sys
from web3 import Web3

w3 = Web3(Web3.HTTPProvider(os.getenv('RPC_URL', 'http://127.0.0.1:8545')))
block_id = sys.argv[1] if len(sys.argv) > 1 else 'latest'
block = w3.eth.get_block(block_id)
print({'number': block['number'], 'hash': block['hash'].hex(), 'transactions': len(block['transactions'])})
