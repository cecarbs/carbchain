import random

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from rest_framework.decorators import api_view, permission_classes
from rest_framework import status, permissions
from rest_framework.response import Response 

from blockchain_config.blockchain.blockchain import Blockchain
from blockchain_config.pubsub import PubSub
from blockchain_config.wallet.wallet import Wallet
from blockchain_config.wallet.transactions import Transaction
from blockchain_config.wallet.transaction_pool import TransactionPool

blockchain = Blockchain()
wallet = Wallet(blockchain)
transaction_pool = TransactionPool()
pubsub = PubSub(blockchain, transaction_pool)


for i in range(10):
    blockchain.add_block([
        Transaction(Wallet(), Wallet().address, random.randint(2,50)).convert_to_json(),
    ])

for i in range(3):
    transaction_pool.set_transaction(
        Transaction(Wallet(), Wallet().address, random.randint(2,50))
    )

@api_view(['GET', ])
@permission_classes([permissions.AllowAny])
def blockchain_view(request):
    try:
        return JsonResponse(blockchain.convert_to_json(), safe=False)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

# this route should only be for users
@api_view(['GET', ])
@permission_classes([permissions.AllowAny])
def mine_view(request):
    transaction_data = transaction_pool.transaction_data()
    # rewards local wallet instance for mining a block
    transaction_data.append(Transaction.reward_transaction(wallet).convert_to_json())

    blockchain.add_block(transaction_data)

    block = blockchain.chain[-1]
    
    pubsub.broadcast_block(block)

    transaction_pool.clear_blockchain_transaction(blockchain)
    
    return JsonResponse(block.convert_to_json())

@api_view(['GET', 'POST'])
@permission_classes([permissions.AllowAny])
def post_transaction_view(request):
    
    if request.method == 'GET':
        return HttpResponse("Get message received")
    elif request.method == 'POST':
        transaction_data = request.data
        transaction = transaction_pool.find_existing_transaction(wallet.address)

        # if transaction already already exists, update that transaction otherwise generate a new transaction
        if transaction:
            transaction.update(wallet, transaction_data['recipient'], transaction_data['amount'])
        else:
            transaction = Transaction(wallet, transaction_data['recipient'], transaction_data['amount'])
            
        pubsub.broadcast_transaction(transaction)
        return JsonResponse(transaction.convert_to_json())

@api_view(['GET', ])
@permission_classes([permissions.AllowAny])
def wallet_info_view(request):
    return JsonResponse({'address': wallet.address, 'balance': wallet.balance})

@api_view(['GET', ])
@permission_classes([permissions.AllowAny])
def address_view(request):
    addresses = set()

    for block in blockchain.chain:
        for transaction in block.data:
            transaction['transaction_data'].keys()

            addresses.update(transaction['transaction_data'].keys())
    
    return JsonResponse(list(addresses), safe=False)

@api_view(['GET', ])
@permission_classes([permissions.AllowAny])
def transaction_view(request):
    return JsonResponse(transaction_pool.transaction_data(), safe=False)