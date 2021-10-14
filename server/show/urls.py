from django.urls import path
from .views import ShowView

urlpatterns = [
    path('', ShowView.as_view()),
    path('<str:id>', ShowView.as_view())
]
