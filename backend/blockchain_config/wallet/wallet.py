import uuid
import json

from blockchain_config.config import STARTING_BALANCE
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives.asymmetric.utils import encode_dss_signature, decode_dss_signature
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.exceptions import InvalidSignature


class Wallet:
    """
    Wallet for miner
    Keeps track of miner's balance
    Allows a miner to authorize transactions
    """
    def __init__(self, blockchain=None):
        self.blockchain = blockchain
        self.address = str(uuid.uuid4())[0:8]
        # eleptic cryptography to generate private key
        self.private_key = ec.generate_private_key(ec.SECP256K1(), default_backend())
        self.public_key = self.private_key.public_key()
        self.serialize_public_key()

    @property
    def balance(self):
        """
        Useful if wallet.balance is used, then it will run the code contained in method
        """
        return Wallet.calculate_balance(self.blockchain, self.address)

    def sign(self, data):
        """
        Generate signature based on data using local private key
        """
        # ECSDA (eleptic curve digitial signature algorithm) = custom object 
        return decode_dss_signature(self.private_key.sign(json.dumps(data).encode("utf-8"), ec.ECDSA(hashes.SHA256())))

    def serialize_public_key(self):
        """
        Reset the public key to its serialized version
        """
        self.public_key = self.public_key.public_bytes(
            encoding=serialization.Encoding.PEM, 
            format=serialization.PublicFormat.SubjectPublicKeyInfo
        ).decode("utf-8")  

    @staticmethod
    def verify(public_key, data, signature):
        """ 
        Veritfies signature based on original public key and data
        """
        deserialized_public_key = serialization.load_pem_public_key(
            public_key.encode("utf-8"),
            default_backend()
        )
       
        (r,s) = signature
        
        try:
            deserialized_public_key.verify(encode_dss_signature(r, s), json.dumps(data).encode("utf-8"), ec.ECDSA(hashes.SHA256()))
            return True
        except InvalidSignature:
            return False
    
    @staticmethod
    def calculate_balance(blockchain, address):
        """
        Utilizes data in the blockchain to calculate the balance of the wallet
        Balance is found by adding the transaction_data that belong to the address since the most recent transaction by that address
        """
        balance = STARTING_BALANCE

        if not blockchain:
            return balance
            
        for block in blockchain.chain:
            for transaction in block.data:
                # every time address conducts a transaction, that wallet essentially resets its balance
                # when transaction is created, the sender wallet's address is stored as an address attribute in transaction metadata
                if transaction['metadata']['address'] == address:
                    # address has conducted a transaction, therefore balance should be reset to the value in transaction_data under address
                    balance = transaction['transaction_data'][address]
                # if address is the recipient of a transaction
                elif address in transaction['transaction_data']:
                    balance += transaction['transaction_data'][address]
  
        return balance

def main():
    print(f"Wallet: {wallet.__dict__}")

    data = {"foo": "bar"}
    signature = wallet.sign(data)
    print(f"Signature: {signature}")

    valid_signature = Wallet.verify(wallet.public_key, data, signature)
    print(f"Valid_signature: {valid_signature}")

    invalid_signature = Wallet.verify(Wallet().public_key, data, signature)
    print(f"Invalid_signature: {invalid_signature}")

if __name__ == "__main__":
    main()