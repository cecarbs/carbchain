from django.urls import path

from . import views

app_name = "carbcoin"

urlpatterns = [
    path('blockchain/', views.blockchain_view, name="blockchain"),
    path('blockchain/mine/', views.mine_view, name="mine"),
    path('blockchain/transaction/', views.post_transaction_view, name="post_transaction"),
    path('blockchain/addresses/', views.address_view, name="address"),
    path('wallet/balance/', views.wallet_info_view, name="balance"),
    path('transactions/', views.transaction_view, name="transaction"),
]
 