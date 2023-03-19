from rest_framework import serializers
from rest_framework.serializers import Serializer, ModelSerializer, CharField
from rest_framework.authtoken.models import Token
from .models import *

class UserSerializer(serializers.ModelSerializer):
    company = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = User
        fields = ('pk','username', 'first_name', 'last_name', 'email', 'phone_number', 'company', 'is_customer', 'is_employee')

class IssueTokenRequestSerializer(Serializer):
    model = User

    username = CharField(required=True)
    password = CharField(required=True)


class TokenSeriazliser(ModelSerializer):

    class Meta:
        model = Token
        fields = ['key']


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


