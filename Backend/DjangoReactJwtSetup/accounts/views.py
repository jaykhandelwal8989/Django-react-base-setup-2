from rest_framework import generics
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from django.utils.translation import ugettext_lazy as _

from .serializers import ReverifyEmailSerializer, TokenObtainPairSerializer
from allauth.account.models import EmailAddress
from rest_framework_simplejwt.views import TokenViewBase     
from rest_auth.registration.views import RegisterView
from allauth.account import app_settings as allauth_settings
from allauth.account.utils import complete_signup

class CustomRegisterView(RegisterView):
    def perform_create(self, serializer):
        user = serializer.save(self.request)

        complete_signup(self.request._request, user,
                        allauth_settings.EMAIL_VERIFICATION,
                        None)
        return user

class ReverifyEmailApiView(generics.GenericAPIView):
    serializer_class=ReverifyEmailSerializer
    permission_classes=[
            permissions.AllowAny,
        ]
        
    def send_email(self):
        if self.serializer.validated_data['is_verified']:
            return Response({"detail": _("Your email is already verified.")},
                            status=status.HTTP_200_OK)
        elif self.serializer.validated_data['is_verified'] == False:
            try:
                self.user = self.serializer.validated_data['user']
                email_address = EmailAddress.objects.get(
                    user=self.user,
                    email=self.user.email,
                )
                email_address.send_confirmation(self.request)
                return Response({'detail':_("Verification email has been sent.")}, status=status.HTTP_200_OK)
            except EmailAddress.DoesNotExist:
                return Response({"detail": _("Something wents wrong.")},
                            status=status.HTTP_403_FORBIDDEN)
        else:
           return Response({"detail": _("Something wents wrong.")},
                            status=status.HTTP_403_FORBIDDEN)
            
      
    def post(self, request, *args, **kwargs):
        self.request = request
        self.serializer = self.get_serializer(data=self.request.data, context={'request': request})
        self.serializer.is_valid(raise_exception=True)
        return self.send_email()


class FalttuView(generics.GenericAPIView):
    permission_classes=[
            permissions.IsAuthenticated,
        ]
        
    def get(self, request, *args, **kwargs):
        print('Going to rock hmm..2021')
        return Response('Going to rock hmm..2021', status=status.HTTP_200_OK)


class TokenObtainPairView(TokenViewBase):
    serializer_class = TokenObtainPairSerializer