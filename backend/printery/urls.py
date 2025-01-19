from django.contrib import admin
from django.urls import path, re_path
from . import views
from django.conf import settings
from django.conf.urls.static import static

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('test/', views.testEndPoint, name='test'),
    path('', views.getRoutes),
    path('user-group/', views.UserGroupView.as_view(), name='user-group'),    
    
    path('orders/', views.OrderList.as_view(), name='order-list'),
    path('orders/<int:pk>/', views.OrderDetail.as_view()),
    path('orders/<int:pk>/edit', views.OrderDetail.as_view()),
    path('orders/print-shedule/<str:created>', views.OrdersByDate.as_view()),
    path('orders/print-shedule/<int:pk>-update_position/', views.Update_position.as_view()),
    path('orders/print-shedule/<str:machine>/', views.OrdersByDate.as_view()),
    path('orders/print-shedule/<int:pk>/update/', views.OrderDetail.as_view()),
    
    path('ctp/<int:part_id>/', views.CtpView.as_view()),
    path('ctp/<int:pk>/update_ctp_info/', views.Ctp_view.as_view()),
]


