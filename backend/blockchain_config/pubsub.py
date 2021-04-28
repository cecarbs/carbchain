import redis
import json

from blockchain_config.blockchain.block import Block
from blockchain_config.wallet.transactions import Transaction

TEST_CHANNEL = "TEST_CHANNEL"
BLOCK_CHANNEL = "BLOCK_CHANNEL"
TRANSACTION_CHANNEL = "TRANSACTION_CHANNEL"
HOST = "redis://:p25ff64f1925b72285424091bbfb23557d0db167c98a5f7eaf5325b068d161476@ec2-52-205-42-119.compute-1.amazonaws.com:32579"

class Listener():
    def __init__(self):
        self.r = redis.Redis(host="localhost", port=6379, db=0, decode_responses=True)
        self.p = r.pubsub()
        self.p.subscribe(BLOCK_CHANNEL)

    def listen(self):
        pass

class PubSub:
    """
    Handles the pub/sub layer of the application
    Provides communication between nodes of the blockchain network
    """
    def __init__(self, blockchain, transaction_pool):
        """
        Creates an instance of the Redis class
        """
        self.blockchain = blockchain
        self.transaction_pool = transaction_pool
        self.r = redis.Redis(host="localhost", port=6379, db=0, decode_responses=True)
        self.p= self.r.pubsub() # creates pubsub object that subscribes to channels and listens for new messages
        self.p.subscribe(**{BLOCK_CHANNEL: self.event_handler, TRANSACTION_CHANNEL: self.event_handler})
        thread = self.p.run_in_thread(sleep_time=0.001)

    def event_handler(self, message):
            if message['channel'] == BLOCK_CHANNEL:
                block = Block.convert_from_json(message['data'])
                
                # make a copy of the blockchain
                potential_chain = self.blockchain.chain[:]
                potential_chain.append(block)

                # can result in an exception due to validation errors
                try:
                    self.blockchain.replace_chain(potential_chain)
                    self.transaction_pool.clear_blockchain_transaction(self.blockchain)
                    print('\nSuccessfully replaced local chain')
                except Exception as e:
                    print(f'\nUnable to replace chain: {e}')

            elif message['channel'] == TRANSACTION_CHANNEL:
                # When transaction is broadcasted, share the transaction data with everyone in the network
                transaction = Transaction.convert_from_json(message['data'])
                self.transaction_pool.set_transaction(transaction)
                print(f"\nCHANNEL: {TRANSACTION_CHANNEL}\nMESSAGE: {transaction.__dict__}")
                print("\nSet the new transaction in the transaction pool")

    def publish_message(self, channel, message):
        """
        Publish the message object to the channel, also returns the number of subscribers the message was delivered to
        """
        self.r.publish(channel, message)
    
    def get_message(self):
        """
        Retrieves message from pubsub object
        """
        self.p.get_message()
        message = self.p.get_message()['data']

        print(message)
    
    def broadcast_block(self, block):
        # need to convert to actual json for other subscribers to read data
        # self.publish_message(BLOCK_CHANNEL, json.dumps(block))
        self.publish_message(BLOCK_CHANNEL, json.dumps(block.convert_to_json()))
    
    def broadcast_transaction(self, transaction):
        """
        Broadcast transaction to all nodes
        """
        # json.dumps is experimental
        self.publish_message(TRANSACTION_CHANNEL, json.dumps(transaction.convert_to_json()))

if __name__ == '__main__':
    pubsub = PubSub()
    pubsub.publish_message(TEST_CHANNEL, 'testing')
    