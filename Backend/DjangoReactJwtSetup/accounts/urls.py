from django.urls import path
from .views import ReverifyEmailApiView, FalttuView

urlpatterns = [
        path('verify-email/', ReverifyEmailApiView.as_view()),
        path('', FalttuView.as_view()),
    ]