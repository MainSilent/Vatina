from django.urls import path
from .views import ShowView

urlpatterns = [
    path('', ShowView.as_view()),
    path('<int:id>', ShowView.as_view())
]
