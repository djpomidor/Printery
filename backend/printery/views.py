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

from rest_framework.views import APIView

from .serializers import *


from printery.serializers import MyTokenObtainPairSerializer, RegisterSerializer

from django.contrib.auth.models import User

from django.contrib.auth import get_user_model
User = get_user_model()

# Create your views here.
################################################################################
def index(request):
    if request.user.is_authenticated and request.user.is_customer:
        return HttpResponseRedirect(reverse("user-cabinet"))
    elif request.user.is_authenticated and request.user.is_employee:
        return HttpResponseRedirect(reverse("manage"))
    else:
        return render(request, "printery/index.html", {
        })
################################################################################
def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            if User.objects.get(username = username).is_customer:
                return HttpResponseRedirect(reverse("user-cabinet"))
            elif User.objects.get(username = username).is_employee:
                return HttpResponseRedirect(reverse("manage"))
            else:
                return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "printery/login.html", {
                "message": "Invalid username and/or password.", "form": UserForm()
            })
    else:
        return render(request, "printery/login.html", {
        "form": UserForm()
        })

################################################################################
def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

################################################################################
def register(request):
    # CompanyFormSet = modelformset_factory(Company, form=CompanyForm, fields=('name',))
    if request.method == "POST":
        user_form = UserForm(data=request.POST)
        company_form = CompanyForm(data=request.POST)
        if all([user_form.is_valid(), company_form.is_valid()]):
            company_form.save()
            user = user_form.save(commit=False)
            user.company = Company.objects.get(name = company_form.cleaned_data.get('name'))
            user.set_password(user.password)
            user.save()
            login(request, user)
            if User.objects.get(username = user_form.cleaned_data.get('username')).is_customer:
                return HttpResponseRedirect(reverse("user-cabinet"))
            elif User.objects.get(username = user_form.cleaned_data.get('username')).is_employee:
                return HttpResponseRedirect(reverse("manage"))
        else:
            for field in user_form.errors:
                user_form[field].field.widget.attrs['class'] += ' is-invalid'
            for field in company_form.errors:
                company_form[field].field.widget.attrs['class'] += ' is-invalid'
            return render(request, "printery/register.html", {
                # "message": user_form.errors,
                "user_form": user_form,
                "company_form": company_form,
                # "message_company": company_form.errors,
            })
    else:
        return render(request, "printery/register.html", {
        "user_form": UserForm(),
        "company_form": CompanyForm(),
        })
################################################################################
@login_required(redirect_field_name='index')
def user_cabinet_view(request):
    if request.user.is_customer:
        return render(request, "printery/user-cabinet.html", {
        })
    else:
        return HttpResponseRedirect(reverse("manage"))
################################################################################

@login_required(redirect_field_name='index')
def create_order(request):
    PartsFormSet = modelformset_factory(Part, form=OrderPartsForm, fields=('part_name', 'pages', 'paper', 'color', 'laminate'),max_num=3, extra=3)
    if request.method == "POST":
        order_form = OrderForm(data=request.POST)
        formset = PartsFormSet(request.POST)

        if all([order_form.is_valid(), formset.is_valid()]):
            for form in formset:
                form.save(commit=False)
            formset.save(commit=False)
            order = order_form.save(commit=False)
            order.save()
            order.owner.add(request.user.id)
            order.save()

            instances = formset.save(commit=False)
            for instance in instances:
                instance.order_id = order.id
                instance.save()

            new_order = Order.objects.get(number=order.number)

            return render(request, "printery/create-order.html", {
                'order_form': order_form,
                'parts_form': Part.objects.filter(order_id=new_order.id),
                "successful_submit": True,
                "new_order": order,
            })
        else:
            return render(request, "printery/create-order.html", {
                "message": order_form.errors,
                "message_parts": formset.errors,
                "order_form": order_form,
                "parts_form": formset
            })
    else:

        return render(request, "printery/create-order.html", {
            'order_form': OrderForm(),
            'parts_form': PartsFormSet(queryset=Part.objects.none()),
        })
####################################################################

@csrf_exempt
@login_required
def orders_view(request, order_number = 0):
    if not order_number:
        orders = Order.objects.filter(owner=request.user).order_by("-created").all()
        # parts = Part.objects.filter(order_id=[order.id for order in orders])
        # print("!!!", parts)

        # for order in orders:
        #     for part in Part.objects.filter(order_id=order.id):
        #         # order | part
        #         resp.append(order.serialize() | part.serialize())


        # def ser(order):
        #     for part in Part.objects.filter(order_id=order.id):
        #         print("::::::::::", order.serialize() | part.serialize())
        #         return order.serialize()
        # print("!!!!!!", [order.serialize() for order in orders])
        # return JsonResponse([ser(order) for order in orders], safe=False)

        return JsonResponse([order.serialize() for order in orders], safe=False)

    try:
        order = Order.objects.get(owner=request.user, number=order_number)
    except Order.DoesNotExist:
        return JsonResponse({"error": "Order not found."}, status=404)

    if request.method == "GET":
        return JsonResponse(order.serialize())

#####################################################################
@login_required(redirect_field_name='index')
def manage(request):
    if request.user.is_customer:
        return HttpResponseRedirect(reverse("user-cabinet"))
    return render(request, "printery/manage.html")

################################################################################

@login_required(redirect_field_name='index')
def print_schedule(request):
    return render(request, "printery/manage.html")

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
        print("____", )
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer_order = OrderSerializer(data=request.data)
        serializer_printSheduler = PrintScheduleSerializer(data={})
        if serializer_order.is_valid() and serializer_printSheduler.is_valid() :
            serializer_order.save()
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
        x = datetime.datetime.now()
        orders = Order.objects.filter(created__range=["2023-07-15", x]).order_by("-created").all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)


class Update_position(APIView):
    permission_classes = (AllowAny,)
    def get_object(self, pk, part):
        try:
            return PrintSchedule.objects.get(order_part=pk)
        except Order.DoesNotExist: 
            raise Http404    
        
    def put(self, request, pk, part, format=None):
        item = self.get_object(pk, part)
        position = request.data.get('position')
        parent_day = request.data.get('parent_day')
        serializer = PrintScheduleSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        print("serializer.errors____",serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


        

        # if position and parent_day is not None:
        #     item.position = position
        #     item.parent_day = position
        #     item.save()
            
        #     return Response(serializer.data)
        # else:
        #     return Response(status=status.HTTP_400_BAD_REQUEST)        