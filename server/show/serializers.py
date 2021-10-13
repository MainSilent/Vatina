from rest_framework import serializers
from .models import Show

class ShowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Show
        fields = ('title', 'product_name', 'product_url', 'product_price', 'product_description', 'stream_id', 'playback_id', 'stream_key', 'owner')