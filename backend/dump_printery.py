import os
import django
from django.core.management import call_command

# Укажи путь к своим настройкам
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")


django.setup()

with open("printery.json", "w", encoding="utf-8") as f:
    # Экспортируем только модели приложения printery
    # Можно добавить --indent для читаемости
    call_command("dumpdata", "printery", "--indent", "2", stdout=f)
