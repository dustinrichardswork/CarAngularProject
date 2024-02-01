image_tag=$1
context=addcar-dev-cz
env_name='dev'
container_name='addcar--rate-system-frontend--'${env_name,,}
remote_docker_repository='labcenter.stantum.cz:10001'
remote_image_name=$remote_docker_repository'/addcar/rate-system-front-end/'${env_name,,}':'$image_tag

echo '======================='
echo 'Login to container registry '$remote_docker_repository
docker --context $context login $remote_docker_repository
echo '======================='
echo ''

echo '======================='
echo 'Removing old container'
docker --context $context rm -f $container_name || true
echo '======================='
echo ''

echo '======================='
echo 'Pulling image: '$remote_image_name
docker --context $context pull $remote_image_name
echo '======================='
echo ''

echo '======================='
echo 'Starting new container: '$remote_image_name
docker --context $context run \
  -d \
  -p 25501:80 \
  --name $container_name \
  $remote_image_name
echo '======================='
echo ''