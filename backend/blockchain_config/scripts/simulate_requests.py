import requests
import time
from blockchain_config.wallet.wallet import Wallet

BASE_URL = "http://localhost:8000"

recipient = Wallet().address

def get_blockchain():
    return requests.get(f"{BASE_URL}/api/blockchain").json()

def get_blockchain_mine():
    return requests.get(f"{BASE_URL}/api/blockchain/mine").json()

def post_transaction(recipient, amount):
    return requests.post(f"{BASE_URL}/api/blockchain/transaction", json={"recipient": recipient, "amount": amount}).json()

def get_wallet_info():
    return requests.get(f"{BASE_URL}/api/blockchain/balance").json()

start_blockchain = get_blockchain()
print(f"\nINITIAL BLOCKCHAIN:\n{start_blockchain}\n")

transaction_wallet_one = post_transaction(recipient, 50)
print(f"\nPOST TRANSACTION ONE:\n{transaction_wallet_one}\n")

time.sleep(1)
transaction_wallet_two = post_transaction(recipient, 20)
print(f"\nPOST TRANSACTION TWO:\n{transaction_wallet_two}\n")

# since previous function calls take time, wait for them to post transaction to pool
time.sleep(1)
mine_blockchain = get_blockchain_mine()
print(f"\nMINE BLOCK:\n{mine_blockchain}\n")

wallet_info = get_wallet_info()
print(f"\nWALLET INFO:\n{wallet_info}\n")