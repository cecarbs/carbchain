import pytest
import time

# from backend.blockchain.block import Block, GENESIS_DATA
# from backend.config import MINE_RATE, SECONDS
# from backend.util.hex_to_binary import hex_to_binary

from blockchain.block import Block, GENESIS_DATA
from config import MINE_RATE, SECONDS
from util.hex_to_binary import hex_to_binary

def test_mine_block():
    last_block = Block.genesis()
    data = 'test-data'
    block = Block.mine_block(last_block, data)

    assert isinstance(block, Block)
    assert block.data == data 
    assert block.last_hash == last_block.hash
    assert hex_to_binary(block.hash)[0:block.difficulty] == '0' * block.difficulty

def test_genesis():
    genesis = Block.genesis()

    assert isinstance(genesis, Block)
    for key, value in GENESIS_DATA.items():
        getattr(genesis, key) == value

def test_quickly_mined_block():
    """
    Tests to make sure the difficulty is adjusted for a mined block
    """
    last_block = Block.mine_block(Block.genesis(), 'foo')
    mined_block = Block.mine_block(last_block, 'bar')

    assert mined_block.difficulty == last_block.difficulty + 1

def test_slowly_mined_block():
    last_block = Block.mine_block(Block.genesis(), 'foo')

    # sleep takes in seconds 
    time.sleep(MINE_RATE / SECONDS)

    mined_block = Block.mine_block(last_block, 'bar')
    
    assert mined_block.difficulty == last_block.difficulty -1

def test_mined_block_difficulty_limits_at_1():
    last_block = Block(
        time.time_ns(),
        'test_last_hash',
        'test_hash',
        'test_data',
        1,
        0
    )

    time.sleep(MINE_RATE / SECONDS)
    mined_block = Block.mine_block(last_block, 'bar')

    assert mined_block.difficulty == 1

@pytest.fixture
def last_block():
    return Block.genesis()

@pytest.fixture
def block(last_block):
    return Block.mine_block(last_block, "test_data")

def test_is_valid(last_block, block):
    Block.is_valid(last_block, block)
    # don't need to make an assert statement because the is_valid raises an exception

def test_is_valid_bad_last_hash(last_block, block):
    block.last_hash = "bad_last_hash"

    with pytest.raises(Exception, match="The block's last hash must be correct"):
        Block.is_valid(last_block, block)

def test_is_valid_bad_proof_of_work(last_block, block):
    block.hash = "aaa"
    
    with pytest.raises(Exception, match="Proof of work requirement was not met"):
        Block.is_valid(last_block, block)

def test_is_valid_difficulty(last_block, block):
    new_difficulty = 5
    block.difficulty = new_difficulty
    block.hash = f"{'0' * new_difficulty}1af1c0"

    with pytest.raises(Exception, match="The block's difficulty must only adjust by 1"):
        Block.is_valid(last_block, block)

def test_is_valid_bad_block_hash(last_block, block):
    """
    Checks hash's validity using a reconstructed hash
    """
    block.hash = "0000000000000bababdffff"
    
    with pytest.raises(Exception, match="The block's hash is incorrect"):
        Block.is_valid(last_block, block)