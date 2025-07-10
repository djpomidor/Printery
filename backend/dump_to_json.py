import os
import django
from django.core.management import call_command

# Укажи модуль настроек, например, если у тебя backend/settings.py:
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

# Инициализируй Django
django.setup()

# Сохраняем дамп с UTF-8
with open("data.json", "w", encoding="utf-8") as f:
    call_command("dumpdata", exclude=["auth.permission", "contenttypes"], stdout=f)
