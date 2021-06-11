from django.urls import path
from .views import (
    SignupView,
    GetCSRFToken,
    LoginView,
    LogoutView,
    CheckAuthenticatedView,
    DeleteUserView,
    GetUsersView
)

urlpatterns = [
    path('signup', SignupView.as_view()),
    path('authenticated', CheckAuthenticatedView.as_view()),
    path('login', LoginView.as_view()),
    path('logout', LogoutView.as_view()),
    path('csrf_token', GetCSRFToken.as_view()),
    path('delete', DeleteUserView.as_view()),
    path('users', GetUsersView.as_view()),
]
