GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'
docker logs mysql | tail -n 2

mysql -uroot -pmanager -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'"

### crear container para mysql
docker run --name mysql-db -p 3307:3306 --memory=512MB --memory-swap=512MB -e MYSQL_ROOT_PASSWORD=manager -e MYSQL_DATABASE=laravel -d mysql --default-authentication-plugin=mysql_native_password

### crear container con el laravel api
docker run -d --name laravel-api --link mysql-db --volume=D:\Proyectos\jalpino\laravel\api:/laravel-api -w=/laravel-api -p 8585:8000 --memory=1024MB --memory-swap=1024MB -it --entrypoint="php artisan serve --host 0.0.0.0"  lorisleiva/laravel-docker

### arrancar servidor
php artisan serve --host 0.0.0.0

### crear migration
php artisan make:migration create_table_user_types
php artisan make:migration create_table_users
php artisan make:migration create_table_tickets

### ejecutamos la migration
php artisan migrate

### crear modelos
php artisan make:model Users
php artisan make:model UserTypes
php artisan make:model Tickets

### crear los Controllers
php artisan make:controller UsersController -r
php artisan make:controller UserTypesController -r
php artisan make:controller TicketsController -r

### router list
php artisan route:list