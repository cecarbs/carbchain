import pytest

from blockchain.blockchain import Blockchain
from blockchain.block import GENESIS_DATA
from wallet.transactions import Transaction
from wallet.wallet import Wallet

def test_blockchain_instance():
    """
    Checks that the first element's hash in the blockchain (genesis block) matches genesis block's hash
    """
    blockchain = Blockchain()

    assert blockchain.chain[0].hash == GENESIS_DATA['hash']

def test_add_block():
    """
    Checks the last block's data in the blockchain equals newly inserted block data
    """
    blockchain = Blockchain()
    data = 'test-data'
    blockchain.add_block(data)

    assert blockchain.chain[-1].data == data

@pytest.fixture
def create_blockchain_five_blocks():
    """
    Generates a blockchain consisting of five blocks
    """
    blockchain = Blockchain()

    for i in range(5):
        blockchain.add_block([Transaction(Wallet(), "recipient", i).convert_to_json()])
    
    return blockchain

def test_is_valid(create_blockchain_five_blocks):
    """
    Checks is_valid @staticmethod and checks that no exceptions are raised
    """
    five_blocks = create_blockchain_five_blocks
    
    Blockchain.is_valid(five_blocks.chain)

def test_is_valid_chain_bad_genesis_block(create_blockchain_five_blocks):
    """
    Checks if exception is raised when genesis block hash is tampered
    """   
    five_blocks = create_blockchain_five_blocks
    five_blocks.chain[0].hash = "bad genesis hash"

    with pytest.raises(Exception, match="Genesis block must be valid"):
        Blockchain.is_valid(create_blockchain_five_blocks.chain)

def test_replace_chain(create_blockchain_five_blocks):
    """
    Checks if blockchain instance is replaced by "create_blockchain_five_blocks"
    """
    five_blocks = create_blockchain_five_blocks
    blockchain = Blockchain()
    blockchain.replace_chain(five_blocks.chain)

    assert blockchain.chain == five_blocks.chain
    

def test_replace_chain_not_longer(create_blockchain_five_blocks):
    """
    Checks if exception is raised when trying to replace five blocks in blockchain with one
    """
    five_blocks = create_blockchain_five_blocks
    blockchain = Blockchain()

    with pytest.raises(Exception, match="The incoming chain must be longer"):
        five_blocks.replace_chain(blockchain.chain)
    
def test_replace_chain_not_valid(create_blockchain_five_blocks):
    """
    Checks if exception is raised when trying to replace valid blockchain with invalid blockchain (i.e tampaered hash)
    """
    blockchain = Blockchain()
    five_blocks = create_blockchain_five_blocks
    five_blocks.chain[1].hash = 'bad hash'

    with pytest.raises(Exception, match="The incoming chain is invalid"):
        blockchain.replace_chain(five_blocks.chain)

def test_valid_transaction_chain(create_blockchain_five_blocks):
    """
    Checks 'is_valid_transaction' staticmethod; no exceptions should be raised
    """
    five_blocks = create_blockchain_five_blocks
    Blockchain.is_valid_transaction_chain(five_blocks.chain)

def test_is_valid_duplicate_transaction(create_blockchain_five_blocks):
    """
    Checks if exception is raised if there are duplicate transactions
    """
    five_blocks = create_blockchain_five_blocks
    transaction = Transaction(Wallet(), "recipient", 1).convert_to_json()

    five_blocks.add_block([transaction, transaction])

    with pytest.raises(Exception, match="is not unique"):
        Blockchain.is_valid_transaction_chain(five_blocks.chain)

def test_is_valid_multiple_rewards(create_blockchain_five_blocks):
    """
    Checks if a blockchain has multiple rewards in its blocks
    """
    reward_one = Transaction.reward_transaction(Wallet()).convert_to_json()
    reward_two = Transaction.reward_transaction(Wallet()).convert_to_json()

    five_blocks = create_blockchain_five_blocks
    five_blocks.add_block([reward_one, reward_two])

    with pytest.raises(Exception, match="Only one mining reward"):
        Blockchain.is_valid_transaction_chain(five_blocks.chain)

def test_is_valid_bad_transaction(create_blockchain_five_blocks):
    """
    Checks if blockchain's individual transaction to see if any are malformed
    """
    bad_transaction = Transaction(Wallet(), "recipient", 1)
    bad_transaction.metadata['signature'] = Wallet().sign(bad_transaction.transaction_data)

    five_blocks = create_blockchain_five_blocks
    five_blocks.add_block([bad_transaction.convert_to_json()])

    with pytest.raises(Exception):
        Blockchain.is_valid_transaction_chain(five_blocks)

def test_is_valid_transaction_chain_historic_balance(create_blockchain_five_blocks):
    """
    Checks to see if metadata's amount has been tampered with even when amount from transaction_data and metadata match
    """
    wallet = Wallet()
    bad_transaction = Transaction(wallet, "recipient", 1)
    bad_transaction.transaction_data[wallet.address] = 10000
    bad_transaction.metadata['amount'] = 11000
    bad_transaction.metadata['signature'] = wallet.sign(bad_transaction.transaction_data)

    five_blocks = create_blockchain_five_blocks
    five_blocks.add_block([bad_transaction.convert_to_json()])

    with pytest.raises(Exception, match="has an invalid metadata amount"):
        Blockchain.is_valid_transaction_chain(five_blocks.chain)