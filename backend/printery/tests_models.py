from django.test import TestCase
from .models import *


################  Тестирование модели User

class UserModelTests(TestCase):
    def setUp(self):
        # Создаем тестовую компанию для пользователя
        self.company = Company.objects.create(
            name="Test Company",
            address="123 Test St",
            city="Testville",
            postal_code=12345,
            country="Testland",
            email="test@example.com",
            phone="+1234567890",
            is_manufacturer=True,
            is_customer=False
        )
    
    def test_create_user(self):
        user = User.objects.create_user(
            username="testuser",
            password="password",
            phone_number="+123456789",
            company=self.company,
            is_customer=True,
            is_employee=False
        )
        
        # Проверяем, что пользователь создан
        self.assertEqual(user.username, "testuser")
        self.assertEqual(user.phone_number, "+123456789")
        self.assertEqual(user.company, self.company)
        self.assertTrue(user.is_customer)
        self.assertFalse(user.is_employee)

################# Тестирование модели Company

class CompanyModelTests(TestCase):
    def test_create_company(self):
        company = Company.objects.create(
            name="Print Co.",
            address="456 Print Ave",
            city="Print City",
            postal_code=54321,
            country="Printland",
            email="contact@printco.com",
            phone="+1987654321",
            is_manufacturer=False,
            is_customer=True
        )
        
        # Проверка полей компании
        self.assertEqual(company.name, "Print Co.")
        self.assertEqual(company.city, "Print City")
        self.assertTrue(company.is_customer)
        self.assertFalse(company.is_manufacturer)

################Тестирование модели Paper

class PaperModelTests(TestCase):
    def setUp(self):
        self.company = Company.objects.create(
            name="Test Manufacturer",
            phone="+1234567890",
            is_manufacturer=True
        )

    def test_create_paper(self):
        paper = Paper.objects.create(
            name="High-Quality Paper",
            type="GL",
            density=200,
            width=210,
            height=297
        )
        paper.manufacturer.add(self.company)
        
        # Проверка полей бумаги
        self.assertEqual(paper.name, "High-Quality Paper")
        self.assertEqual(paper.type, "GL")
        self.assertEqual(paper.density, 200)
        self.assertEqual(paper.width, 210)
        self.assertEqual(paper.height, 297)
        self.assertIn(self.company, paper.manufacturer.all())


########  Тестирование модели Order

from datetime import datetime

class OrderModelTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="customer",
            password="password",
            phone_number="+123456789"
        )

    def test_create_order(self):
        order = Order.objects.create(
            number=1,
            name="Sample Order",
            type="BK",
            circulation=1000,
            binding="GLU",
            width=210,
            height=297
        )
        order.owner.add(self.user)
        
        # Проверка полей заказа
        self.assertEqual(order.number, 1)
        self.assertEqual(order.name, "Sample Order")
        self.assertEqual(order.type, "BK")
        self.assertEqual(order.circulation, 1000)
        self.assertEqual(order.binding, "GLU")
        self.assertEqual(order.width, 210)
        self.assertEqual(order.height, 297)
        self.assertIn(self.user, order.owner.all())


###########  Тестирование модели Part

class PartModelTests(TestCase):
    def setUp(self):
        self.order = Order.objects.create(
            name="Test Order"
        )
        self.paper = Paper.objects.create(
            name="Standard Paper",
            type="OFF",
            density=80
        )

    def test_create_part(self):
        part = Part.objects.create(
            order=self.order,
            part_name="BLO",
            pages=100,
            paper=self.paper,
            color="4_4",
            laminate="GL"
        )
        
        # Проверка полей части
        self.assertEqual(part.order, self.order)
        self.assertEqual(part.part_name, "BLO")
        self.assertEqual(part.pages, 100)
        self.assertEqual(part.paper, self.paper)
        self.assertEqual(part.color, "4_4")
        self.assertEqual(part.laminate, "GL")

###########  Тестирование модели PrintSchedule


class PrintScheduleModelTests(TestCase):
    def setUp(self):
        self.order = Order.objects.create(name="Test Order")
        self.part = Part.objects.create(order=self.order, part_name="BLO")

    def test_create_print_schedule(self):
        schedule = PrintSchedule.objects.create(
            order_part=self.part,
            print_date=datetime.now(),
            sm1=True,
            sm2=False,
            rapida=True,
            printed_sheets=100.5,
            circulation_sheets=100,
            plates_is_done=True,
            position=1,
            parent_day=parent_day()
        )
        
        # Проверка полей расписания печати
        self.assertEqual(schedule.order_part, self.part)
        self.assertTrue(schedule.sm1)
        self.assertFalse(schedule.sm2)
        self.assertTrue(schedule.rapida)
        self.assertEqual(schedule.printed_sheets, 100.5)
        self.assertEqual(schedule.circulation_sheets, 100)
        self.assertTrue(schedule.plates_is_done)
        self.assertEqual(schedule.position, 1)
        self.assertEqual(schedule.parent_day, parent_day())


