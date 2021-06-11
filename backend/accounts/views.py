from django.contrib.auth.models import User
from django.contrib import auth
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from user_profile.models import UserProfile


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (AllowAny, )

    def get(self, request, format=None):
        return Response({'success': 'CSRF cookie set'})


class CheckAuthenticatedView(APIView):
    def get(self, request, format=None):
        user = self.request.user
        if not user.is_authenticated:
            return Response({'isAuthenticated': 'error'}, status=401)
        return Response({'isAuthenticated': 'success'})


@method_decorator(csrf_protect, name='dispatch')
class SignupView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, format=None):
        data = self.request.data
        username = data['username']
        password = data['password']
        passwordAgain = data['passwordAgain']
        try:
            # signup input checks
            if User.objects.filter(username=username).exists():
                return Response({'error': 'Username already exists'}, status=409)
            if password != passwordAgain:
                return Response({'error': 'Passwords do not match'}, status=422)
            if len(password) < 6:
                return Response({'error': 'Password too short'}, status=422)

            user = User.objects.create_user(
                username=username, password=password)
            user = User.objects.get(id=user.id)
            UserProfile.objects.create(user=user, full_name='', ldap='')
            return Response({'success': 'User account created successfully'})
        except:
            return Response({'error': 'Something went wrong while signing up'})


@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (AllowAny, )

    def post(self, request, format=None):
        data = self.request.data
        username = data['username']
        password = data['password']
        try:
            user = auth.authenticate(username=username, password=password)
            if user is None:
                return Response({'error': 'Username and password do not match'}, status=401)

            auth.login(request, user)
            return Response({'success': 'Logged in successfully'})
        except:
            return Response({'error': 'Something went wrong while logging in'})


@method_decorator(csrf_protect, name='dispatch')
class LogoutView(APIView):
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({'success': 'Successfully logged out'})
        except:
            return Response({'error': 'Something went wrong while logging out'})
