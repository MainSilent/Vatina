from django.db import models
from django.conf import settings

class Show(models.Model):
    title = models.CharField(max_length=128, blank=False)
    product_name = models.CharField(max_length=128, blank=False)
    product_url = models.URLField(max_length=1024, blank=False)
    product_price = models.IntegerField(blank=False)
    product_description = models.TextField(max_length=1024, blank=False)

    stream_id = models.CharField(max_length=128, blank=False)
    playback_id = models.CharField(max_length=128, blank=False)
    stream_key = models.CharField(max_length=128, blank=False)

    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="shows", blank=False, on_delete=models.CASCADE)