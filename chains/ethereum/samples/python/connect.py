import os
from web3 import Web3

rpc_url = os.getenv('RPC_URL', 'http://127.0.0.1:8545')
w3 = Web3(Web3.HTTPProvider(rpc_url, request_kwargs={'timeout': 10}))
print({'connected': w3.is_connected(), 'chain_id': w3.eth.chain_id, 'block_number': w3.eth.block_number})
