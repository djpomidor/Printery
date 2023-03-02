from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    company = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = User
        fields = ('pk','username', 'first_name', 'last_name', 'email', 'phone_number', 'company', 'is_customer', 'is_employee')

###############################

class PaperSerializer(serializers.ModelSerializer):
    class Meta:
        model=Paper
        fields = ["name", "type","density","width","height", "manufacturer"]

class PartSerializer(serializers.ModelSerializer):
    paper = serializers.StringRelatedField(read_only=True)
    # paper = PaperSerializer(many=True, read_only=True)  # paper object
    class Meta:
        model = Part
        fields = ['part_name', 'pages', 'paper', 'color', 'laminate', 'uflak']

class OrderSerializer(serializers.ModelSerializer):
    parts = PartSerializer(many=True, read_only=True)
    
    class Meta:
        model = Order 
        fields = ['pk','number', 'name', 'owner', 'type', 'circulation', 'binding', 'width', 'height', 'created', 'due_date', 'delivery_date', 'parts']


