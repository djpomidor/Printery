from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User 
        fields = ('pk','username', 'first_name', 'last_name', 'email', 'phone_number', 'is_customer', 'is_employee')


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order 
        fields = ('pk','number', 'name', 'owner', 'type', 'circulation', 'binding', 'width', 'height', 'block', 'cover', 'insert', 'created', 'due_date', 'delivery_date')
