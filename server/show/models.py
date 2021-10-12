from django.db import models

class Show(models.Model):
    title = models.CharField(max_length=128)
    product_name = models.CharField(max_length=128)
    product_url = models.URLField(max_length=1024)
    product_price = models.IntegerField()
    product_description = models.TextField(max_length=1024)