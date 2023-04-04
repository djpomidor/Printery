from django.contrib import admin
from django.urls import path, re_path, include
from printery import views
from django.conf import settings
from django.conf.urls.static import static


# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('api/user', views.user, name='user'),
#     path('api/login', views.login, name='login'),
#     re_path(r'^api/users/$', views.users_list),
#     re_path(r'^api/users/(\d+)$', views.users_detail),
#     re_path(r'^api/orders/$', views.orders_list),
# ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include("printery.urls"))
]