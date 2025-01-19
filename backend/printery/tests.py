from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.urls import reverse
from django.contrib.auth import get_user_model
from .models import Company, Paper, Order, Part

User = get_user_model()

class OrderAPITests(APITestCase):
    def setUp(self):
        # Создаем тестового пользователя
        self.user = User.objects.create_user(username="customer", password="password123")
        
        # Получаем JWT токен для аутентификации
        token_url = reverse("token_obtain_pair")
        response = self.client.post(token_url, {"username": "customer", "password": "password123"}, format="json")
        self.access_token = response.data.get("access")

        # Создаем экземпляр APIClient и устанавливаем заголовок авторизации
        self.client = APIClient()
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.access_token}")
        
        # Создаем тестовую компанию и бумагу для заказа
        self.company = Company.objects.create(
            name="Print Co.",
            address="123 Main St",
            city="Printville",
            postal_code=12345,
            country="Printland",
            email="info@printco.com",
            phone="+1234567890",
            is_manufacturer=True,
            is_customer=True
        )
        
        self.paper = Paper.objects.create(
            name="High-Quality Paper",
            type="GL",
            density=200,
            width=210,
            height=297
        )
        self.paper.manufacturer.add(self.company)

    def test_create_order_with_part(self):
        """
        Проверяем создание заказа с одной частью (Part).
        """
        url = reverse("order-list")  # Убедитесь, что имя пути соответствует вашему `urlpatterns`

        # Данные для заказа и его части
        order_data = {
            "number": 1,
            "name": "Sample Order",
            "type": "BK",
            "circulation": 500,
            "binding": "GLU",
            "width": 210,
            "height": 297,
            "owner": [self.user.id],  # Указываем владельца заказа
            "parts": [
                {
                    "part_name": "BLO",
                    "pages": 100,
                    "paper": self.paper.id,
                    "color": "4_4",
                    "laminate": "GL",
                    "uflak": True
                }
            ]
        }

        response = self.client.post("/orders/", order_data, format="json")

        # Проверяем успешное создание заказа
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["name"], "Sample Order")
        self.assertEqual(response.data["circulation"], 500)

        # Проверяем, что часть заказа сохранена правильно
        parts = response.data["parts"]
        self.assertEqual(len(parts), 1)
        self.assertEqual(parts[0]["part_name"], "BLO")
        self.assertEqual(parts[0]["pages"], 100)
        self.assertEqual(parts[0]["paper"], self.paper.id)
        self.assertEqual(parts[0]["color"], "4_4")
        self.assertEqual(parts[0]["laminate"], "GL")
        self.assertTrue(parts[0]["uflak"])

    def test_create_order_without_part(self):
        """
        Проверяем создание заказа без частей.
        """
        url = reverse("order-list")

        # Данные для заказа без части
        order_data = {
            "number": 2,
            "name": "Order Without Part",
            "type": "NP",
            "circulation": 1000,
            "binding": "STA",
            "width": 200,
            "height": 280,
            "owner": [self.user.id]
        }

        response = self.client.post("/orders/", order_data, format="json")

        # Проверка успешного создания заказа
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["name"], "Order Without Part")
        self.assertEqual(response.data["circulation"], 1000)
        self.assertEqual(response.data["binding"], "STA")
        self.assertEqual(response.data["width"], 200)
        self.assertEqual(response.data["height"], 280)

    def test_create_order_invalid_data(self):
        """
        Проверка, что создание заказа с некорректными данными вызывает ошибку.
        """
        url = reverse("order-list")

        # Данные заказа с отсутствующим обязательным полем "name"
        invalid_order_data = {
            "number": 3,
            "type": "BK",
            "circulation": 500,
            "binding": "GLU",
            "width": 210,
            "height": 297,
            "owner": [self.user.id]
        }

        response = self.client.post("/orders/", invalid_order_data, format="json")

        # Проверяем, что возвращается ошибка
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("name", response.data)

    def test_unauthenticated_create_order(self):
        """
        Проверка, что неавторизованный пользователь не может создать заказ.
        """
        self.client.credentials()  # Удаляем токен из заголовка

        order_data = {
            "number": 4,
            "name": "Unauth Order",
            "type": "FL",
            "circulation": 300,
            "binding": "HAR",
            "width": 200,
            "height": 250,
            "owner": [self.user.id]
        }

        response = self.client.post("/orders/", order_data, format="json")

        # Проверяем, что неавторизованный запрос отклонен
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
