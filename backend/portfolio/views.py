from django.shortcuts import render
from .models import Portfolio
from .serializers import PortfolioSerializer
from rest_framework import generics, permissions

from django.core.management.commands.runserver import Command as runserver

if runserver.default_port == "7000":
    print('hello')


class PortfolioListCreate(generics.ListCreateAPIView):
    permission_classes = (permissions.AllowAny,)

    serializer_class = PortfolioSerializer

    def get_queryset(self):
        user = self.request.query_params.get('id')
        return Portfolio.objects.filter(user_id=user)

class PortfolioRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.AllowAny, )

    serializer_class = PortfolioSerializer
    # lookup_url_kwarg = "portfolio_id"

    # def get_queryset(self):
    #     portfolio = self.request.query_params.get('id')
    #     # portfolio = self.request.query_params.get('id')
    #     return Portfolio.objects.filter(id=portfolio)

    queryset = Portfolio.objects.all()