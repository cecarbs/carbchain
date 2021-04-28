import redis
import time
import json
import os
import requests

"""
To run python -m scripts.peer_instance (inside blockchain_config)
Run central node first (python manage.py runserver)

TESTING: INCOMING CHAIN AFTER FIRST API CALL TO MINE WILL BE INVALID
"""
from blockchain_config.pubsub import PubSub
from blockchain_config.blockchain.blockchain import Blockchain
from blockchain_config.wallet.transaction_pool import TransactionPool

# Peer Instance
blockchain = Blockchain()
transaction_pool = TransactionPool()
pubsub = PubSub(blockchain, transaction_pool)
