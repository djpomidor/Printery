cd backend
.\.venv\Scripts\activate     
python manage.py runserver

venv\Scripts\activate  

docker-compose build frontend
docker-compose up -d

docker logs --since 5m backend
