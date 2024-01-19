#!/bin/sh
echo "CURRENT TIME = "`date`
echo "HOSTNAME = "`hostname`
echo "USER id = "`whoami`
echo "RUNNING CONTAINER = "`sudo docker container ls | grep soren365/projectx-portal-webapp`
