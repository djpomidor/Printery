from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import Order, Part, Paper
from django.contrib.auth import get_user_model

User = get_user_model()

class OrderCreateTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password")
        self.client.force_authenticate(user=self.user)
        
        # Создание тестовых данных для Part и Paper
        self.paper = Paper.objects.create(name="Glossy Paper", type="glossy", density=100)
        
    def test_create_order_success(self):
        url = reverse('order-create')
        data = {
            "number": 1,
            "nameOfOrder": "Test Order",
            "typeOfOrder": "standard",
            "parts": [
                {
                    "pages": 10,
                    "paper": {
                        "name": "Glossy Paper",
                        "type": "glossy",
                        "density": 100
                    },
                    "color": "black",
                }
            ]
        }
        
        response = self.client.post(url, data, format='json')
        
        # Проверяем, что запрос прошел успешно
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # Проверяем содержимое ответа
        self.assertEqual(response.data["nameOfOrder"], "Test Order")
        self.assertEqual(response.data["parts"][0]["pages"], 10)
    
    def test_create_order_missing_field(self):
        url = reverse('order-create')
        data = {
            "number": 1,
            "nameOfOrder": "Test Order",
            # Отсутствует поле parts
        }
        
        response = self.client.post(url, data, format='json')
        
        # Проверяем, что запрос возвращает ошибку валидации
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("parts", response.data)
