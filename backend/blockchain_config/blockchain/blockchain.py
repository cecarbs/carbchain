# from backend.blockchain.block import Block
import json

from blockchain_config.blockchain.block import Block
from blockchain_config.wallet.transactions import Transaction
from blockchain_config.wallet.wallet import Wallet
from blockchain_config.config import MINING_REWARD_INPUT

class Blockchain:
    """
    Blockchain: a public ledger of transactions
    Implemented as a list of blocks - data sets of transactions
    """

    def __init__(self):
        self.chain = [Block.genesis()]

    def add_block(self, data):
        self.chain.append(Block.mine_block(self.chain[-1], data))

    def __repr__(self):
        return f'Blockchain: {self.chain} \n'
    
    def replace_chain(self, chain):
        """
        Replace the local chain with the incoming one if the following applies:
        1) The incoming chain is longer than the local one
        2) The incoming chain is formatted properly
        """
 
        if len(chain) <= len(self.chain):
            raise Exception("The incoming chain must be longer")

        try:
            Blockchain.is_valid(chain)
        except Exception as e:
            raise Exception(f'The incoming chain is invalid')
        
        self.chain = chain
        
    def convert_to_json(self):
        """
        Serialize the blockchain into a list of blocks
        """
        serialized_chain = [block.convert_to_json() for block in self.chain]
        
        return serialized_chain

    @staticmethod
    def convert_from_json(json_chain):
        """
        Deserialize a list of serialized blocks in a blockchain instance. Result will contain a chain list of Block instances.
        """

        blockchain = Blockchain()
        
        blockchain.chain = [Block.convert_from_json(chain) for chain in json_chain]

        return blockchain

    @staticmethod
    def is_valid(chain):
        """
        Validates incoming chain
        Enforce the following rules of the blockchain:
        1) chain must start with genesis block
        2) blocks must be formatted correctly
        """ 

        if chain[0] != Block.genesis():
            raise Exception("Genesis block must be valid")

        for idx, block in enumerate(chain[1:], 1):
            block = chain[idx]
            last_block = chain[idx-1]
            Block.is_valid(last_block, block)
    
    @staticmethod
    def is_valid_transaction_chain(chain):  
        """
        Enforces rules of blockchain for blocks of transactions
        1) Each transaction must only appear once in the chain
        2) Can only be ONE mining reward per block
        3) Each transaction must be valid
        """
        transaction_ids = set()

        # every transaction should be unique
        for i in range(len(chain)):
            block = chain[i]
            has_mining_reward = False
            for json_transaction in block.data:
                transaction = Transaction.convert_from_json(json_transaction)
              
                if transaction.id in transaction_ids:
                    raise Exception(f"Transaction: {transaction.id} is not unique")

                transaction_ids.add(transaction.id)

                if transaction.metadata == MINING_REWARD_INPUT:
                    if has_mining_reward:
                        raise Exception(f"Only one mining reward per block. Check block with hash: {block.hash}")
                    has_mining_reward = True
                else:
                    historic_blockchain = Blockchain()
                    historic_blockchain.chain = chain[0:i]

                    historic_balance = Wallet.calculate_balance(historic_blockchain, transaction.metadata['address'])

                    if historic_balance != transaction.metadata['amount']:
                        raise Exception(f"Transaction: {transaction.id} has an invalid metadata amount")

                Transaction.is_valid_transaction(transaction)

if __name__ == "__main__":
    # CarbCoin = Blockchain()
    # CarbCoin.add_block(5)
    # CarbCoin.add_block(2)
    # print(CarbCoin)

    blockchain = Blockchain()

    for i in range(3):
        blockchain.add_block(i)

    # print(blockchain)
    print(len(blockchain.chain))

    CarbCoin = Blockchain()
    CarbCoin.replace_chain(blockchain.chain)

    print(len(CarbCoin.chain))

    print(blockchain)
    print(CarbCoin)