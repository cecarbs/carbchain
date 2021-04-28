import pytest

from wallet.transactions import Transaction
from wallet.wallet import Wallet
from config import MINING_REWARD, MINING_REWARD_INPUT

def test_transaction():
    """
    Checks if transaction is formatted properly
    """
    sender_wallet = Wallet()
    recipient = "recipient"
    amount = 50
    transaction = Transaction(sender_wallet, recipient, amount)

    assert transaction.transaction_data[recipient] == amount
    assert transaction.transaction_data[sender_wallet.address] == sender_wallet.balance - amount
    
    assert "timestamp" in transaction.metadata
    assert transaction.metadata['amount'] == sender_wallet.balance 
    assert transaction.metadata['address'] == sender_wallet.address
    assert transaction.metadata['public_key'] == sender_wallet.public_key

    assert Wallet.verify(transaction.metadata['public_key'], transaction.transaction_data, transaction.metadata['signature'])

def test_transaction_exceeds_balance():
    """
    Tests if exception is raised in the case that the sender wallet attempts to send more than balance in wallet
    """
    with pytest.raises(Exception, match="Cannot send more than current balance of wallet"):
        Transaction(Wallet(), "recipient", 4651)

def test_transaction_update_exceeds_balance():
    """
    Tests if exception is raised in the case that the sender wallet attempts to send more than balance in wallet to a different recipient
    """
    sender_wallet = Wallet()
    transaction = Transaction(sender_wallet, "recipient", 50)

    with pytest.raises(Exception, match="Cannot send more than current balance of wallet"):
        transaction.update(sender_wallet, "new_recipient", 5000)

def test_transaction_update():
    """
    Tests for a successful transaction update
    """
    sender_wallet = Wallet()
    recipient_one = "first recipient"
    recipient_one_amount = 50

    transaction = Transaction(sender_wallet, recipient_one, recipient_one_amount)

    recipient_two = "second recipient"
    recipient_two_amount = 25

    transaction.update(sender_wallet, recipient_two, recipient_two_amount)

    assert transaction.transaction_data[recipient_two] == recipient_two_amount
    assert transaction.transaction_data[sender_wallet.address] == sender_wallet.balance - recipient_one_amount - recipient_two_amount
    assert Wallet.verify(transaction.metadata['public_key'], transaction.transaction_data, transaction.metadata['signature'])

    recipient_one_second_transaction_amount = 10
    transaction.update(sender_wallet, recipient_one, recipient_one_second_transaction_amount)

    assert transaction.transaction_data[recipient_one] == recipient_one_amount + recipient_one_second_transaction_amount
    assert transaction.transaction_data[sender_wallet.address] == sender_wallet.balance - recipient_one_amount - recipient_two_amount - recipient_one_second_transaction_amount
    assert Wallet.verify(transaction.metadata['public_key'], transaction.transaction_data, transaction.metadata['signature'])

def test_valid_transaction():
    """
    Tests staticmethod: is_valid on a valid transaction
    """
    Transaction.is_valid_transaction(Transaction(Wallet(), "recipient", 50))

def test_valid_transaction_with_invalid_transaction_data():
    """
    Tests if exception is raised when a sender_wallet attempts to give itself more than it should have
    """
    sender_wallet = Wallet()
    transaction = Transaction(sender_wallet, "recipient", 30)
    transaction.transaction_data[sender_wallet.address] = 5000

    with pytest.raises(Exception, match="Invalid transaction -- metadata does not match transaction data"):
        Transaction.is_valid_transaction(transaction)

def test_valid_transaction_with_invalid_signature():
    """
    Tests if exception is raised when the signature has been tampered with
    """
    transaction = Transaction(Wallet(), "recipient", 50)
    transaction.metadata["signature"] = Wallet().sign(transaction.transaction_data)

    with pytest.raises(Exception, match="Invalid signature"):
        Transaction.is_valid_transaction(transaction)

def test_reward_transaction():
    """

    """
    miner_wallet = Wallet()
    transaction = Transaction.reward_transaction(miner_wallet)

    assert transaction.metadata == MINING_REWARD_INPUT
    assert transaction.transaction_data[miner_wallet.address] == MINING_REWARD

def test_valid_reward_transaction():
    """
    If tests passes without raising exception, then the transaction is considered valid
    """
    reward_transaction = Transaction.reward_transaction(Wallet())
    Transaction.is_valid_transaction(reward_transaction)

def test_invalid_reward_transaction_extra_recipient():
    """
    Checks if there are multiple entries in the transaction_data
    """
    reward_transaction = Transaction.reward_transaction(Wallet())
    reward_transaction.transaction_data['extra_recipient'] = 60

    with pytest.raises(Exception, match="This is an invalid mining reward"):
        Transaction.is_valid_transaction(reward_transaction)

    
def test_invalid_reward_transaction_invalid_amount():
    """
    Checks if the single entry is has an invalid reward value
    """
    miner_wallet = Wallet()
    reward_transaction = Transaction.reward_transaction(miner_wallet)
    reward_transaction.transaction_data[miner_wallet.address] = 31509713

    with pytest.raises(Exception, match="This is an invalid mining reward"):
        Transaction.is_valid_transaction(reward_transaction)