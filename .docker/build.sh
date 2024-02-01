env_name=$1
image_tag=$(date '+%Y%m%d%H%M%S%3N')
remote_docker_repository='labcenter.stantum.cz:10001'
local_image_name='stantum.cz/rate-system-frontend/'${env_name,,}
remote_image_name=$remote_docker_repository'/addcar/rate-system-front-end/'${env_name,,}':'$image_tag
#remote_image_name_latest=$remote_docker_repository'/addcar/rate-system-backend/latest'

echo '================='
echo building image: $local_image_name
docker build ../ -f ./Dockerfile -t $local_image_name --build-arg ENV=$env_name
echo '================='

echo ''
echo '================='
echo tag image $local_image_name as $remote_image_name
docker tag $local_image_name $remote_image_name
#docker tag $local_image_name $remote_image_name_latest
echo '================='

echo ''
echo '================='
echo login to $remote_docker_repository
docker login $remote_docker_repository
echo '================='

echo ''
echo '================='
echo push $remote_docker_repository
docker push $remote_image_name
echo '================='

echo ''
echo 'JOB DONE: Image tag is: '$image_tag

#echo push $remote_image_name_latest
#docker push $remote_image_name_latest