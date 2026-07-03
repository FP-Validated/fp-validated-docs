import os
from web3 import Web3

w3 = Web3(Web3.HTTPProvider(os.getenv('RPC_URL', 'http://127.0.0.1:8545')))
token = Web3.to_checksum_address(os.getenv('CONTRACT_ADDRESS', '0xdAC17F958D2ee523a2206206994597C13D831ec7'))
erc20 = w3.eth.contract(address=token, abi=[
    {'type': 'function', 'name': 'symbol', 'stateMutability': 'view', 'inputs': [], 'outputs': [{'type': 'string'}]},
    {'type': 'function', 'name': 'decimals', 'stateMutability': 'view', 'inputs': [], 'outputs': [{'type': 'uint8'}]},
])
print({'token': token, 'symbol': erc20.functions.symbol().call(), 'decimals': erc20.functions.decimals().call()})
