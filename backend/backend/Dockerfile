FROM python:3.9-slim

# Установим системные зависимости для сборки
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    python3-dev \
    libffi-dev \
    libssl-dev \
    libpq-dev \
    zlib1g-dev \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get install -y locales libc-bin && \
    echo "ru_RU.UTF-8 UTF-8" > /etc/locale.gen && \
    locale-gen

ENV LANG ru_RU.UTF-8
ENV LC_ALL ru_RU.UTF-8

ENV LANG ru_RU.UTF-8
ENV LC_ALL ru_RU.UTF-8

# Установим рабочую директорию
WORKDIR /app

# Скопируем файлы проекта
COPY requirements.txt /app/

# Обновим pip
RUN pip install --upgrade pip

# Установим зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Скопируем остальные файлы проекта
COPY . /app/

# Команда запуска
CMD ["python", "manage.py", "runserver", "0.0.0.0:3000"]
