from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
from django.db import models
from django.db.models import Max

import locale
import datetime

locale.setlocale(locale.LC_TIME, "Russian_Russia")  # Установить русскую локализацию. На Win10 было ru_RU

def parent_day():
    today = datetime.datetime.now()
    formatted_date = today.strftime("%a, %d.%m") + "_day"
    return formatted_date.lower()

# Create your models here.
class User(AbstractUser):
    # orders = models.ManyToManyField("Order", blank=True, symmetrical=False, related_name="order")
    phone_number = PhoneNumberField(null=False, blank=True)
    company = models.ForeignKey('Company', related_name='company', null=True, blank=True, on_delete=models.CASCADE)
    is_customer = models.BooleanField(default=True)
    is_employee = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.username}"

# class Employee(models.Model):
#     middle_name = models.CharField(max_length=64)
#     position = models.CharField(max_length=64)
#     def __str__(self):
#         return f"{self.first_name}"

#########################################################################

class Company(models.Model):
    name = models.CharField(unique=True, max_length=64)
    address = models.CharField(blank=True, max_length=64)
    city = models.CharField(blank=True, max_length=25)
    postal_code = models.IntegerField(blank=True, null=True)
    country = models.CharField(blank=True, max_length=56)
    email = models.CharField(blank=True, max_length=64)
    phone = PhoneNumberField(null=False, blank=True)
    is_manufacturer = models.BooleanField(default=False)
    is_customer = models.BooleanField(default=False)

    def __str__(self):
        return self.name

#########################################################################

class Paper(models.Model):
    name = models.CharField(blank=True, max_length=64)
    TYPE_CHOICES = [
        (None, 'Select...'),
        ('OFF', 'Офсетная'),
        ('GL', 'Глянцевая'),
        ('MAT', 'Матовая'),
        ('CAR', 'Картон'),
        
        # (None, 'Select...'),
        # ('GL', 'Glossy'),
        # ('MAT', 'Matte'),
        # ('SIL', 'Silk'),
        # ('OFF', 'Offset'),
    ]
    type = models.CharField(max_length=3,
        choices=TYPE_CHOICES,
        )
    class Density(models.IntegerChoices):
        D80 = 80, '80'
        D100 = 100, '100'
        D105 = 105, '105'
        D115 = 115, '115'
        D120 = 120, '120'
        D130 = 130, '130'
        D150 = 150, '150'
        D170 = 170, '170'
        D200 = 200, '200'
        D250 = 250, '250'
        D300 = 300, '300'
    density = models.IntegerField(choices=Density.choices)
    width = models.IntegerField()
    height = models.IntegerField()
    manufacturer = models.ManyToManyField(Company, blank=True, related_name="made_by")

    def __str__(self):
        return f"{self.name} {self.get_type_display()} {self.density} gr/m2"

    def serialize(self):
        return {
            "name": self.name,
            "type": self.type,
            "density": self.density,
            "width": self.width,
            "height": self.height,
            # "manufacturer": self.manufacturer
        }

###########################################################################

class Order(models.Model):
    def counter():
        no = Order.objects.aggregate(Max('number'))
        if no == None:
            return 1
        else:
            return no['number__max'] + 1

    number = models.IntegerField(unique=True, default=counter)
    name = models.CharField(blank=True, max_length=16)
    owner = models.ManyToManyField('User', blank=False, related_name="order_owners")

    BOOK = 'BK'
    CALENDAR = 'CL'
    MAGAZINE = 'MZ'
    NEWSPAPER = 'NP'
    FLYERS = 'FL'
    TYPE_CHOICES = [
        (None, "Select..."),
        (BOOK, 'Book'),
        (CALENDAR, 'Calendar'),
        (MAGAZINE, 'Magazine'),
        (NEWSPAPER, 'Newspaper'),
        (FLYERS, 'Flyers')
    ]
    type = models.CharField(max_length=2, choices=TYPE_CHOICES, blank=True)
    circulation = models.IntegerField(null=True, blank=True)

    BINDING_CHOICES = [
        (None, 'Select...'),
        ('GLU', 'Glue'),
        ('STA', 'Staple'),
        ('HAR', 'Hardcover'),
        ('FOL', 'Folding'),
    ]
    binding = models.CharField(blank=True, max_length=4, choices=BINDING_CHOICES,)
    width = models.IntegerField(null=True, blank=True)
    height = models.IntegerField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True, blank=True)
    delivery_date = models.DateTimeField(null=True, blank=True)
    submiting_files = models.DateTimeField(null=True, blank=True)
    due_date = models.DateTimeField(null=True, blank=True)

    # def parent_day():
    #     today = datetime.now()
    #     formatted_date = today.strftime("%a, %d.%m") + "_day"
    #     return formatted_date


    def save(self, *args, **kwargs):
        is_new = not self.pk  # Determine if the instance is new by checking if it has a primary key
        super().save(*args, **kwargs)  # Call the superclass's save method

        if is_new:  # If the instance was newly created
            print("!print(locale.getlocale())  ", locale.getlocale())  
            PrintSchedule.objects.create(order=self, parent_day=parent_day())

#    def __str__(self):
#        return f"{self.number} {self.name}"

    def serialize(self):
        try:
            block = Part.objects.get(order_id=self.id, part_name='BLO').serialize()
        except Part.DoesNotExist:
            block = ""
        try:
            cover = Part.objects.get(order_id=self.id, part_name='COV').serialize()
        except Part.DoesNotExist:
            cover = ""
        try:
            insert = Part.objects.get(order_id=self.id, part_name='INS').serialize()
        except Part.DoesNotExist:
            insert = "" 

        return {
            "number": self.number,
            "name": self.name,
            "owner": [user.last_name for user in self.owner.all()],
            "type": self.get_type_display(),
            "circulation": self.circulation,
            "binding": self.binding,
            "width": self.width,
            "height": self.height,
            "block": block,
            "cover": cover,
            "insert": insert,
            "created": self.created.strftime("%b %d %Y, %I:%M %p"),
            "due_date": self.due_date.strftime("%b %d %Y, %I:%M %p"),
            "delivery_date": self.delivery_date.strftime("%b %d %Y, %I:%M %p")            
        }

######################################################################################

class Part(models.Model):
    order = models.ForeignKey(Order, related_name='parts', on_delete=models.CASCADE)
    NAME_CHOICES =[
        ('BLO', 'блок'),
        ('COV', 'обложка'),
        ('INS', 'вклейка'),
        ('FRZ', 'форзаци'),
    ]
    part_name = models.CharField(blank=True, max_length=3, choices=NAME_CHOICES)
    pages = models.IntegerField(blank=True, null=True)
    paper = models.ForeignKey(Paper, null=True, on_delete=models.CASCADE, related_name="paper", blank=True)
    COLOR_CHOICES = [
        (None, 'Select...'),
        ('4_4', '4+4'),
        ('4_0', '4+0'),
        ('1_1', '1+1'),
        ('1_1', '1+0'),
    ]
    color = models.CharField(blank=True, max_length=3, choices=COLOR_CHOICES)

    LAMINATE_CHOICES = [
        (None, 'Select...'),
        ('MAT', 'Matte'),
        ('GL', 'Glossy'),
    ]
    laminate = models.CharField(blank=True, max_length=3, choices=LAMINATE_CHOICES)

    uflak = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.part_name}"

    def serialize(self):
        return {
            "part_name": self.part_name,
            "color": self.color,
            "uflak": self.uflak,
            "order": self.order.id,
            "pages": self.pages,
            "paper": self.paper.serialize()
        }


###############################################################################################

class PrintSchedule(models.Model):
    order_part = models.ForeignKey(Part, related_name='printing', on_delete = models.CASCADE)
    print_date = models.DateField(null=True, blank=True)
    sm1 = models.BooleanField(default=True)
    sm2 = models.BooleanField(default=False)
    rapida = models.BooleanField(default=False)
    printed_sheets = models.IntegerField(null=True, blank=True)
    circulation_sheets = models.IntegerField(null=True, blank=True)
    plates_is_done = models.BooleanField(default=True)
    position = models.IntegerField(null=True, blank=True)
    parent_day = models.CharField(blank=True, max_length=20)

    # def __str__(self):
    #     if self.day:
    #         return f"{self.print_date} (Day): №{self.order.number}"
    #     else:
    #         return f"{self.print_date} (Night): №{self.order.number}"
