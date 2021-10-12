from rest_framework import viewsets
from .serializers import ShowSerializer
from .models import Show

class Show(viewsets.ModelViewSet):
    queryset = Show.objects.all()
    serializer_class = ShowSerializer