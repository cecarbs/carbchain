from django.contrib import admin
from .models import Portfolio

class PortfolioAdmin(admin.ModelAdmin):
    model = Portfolio

admin.site.register(Portfolio, PortfolioAdmin)

