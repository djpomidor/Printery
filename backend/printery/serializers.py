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
    type_display = serializers.CharField(source='get_type_display', read_only=True)
    
    class Meta:
        model=Paper
        fields = ["name", "type","type_display", "density","width","height", "manufacturer"]

    # def to_representation(self, instance):
    #     representation = super().to_representation(instance)
    #     type_human_readable = dict(instance.TYPE_CHOICES).get(representation['type'])

    #     if type_human_readable:
    #         representation['type'] = type_human_readable

    #     return representation


##############################################################################################
##############################################################################################


class PrintScheduleSerializer(serializers.ModelSerializer):
    order_part = serializers.PrimaryKeyRelatedField(read_only=True) 
    # part_name = serializers.CharField(source='order_part.part_name', read_only=True) 
    # part_name = serializers.PrimaryKeyRelatedField(source='get_part_name_display', read_only=True) 

    class Meta:
        model = PrintSchedule
        fields = ['pk', 'order_part', 'printed_sheets', 'circulation_sheets', 'parent_day', 'position', 'order_part_id', 'sm1', 'sm2', 'rapida']


class PartSerializer(serializers.ModelSerializer):
    pages = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    order = serializers.PrimaryKeyRelatedField(read_only=True)
    # paper = serializers.StringRelatedField(read_only=True)
    paper = PaperSerializer()  # paper object
    paper_id = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    color_display = serializers.CharField(source='get_color_display', read_only=True)
    printing = PrintScheduleSerializer(many=True)
    part_name_display = serializers.CharField(source='get_part_name_display', read_only=True)

    def validate_pages(self, value):
        if not value:
            return 0
        try:
            return int(value)
        except ValueError:
            raise serializers.ValidationError('You must supply an integer')
    
    class Meta:
        model = Part
        fields = ['order', 'part_name', 'part_name_display', 'pages', 'paper', 'paper_id', 'color', 'color_display', 'laminate', 'uflak', 'printing']


class OrderSerializer(serializers.ModelSerializer):
    orderId = serializers.IntegerField(source='number', required=False)
    parts = PartSerializer(many=True)
    nameOfOrder = serializers.CharField(source='name')
    typeOfOrder = serializers.CharField(source='type', allow_blank=True, required=False)
    width = serializers.IntegerField(default=0, allow_null=True, required=False)
    height = serializers.IntegerField(allow_null=True, required=False)
    owner = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)

    class Meta:
        model = Order 
        fields = ['pk','number', 'orderId', 'nameOfOrder', 'owner', 'typeOfOrder', 'circulation', 'binding', 'width', 'height', 'created', 'due_date', 'delivery_date', 'parts']

    def create(self, validated_data):
        owners = validated_data.pop('owner')
        parts_data = validated_data.pop('parts')
        order = Order.objects.create(**validated_data)
        order.owner.set(owners)
        for part_data in parts_data:
            print("!@#$%__", part_data)
            paper_data = part_data.pop('paper')
            paper = Paper.objects.create(**paper_data)
            print("!@#$%)KJHGG&%^__", paper.id)
            printing_data = part_data.pop('printing')
            part = Part.objects.create(order=order, paper=paper, **part_data)
            # part.paper.set(paper.id)
            for printing in printing_data:
                PrintSchedule.objects.create(order_part=part, **printing)
        return order
        
###################################################################################
###################################################################################

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




  