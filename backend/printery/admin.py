from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.apps import apps
from django.db.models import Model
from django.contrib.auth import get_user_model

from .models import User  # кастомная модель пользователя

# Кастомный UserAdmin
@admin.register(User)
class CustomUserAdmin(UserAdmin):
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email', 'phone_number', 'company')}),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
        ('Custom roles', {'fields': ('is_customer', 'is_employee')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'username', 'email', 'password1', 'password2',
                'first_name', 'last_name', 'phone_number', 'company',
                'is_active', 'is_staff', 'is_superuser',
                'groups', 'user_permissions',
                'is_customer', 'is_employee',
            ),
        }),
    )

    list_display = (
        'username', 'email', 'first_name', 'last_name',
        'phone_number', 'company', 'is_staff', 'is_active', 'is_superuser'
    )
    search_fields = ('username', 'email', 'first_name', 'last_name', 'phone_number')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'is_customer', 'is_employee', 'company')

# Автоматическая регистрация остальных моделей
app = apps.get_app_config('printery')  # замените на имя своего приложения, если другое
UserModel = get_user_model()

for model in app.get_models():
    if model == UserModel:
        continue  # мы уже зарегистрировали кастомного пользователя вручную

    field_names = [field.name for field in model._meta.fields]

    admin_class = type(
        f'{model.__name__}Admin',
        (admin.ModelAdmin,),
        {'list_display': field_names}
    )

    try:
        admin.site.register(model, admin_class)
    except admin.sites.AlreadyRegistered:
        pass
