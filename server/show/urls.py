from django.urls import path
from .views import Show

urlpatterns = [
    path('', Show.as_view()),
    path('<int:id>', Show.as_view())
]
