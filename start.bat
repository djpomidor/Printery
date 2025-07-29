cd backend
.\.venv\Scripts\activate     
python manage.py runserver
venv\Scripts\activate  

docker-compose build frontend


перезапустить:
docker-compose up -d


docker logs --since 5m backend

Зайди внутрь контейнера backend:
docker exec -it backend bash

открыт ли порт 8000:
sudo ufw status


Удалить ненужные пакеты, логи и старые Docker-образы:
apt-get clean
docker system prune -af

Подключись к контейнеру базы данных:
docker exec -it postgres_db psql -U postgres