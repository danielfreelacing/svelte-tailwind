!/bin/bash
cd zulzi-portal/portal-app
docker logout
sudo docker login -u soren365 -p lo1ve.docker
sudo docker-compose pull
sudo docker-compose up -d
