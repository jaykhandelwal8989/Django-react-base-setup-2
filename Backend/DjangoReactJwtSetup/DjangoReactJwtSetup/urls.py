from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from accounts.views import TokenObtainPairView as MyTokenObtainPairView, CustomRegisterView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('admin/', admin.site.urls),
    # custom login view for jwt authentication and validation
    path('rest-auth/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('rest-auth/registration/', CustomRegisterView.as_view(), name='rest_register'),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('allauth/', include('allauth.urls')),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('accounts/', include('accounts.urls'))    
]

if settings.DEBUG:
	urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
	
	urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)