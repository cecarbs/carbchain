import time
import json

from blockchain_config.util.crypto_hash import crypto_hash
from blockchain_config.util.hex_to_binary import hex_to_binary
from blockchain_config.config import MINE_RATE

GENESIS_DATA = {
    "timestamp": 1,
    "last_hash": "genesis_last_hash",
    "hash": "genesis_hash",
    "data": [],
    "difficulty": 3,
    "nonce": "genesis_nonce"
}

class Block:
    """
    Block: a unit of storage
    Store transactions in a blockchain that supports a cryptocurrency
    """
    
    def __init__(self, timestamp, last_hash, hash, data, difficulty, nonce):
        self.timestamp = timestamp
        self.last_hash = last_hash
        self.hash = hash
        self.data = data
        self.difficulty = difficulty
        self.nonce = nonce

    def __repr__(self):
        return (
            '\nBLOCK\n'
            f'Timestamp: {self.timestamp},\n'
            f'Last_hash: {self.last_hash},\n'
            f'Hash: {self.hash},\n'
            f'Data: {self.data},\n'
            f'Difficulty: {self.difficulty},\n'
            f'Nonce: {self.nonce}\n'
        )

    def __eq__(self, other):
        return self.__dict__ == other.__dict__

    def convert_to_json(self):
        """
        Serialize the block into a dictionary
        """
        return self.__dict__

    @staticmethod    
    def mine_block(last_block, data):
        """
        Mine a block based on the given last_block and data, until a block hash is found that meets the leading 0's proof of work requirement.
        """
        timestamp = time.time_ns()
        last_hash = last_block.hash
        difficulty = Block.adjust_difficulty(last_block, timestamp)
        nonce = 0
        hash = crypto_hash(timestamp, last_hash, data, difficulty, nonce)

        # call hex_to_binary changes the leading 0's requirement is based on the binary string representation of the hash
        while hex_to_binary(hash)[0:difficulty] != '0' * difficulty:
            nonce += 1
            # want to make sure we have the correct nano second time b/c while loop could take some time
            timestamp = time.time_ns()
            # we wanna pass in the most recent time available especially since we need to know the time between mine blocks
            difficulty = Block.adjust_difficulty(last_block, timestamp)
            # regenerate the hash with the same inputs
            hash = crypto_hash(timestamp, last_hash, data, difficulty, nonce)
            # with the inputs staying the same and only the nonce changing, we're guaranteed to find Proof-of-Work
        
        # once block is verified we return an instance of the new block 
        return Block(timestamp, last_hash, hash, data, difficulty, nonce)
        

    @staticmethod
    def genesis():
        """
        Generate the genesis block.
        """
        return Block(**GENESIS_DATA)

    @staticmethod
    def convert_from_json(block_json):
        """
        Deserialize JSON version of block into a Block class. 
        """
        
        # serialize data for http requests
        if isinstance(block_json, dict):
            return Block(**block_json)
        # serialize data for redis message
        else:
            block = json.loads(block_json)
            return Block(**block)
        
    @staticmethod
    def adjust_difficulty(last_block, new_timestamp):
        """
        Calculate the adjusted diffuclty according to the MINE_RATE
        Increase the difficulty for quickly mined blocks.
        Decrease the difficulty for the slowly mined blocks.
        """
        if (new_timestamp - last_block.timestamp) < MINE_RATE:
            return last_block.difficulty + 1
        if (last_block.difficulty - 1) > 0:
            return last_block.difficulty - 1
        
        return 1
    
    @staticmethod
    def is_valid(last_block, block):
        """
        Validate a block by enforcing the following rules:
        1) block's last_hash value must have the hash value of the block before it
        2) block must have proper proof of work (i.e correct number of leading 0's)
        3) difficulty can only be adjusted by increments of 1 (one) 
        4) block hash must be a combination of it's fields (if regenerated block based on its values does not produce same hash, it has been tampered with)
        """
        if block.last_hash != last_block.hash:
            raise Exception("The block's last hash must be correct")

        if hex_to_binary(block.hash)[0:block.difficulty] != "0" * block.difficulty:
            raise Exception("Proof of work requirement was not met")

        if abs(last_block.difficulty - block.difficulty) > 1:
            raise Exception("The block's difficulty must only adjust by 1")

        regenerated_hash = crypto_hash(block.timestamp, block.last_hash, block.data, block.nonce, block.difficulty)

        if block.hash != regenerated_hash:
            raise Exception("The block's hash is incorrect")

def main():
    genesis_block = Block.genesis()
    bad_block = Block.mine_block(Block.genesis(), 'foo')
    bad_block.last_hash = "tampered_data"

    try:
        Block.is_valid(genesis_block, bad_block)
    except Exception as e:
        print(f"is_valid_block: {e}")

if __name__ == '__main__':
    main()