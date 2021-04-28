from wallet.transaction_pool import TransactionPool
from wallet.transactions import Transaction
from wallet.wallet import Wallet
from blockchain.blockchain import Blockchain

def test_set_transaction():
    """
    Tests set_transaction method
    """
    transaction_pool = TransactionPool()
    transaction = Transaction(Wallet(), "recipient", 1)
    transaction_pool.set_transaction(transaction)

    assert transaction_pool.transaction_map[transaction.id] == transaction

def test_clear_blockchain_transaction():
    """
    Tests if transactions are removed if duplicates are found within the blockchain 
    """
    transaction_pool = TransactionPool()
    transaction_one = Transaction(Wallet(), "recipient", 1)
    transaction_two = Transaction(Wallet(), "recipient", 2)

    transaction_pool.set_transaction(transaction_one)
    transaction_pool.set_transaction(transaction_two)

    blockchain = Blockchain()
    blockchain.add_block([transaction_one.convert_to_json(), transaction_two.convert_to_json()])

    assert transaction_one.id in transaction_pool.transaction_map
    assert transaction_two.id in transaction_pool.transaction_map

    transaction_pool.clear_blockchain_transaction(blockchain)

    assert not transaction_one.id in transaction_pool.transaction_map
    assert not transaction_two.id in transaction_pool.transaction_map