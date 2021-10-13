from django.urls import path
from .views import Register, Login, UploadAvatar, ChangePassword, Logout

urlpatterns = [
    path('login', Login.as_view()),
    path('register', Register.as_view()),
    path('upload_avatar', UploadAvatar.as_view()),
    path('change_password', ChangePassword.as_view()),
    path('logout', Logout.as_view())
]
