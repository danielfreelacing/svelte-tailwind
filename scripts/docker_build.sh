#/bin/sh

docker-compose up --build -d
xdg-open http://127.0.0.1:3000/items
echo "build dockerized"
