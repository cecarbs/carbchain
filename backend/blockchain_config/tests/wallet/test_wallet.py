from wallet.wallet import Wallet
from blockchain.blockchain import Blockchain
from wallet.transactions import Transaction
from config import STARTING_BALANCE

def test_verify_valid_signature():
    """
    Tests if signature is generated using sign method and validates signature using wallet's verify method
    """
    data = { "test": "test_data "}
    wallet = Wallet()
    signature = wallet.sign(data)

    assert Wallet.verify(wallet.public_key, data, signature)

def test_verify_invalid_signature():
    """
    Tests if signature is generated using sign method and validates signature using wallet's verify method
    """
    data = { "test": "test_data "}
    wallet = Wallet()
    signature = wallet.sign(data)

    assert not Wallet.verify(Wallet().public_key, data, signature)

def test_calculate_balance():
    """
    If no transactions are conducted then the balance should just return starting balance
    Once transaction is added to the blockchain, the balance in wallet should reflect the transaction
    """
    blockchain = Blockchain()
    wallet = Wallet()

    assert Wallet.calculate_balance(blockchain, wallet.address) == STARTING_BALANCE

    amount = 50
    transaction = Transaction(wallet, "recipient", amount)
    blockchain.add_block([transaction.convert_to_json()])

    assert Wallet.calculate_balance(blockchain, wallet.address) == STARTING_BALANCE - amount
    
    received_amount_one = 25
    received_transaction_one = Transaction(Wallet(), wallet.address, received_amount_one)
    
    received_amount_two = 1
    received_transaction_two = Transaction(Wallet(), wallet.address, received_amount_two)

    # blockchain.add_block(received_transaction_one.convert_to_json())
    # blockchain.add_block(received_transaction_two.convert_to_json())
    blockchain.add_block([received_transaction_one.convert_to_json(), received_transaction_two.convert_to_json()])

    assert Wallet.calculate_balance(blockchain, wallet.address) == STARTING_BALANCE - amount + received_amount_one + received_amount_two
    