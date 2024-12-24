from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
from django.db import models
from django.db.models import Max

import locale
import datetime

locale.setlocale(locale.LC_TIME, "Russian_Russia")  # Установить русскую локализацию. На Win10 было ru_RU или "Russian_Russia" убрал "ru_RU.utf8" на win10

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
        ('', 'Select...'),
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
    # matte = models.BooleanField(default=False)
    # glossy = models.BooleanField(default=False)
    
    class Density(models.IntegerChoices):
        D0 = 0, 'не известна'
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
    density = models.IntegerField(null=True, blank=True, choices=Density.choices)
    width = models.IntegerField(null=True, blank=True)
    height = models.IntegerField(null=True, blank=True)
    manufacturer = models.ManyToManyField(Company, blank=True, related_name="made_by")

    def __str__(self):
        return f"{self.name} {self.get_type_display()} {self.density} gr/m2"
    
    # class Meta:
    #     unique_together = ('name', 'type', 'density', 'width', 'height')

    # def serialize(self):
    #     return {
    #         "name": self.name,
    #         "type": self.type,
    #         "density": self.density,
    #         "width": self.width,
    #         "height": self.height,
    #         # "manufacturer": self.manufacturer
    #     }

###########################################################################

class Order(models.Model):
    def counter():
        no = Order.objects.aggregate(max_number=Max('number'))
        max_number = no['max_number']
        if max_number is None:
            return 1
        else:
            return max_number + 1

    number = models.IntegerField(unique=True, default=counter)
    name = models.CharField(blank=True, max_length=16)
    owner = models.ManyToManyField('User', blank=False, related_name="order_owners")

    BOOK = 'BK'
    CALENDAR = 'CL'
    MAGAZINE = 'MZ'
    NEWSPAPER = 'NP'
    FLYERS = 'FL'
    POSTER = 'POS'
    INSTRUCTION = 'INS'
    TYPE_CHOICES = [
        (None, "Select..."),
        (BOOK, 'Книга'),
        (CALENDAR, 'Календарь'),
        (MAGAZINE, 'Журнал'),
        (NEWSPAPER, 'Газета'),
        (FLYERS, 'Флаер'),
        (POSTER, 'Плакат'),
        (INSTRUCTION, 'Инструкция')

    ]
    type = models.CharField(max_length=3, choices=TYPE_CHOICES, blank=True)
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

#    def __str__(self):
#        return f"{self.number} {self.name}"

    # def serialize(self):
    #     try:
    #         block = Part.objects.get(order_id=self.id, part_name='BLO').serialize()
    #     except Part.DoesNotExist:
    #         block = ""
    #     try:
    #         cover = Part.objects.get(order_id=self.id, part_name='COV').serialize()
    #     except Part.DoesNotExist:
    #         cover = ""
    #     try:
    #         insert = Part.objects.get(order_id=self.id, part_name='INS').serialize()
    #     except Part.DoesNotExist:
    #         insert = "" 

    #     return {
    #         "number": self.number,
    #         "name": self.name,
    #         "owner": [user.last_name for user in self.owner.all()],
    #         "type": self.get_type_display(),
    #         "circulation": self.circulation,
    #         "binding": self.binding,
    #         "width": self.width,
    #         "height": self.height,
    #         "block": block,
    #         "cover": cover,
    #         "insert": insert,
    #         "created": self.created.strftime("%b %d %Y, %I:%M %p"),
    #         "due_date": self.due_date.strftime("%b %d %Y, %I:%M %p"),
    #         "delivery_date": self.delivery_date.strftime("%b %d %Y, %I:%M %p")            
    #     }

######################################################################################

class Part(models.Model):
    order = models.ForeignKey(Order, related_name='parts', on_delete=models.CASCADE)
    NAME_CHOICES =[
        ('BLO', 'блок'),
        ('COV', 'обложка'),
        ('VKL', 'вклейка.'),
        ('FRZ', 'форзацы'),
    ]
    part_name = models.CharField(blank=True, max_length=3, choices=NAME_CHOICES)
    pages = models.IntegerField(blank=True, null=True)
    paper = models.ForeignKey(Paper, null=True, on_delete=models.PROTECT, related_name="part_paper", blank=True)
    COLOR_CHOICES = [
        (None, 'Select...'),
        ('4+4', '4+4'),
        ('4+0', '4+0'),
        ('1+1', '1+1'),
        ('1+0', '1+0'),
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
    
    # def save(self, *args, **kwargs):
    #     is_new = not self.pk  # Determine if the instance is new by checking if it has a primary key
    #     super().save(*args, **kwargs)  # Call the superclass's save method

    #     if is_new:  # If the instance was newly created
    #         # print("!print(locale.getlocale())  ", locale.getlocale())  
    #         PrintSchedule.objects.create(order_part=self)

###############################################################################################


class Ctp(models.Model):
    plates = models.IntegerField(null=True, blank=True)
    plates_bad = models.IntegerField(null=True, blank=True)
    # printing = models.OneToOneField('PrintSchedule', on_delete=models.CASCADE, related_name='ctp_details', null=True, blank=True)
    printing = models.ForeignKey('PrintSchedule', null=True, blank=True, related_name='ctp_related', on_delete=models.CASCADE)
    # part = models.ForeignKey(Part, on_delete=models.CASCADE)
    plates_done_date = models.DateTimeField(null=True, blank=True) 
    notes = models.TextField(blank=True)
    STATUS_CHOICES = [
        ('in_progress', 'В работе'),
        ('issues', 'Проблемы с заказом'),
        ('completed', 'Сделан'),
    ]

    status = models.CharField(
        max_length=15,  # Достаточно длинный, чтобы вместить самый длинный ключ
        choices=STATUS_CHOICES,
        null=True,
        blank=True
        # default='null',  # Значение по умолчанию
    )


class PrintSchedule(models.Model):
    order_part = models.ForeignKey(Part, related_name='printing', on_delete = models.CASCADE)
    sm1 = models.BooleanField(default=False)
    sm2 = models.BooleanField(default=False)
    rapida = models.BooleanField(default=False)
    printed_sheets = models.FloatField(null=True, blank=True)
    circulation_sheets = models.IntegerField(null=True, blank=True)
    position = models.IntegerField(null=True, blank=True)
    parent_day = models.CharField(blank=True, max_length=20)
    ctp = models.ForeignKey(Ctp, on_delete=models.CASCADE, related_name='print_schedule', null=True, blank=True)
    
    def save(self, *args, **kwargs):
        is_new = not self.pk  # Determine if the instance is new by checking if it has a primary key
        super().save(*args, **kwargs)  # Call the superclass's save method

        if is_new and not self.ctp:  # Если это новое создание и ctp еще не задан
            ctp_instance = Ctp.objects.create(printing_id=self.pk)
            self.ctp = ctp_instance
            # Обновляем объект без вызова повторного сохранения всей модели
            PrintSchedule.objects.filter(pk=self.pk).update(ctp=ctp_instance)


    # def __str__(self):
    #     if self.day:
    #         return f"{self.print_date} (Day): №{self.order.number}"
    #     else:
    #         return f"{self.print_date} (Night): №{self.order.number}"


