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
    # path("orders/<int:user_id>", views.ordersView, name="orders_list"),
    # path("orders/all", views.ordersView, name="orders-list"),
    path('orders/', views.OrderList.as_view()),
    path('orders/<int:pk>/', views.OrderDetail.as_view()),
    path('orders/printShedule/<str:created>', views.OrdersByDate.as_view()),
    path('orders/printShedule/<int:pk>/update_position/', views.Update_position.as_view()),
]

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path("", views.index, name="index"),
#     path("login", views.login_view, name="login"),
#     path("logout", views.logout_view, name="logout"),
#     path("register", views.register, name="register"),
#     path("user-cabinet", views.user_cabinet_view, name="user-cabinet"),
#     path("create-order", views.create_order, name="create-order"),
#     path("manage", views.manage, name="manage"),
#     path("print-schedule", views.print_schedule, name="print-schedule"),

#     #api root
#     path("orders/<int:order_number>", views.orders_view, name="orders-view"),
#     path("orders/all", views.orders_view, name="orders-view"),
# ]

