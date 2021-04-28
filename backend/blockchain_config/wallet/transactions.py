import uuid
import time
import json

from blockchain_config.wallet.wallet import Wallet
from blockchain_config.config import MINING_REWARD, MINING_REWARD_INPUT

class Transaction:
    """
    Document an exchange in currency from a sender to one or more recipients
    Basis for a distributed ledger
    Follows a one transaction per sender per block rule
    """
    def __init__(self, sender_wallet=None, recipient=None, amount=None, id=None, transaction_data=None, metadata=None):
        self.id = id or str(uuid.uuid4())[0:8]
        self.transaction_data = transaction_data or self.create_transaction_data(
            sender_wallet,
            recipient,
            amount
        )
        self.metadata = metadata or self.create_metadata(sender_wallet, self.transaction_data)

    def create_transaction_data(self, sender_wallet, recipient, amount):
        """
        Structure the output data for the transaction
        """

        if amount > sender_wallet.balance:
            raise Exception("Cannot send more than current balance of wallet")
        transaction_data = {}
        transaction_data[recipient] = amount
        transaction_data[sender_wallet.address] = sender_wallet.balance - amount

        return transaction_data

    def create_metadata(self, sender_wallet, transaction_data):
        """
        Structure the input data for the transaction
        Signs the transaction (includes the sender's public key and address)
        """
        return {
            "timestamp": time.time_ns(),
            "amount": sender_wallet.balance,
            "address": sender_wallet.address,
            "public_key": sender_wallet.public_key,
            "signature": sender_wallet.sign(transaction_data)
        }   
    
    def update(self, sender_wallet, recipient, amount):
        """
        Updates the transaction with an existing or new recipient
        """
        if amount > self.transaction_data[sender_wallet.address]:
            raise Exception("Cannot send more than current balance of wallet")
        
        # Send more to same address
        if recipient in self.transaction_data:
            self.transaction_data[recipient] = self.transaction_data[recipient] + amount
        # Send to a different recipient:
        else:
            self.transaction_data[recipient] = amount
        
        self.transaction_data[sender_wallet.address] = self.transaction_data[sender_wallet.address] - amount

        self.metadata = self.create_metadata(sender_wallet, self.transaction_data)
    
    def convert_to_json(self):
        """
        Serialize transaction
        """
        return self.__dict__

    @staticmethod
    def convert_from_json(transaction_json):
        """
        Deserialize a transaction JSON representation back into Transaction instance
        """    
        # serialize data for http requests
        if isinstance(transaction_json, dict):
            return Transaction(**transaction_json)
        # serialize data for redis message
        else:
            transaction = json.loads(transaction_json)
            return Transaction(**transaction)

    @staticmethod
    def is_valid_transaction(transaction):
        """
        Validates a transaction and raises exception for invalid transactions
        """
        if transaction.metadata == MINING_REWARD_INPUT:
            if list(transaction.transaction_data.values()) != [MINING_REWARD]:
                raise Exception("This is an invalid mining reward")
            return 
            
        transaction_data_total = sum(transaction.transaction_data.values())

        if transaction.metadata['amount'] != transaction_data_total:
            raise Exception("Invalid transaction -- metadata does not match transaction data")

        if not Wallet.verify(transaction.metadata['public_key'], transaction.transaction_data, transaction.metadata['signature']):
            raise Exception("Invalid signature")
    
    @staticmethod
    def reward_transaction(miner_wallet):
        """
        Generates reward for miner for mining a block 
        """
        transaction_data = {}
        transaction_data[miner_wallet.address] = MINING_REWARD

        return Transaction(metadata=MINING_REWARD_INPUT, transaction_data=transaction_data)

def main():
    # Wallet represents sender
    transaction = Transaction(Wallet(), "recipient", 15)
    print(f"\nTransaction: {transaction.__dict__}\n")

    transaction_json = transaction.convert_to_json()
    restored_transaction = Transaction.convert_from_json(transaction_json)
    print(f"\nRestored Transaction: {restored_transaction.__dict__}\n")
    
if __name__ == "__main__":
        main()
