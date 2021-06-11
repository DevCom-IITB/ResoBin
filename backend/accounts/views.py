from django.contrib.auth.models import User
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
            if not User.objects.filter(username=username).exists():
                return Response({'error': 'Username already exists'})
            if password != passwordAgain:
                return Response({'error': 'Passwords do not match'})
            if len(password) < 6:
                return Response({'error': 'Password too short'})

            user = User.objects.create_user(
                username=username, password=password)
            user = User.objects.get(id=user.id)
            UserProfile.objects.create(user=user, full_name='', ldap='')
            return Response({'success': 'User account created successfully'})
        except:
            return Response({'error': 'Something went wrong'})
