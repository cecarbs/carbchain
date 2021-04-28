from django.db import models
from users.models import User

class Portfolio(models.Model):
    name = models.CharField(max_length=50)
    symbol = models.CharField(max_length=10)
    quantity = models.DecimalField(max_digits=12, decimal_places=10)
    image_url = models.URLField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="portfolios")

    def __str__(self):
        return self.name

