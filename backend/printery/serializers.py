from django.contrib.auth import get_user_model

User = get_user_model()

from rest_framework import serializers
from rest_framework.serializers import Serializer, ModelSerializer, CharField
from rest_framework.authtoken.models import Token
from .models import *

# from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class PaperSerializer(serializers.ModelSerializer):
    class Meta:
        model=Paper
        fields = ["name", "type","density","width","height", "manufacturer"]


class PartSerializer(serializers.ModelSerializer):
    pages = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    order = serializers.PrimaryKeyRelatedField(read_only=True)
    paper = serializers.StringRelatedField(read_only=True)
    # paper = PaperSerializer(many=True, read_only=True)  # paper object
    def validate_pages(self, value):
        if not value:
            return 0
        try:
            return int(value)
        except ValueError:
            raise serializers.ValidationError('You must supply an integer')
    
    class Meta:
        model = Part
        # fields = ['order', 'part_name', 'pages', 'paper', 'color', 'laminate', 'uflak']
        fields = '__all__'

class PrintScheduleSerializer(serializers.ModelSerializer):
    order = serializers.PrimaryKeyRelatedField( read_only=True) 
    class Meta:
        model = PrintSchedule
        fields = ['order', 'parent_day', 'position']

    # def create(self, validated_data):
    #     order =   


class OrderSerializer(serializers.ModelSerializer):
    parts = PartSerializer(many=True)
    nameOfOrder = serializers.CharField(source='name')
    typeOfOrder = serializers.CharField(source='type')
    owner = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)
    printing = PrintScheduleSerializer(many=True, read_only=True)

    class Meta:
        model = Order 
        fields = ['pk','number', 'nameOfOrder', 'owner', 'typeOfOrder', 'circulation', 'binding', 'width', 'height', 'created', 'due_date', 'delivery_date', 'parts', 'printing']

    def create(self, validated_data):
        # print("!!!_validated_data_", validated_data)
        owners = validated_data.pop('owner')
        parts_data = validated_data.pop('parts')
        order = Order.objects.create(**validated_data)
        order.owner.set(owners)
        print("order_", order)
        for part_data in parts_data:
            Part.objects.create(order=order, **part_data)
        return order
        
        

class UserSerializer(serializers.ModelSerializer):
    # company = serializers.StringRelatedField(read_only=True)
    order_owners = OrderSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ('pk','username', 'first_name', 'last_name', 'email', 'phone_number', 'company', 'is_customer', 'is_employee', 'order_owners')        

########################################################################

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        # ...

        return token

##############################################################

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

#########################################

class CreatOrderSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Order
        fields = ('name', 'type', 'circulation', 'binding', 'width', 'height', 'due_date', 'delivery_date')       




  