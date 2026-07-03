import os
from web3 import Web3

w3 = Web3(Web3.HTTPProvider(os.getenv('RPC_URL', 'http://127.0.0.1:8545')))
latest = w3.eth.block_number
from_block = max(0, latest - int(os.getenv('LOG_LOOKBACK_BLOCKS', '100')))
address = Web3.to_checksum_address(os.getenv('CONTRACT_ADDRESS', '0xdAC17F958D2ee523a2206206994597C13D831ec7'))
transfer_topic = Web3.keccak(text='Transfer(address,address,uint256)').hex()
logs = w3.eth.get_logs({'fromBlock': from_block, 'toBlock': latest, 'address': address, 'topics': [transfer_topic]})
print({'from_block': from_block, 'to_block': latest, 'count': len(logs)})
