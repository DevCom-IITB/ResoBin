from django.urls import path
from .views import SignupView, GetCSRFToken

urlpatterns = [
    path('signup', SignupView.as_view()),
    path('csrf_token', GetCSRFToken.as_view()),
]
