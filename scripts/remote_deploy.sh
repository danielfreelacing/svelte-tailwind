#!/bin/sh

echo "running remote_deploy.sh and deploy_build.sh"
sh get_host_info.sh
ssh ubuntu@51.20.89.233 'bash -s' < ./deploy_build.sh
xdg-open http://51.20.89.233:3000/items
