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

Перезапустите контейнеры:
docker-compose down
docker-compose up -d --build

Затем проверьте логи снова:
docker logs -f nginx

Если ты знаешь имя контейнера (например, backend), выполни:
docker logs -f backend
Флаг -f означает "следить за логами в реальном времени" (как tail -f).

Если хочешь посмотреть только последние 100 строк:

docker logs --tail 100 backend

Если ты запускаешь runserver, а хочешь зайти внутрь и вручную что-то проверить:
docker exec -it backend bash

А внутри уже можно запустить, например:
python manage.py showmigrations