#bin/sh

echo "running remote_deploy.sh and deploy_build.sh"
echo cd
ssh ubuntu@51.20.89.233 'bash -f' < deploy_build.sh
