from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterUser, MyTokenObtainPairView

urlpatterns = [
    path('user/create/', RegisterUser.as_view(), name='create_user'),
    path('token/obtain/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

