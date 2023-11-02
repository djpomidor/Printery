import json
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse, Http404, Http404
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator
from django import forms
import json
import datetime

from printery.models import *
from printery.forms import *
from django.forms import modelformset_factory

from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from .serializers import *
from printery.serializers import MyTokenObtainPairSerializer, RegisterSerializer

from django.contrib.auth.models import User

from django.contrib.auth import get_user_model
User = get_user_model()

# Create your views here.


#########################################################################
########### Authentication
########################################################################

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        '/api/prediction/'
    ]
    return Response(routes)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = request.POST.get('text')
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)

##################################################################################
##############  api orders  ####################################
#################################################################################

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
# @permission_classes([AllowAny])
def ordersView (request):
    if request.method == 'GET':
        data = Order.objects.filter(owner=request.user.pk).order_by("-created").all()
        serializer = OrderSerializer(data, context={'request': request}, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)     

class OrderList(APIView):
    """
    List all orders, or create a new order.
    """
    permission_classes = (AllowAny,)

    def get(self, request, format=None):
        orders = Order.objects.filter(owner=request.user.pk).order_by("-created").all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer_order = OrderSerializer(data=request.data)
        if serializer_order.is_valid():
            order = serializer_order.save()  # Save the Order model
            # Iterate over the parts data and create the associated PrintSchedule models
            for part_data in request.data.get('parts'):
                serializer_paper = PaperSerializer(data=part_data.get('paper'))
                serializer_printSheduler = PrintScheduleSerializer(data=part_data.get('printing'))
                if serializer_printSheduler.is_valid() and serializer_paper.is_valid():
                    serializer_paper.save()
                    serializer_printSheduler.save(order_part=part_data.get('pk'))  # Associate the PrintSchedule with the Order and Part
            return Response(serializer_order.data, status=status.HTTP_201_CREATED)
        return Response(serializer_order.errors, status=status.HTTP_400_BAD_REQUEST)


class OrderDetail(APIView):
    """
    Retrieve, update or delete a order instance.
    """
    def get_object(self, pk):
        try:
            return Order.objects.get(pk=pk)
        except Order.DoesNotExist: 
            raise Http404

    def get(self, request, pk, format=None):
        order = self.get_object(pk)
        serializer = OrderSerializer(order)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        order = self.get_object(pk)
        serializer = OrderSerializer(order, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        order = self.get_object(pk)
        order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class OrdersByDate(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, created):
        today = datetime.datetime.now()
        field_name = "sm1"
        orders = Order.objects.filter(created__range=[created, today]).order_by("-created").all()
        # orders = orders.filter(**{f'parts__printing__{field_name}': True})
        # print("_________", orders)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)


class Update_position(APIView):
    permission_classes = (AllowAny,)
    def get_object(self, pk):
        try:
            return PrintSchedule.objects.get(order_part=pk)
        except Order.DoesNotExist: 
            raise Http404    
        
    def put(self, request, pk, format=None):
        item = self.get_object(pk)
        # position = request.data.get('position')
        # parent_day = request.data.get('parent_day')
        serializer = PrintScheduleSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  