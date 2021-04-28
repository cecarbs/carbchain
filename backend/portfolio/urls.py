from django.urls import path
from .views import PortfolioListCreate, PortfolioRetrieveUpdateDestroy

urlpatterns = [
    path('portfolio/', PortfolioListCreate.as_view(), name="portfolio_list"),
    path('portfolio/<int:pk>/', PortfolioRetrieveUpdateDestroy.as_view(), name="portfolio_list"),
   
]

