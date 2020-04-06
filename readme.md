# Prueba de concepto REACT + LARAVEL + MYSQL en DOCKER
### Aplicación de tickets con perfil de usuarios desarrollada en REACT para el FRONT, LARAVEL para BACK y MYSQL en la Base de datos. Desplegado completamente en contenedores docker

### Descripción de la aplicación
La aplicación consta de un Login para autenticar los usuarios, luego al ingresar se muestra una tabla dode se administraran todas las funcionalidades de la aplicación. 
- Permite Cear, editar, listar y borrar los usuario de la aplicación 
- Crear, listar, editar y borrar los tickets 
- Crear, listar, editar y borrar los roles del 

![Dashboard](https://raw.githubusercontent.com/jesuslas/crud-react-laravel/master/client/public/dashboard.PNG)

### Requisitos previos:
- git
- docker 
- docker-compose

## Se clona el repositorio
```bash  
git clone git@github.com:jesuslas/crud-react-laravel.git
```

## Sen contruye el escenario utilizando docker-compose
### se contruyen los containers del escenario completo
Aqui se construyen las imagenes con los dockerfile para el fron y el back.
```bash  
npm run composer
```
### Se inicializa el Api con la data y las tablas de la db
Aqui se corre el autoload de composer se agregan los migration y se crean los datos de prueba en la bd.

```bash  
npm run api:init
```

## los puertos expuestos en el escenario con composer son: 
- Para la DB localhost:3307
- Para el API localhost:8585
- Para el CLIENT localhost:3333


## Sen construyen los contenedores para el escenario manualmente
### Estos conmandos estan construidos para ser ejecutados en windows pront
### crear container para mysql
```bash   
docker run --name mysql-db -p 3307:3306 --memory=512MB --memory-swap=512MB -e MYSQL_ROOT_PASSWORD=manager -e MYSQL_DATABASE=laravel -d mysql --default-authentication-plugin=mysql_native_password
```

### crear container con el laravel api
```bash  
docker run -d --name l-api --link mysql-db --volume=%cd%/api:/laravel-api -w=/api -p 8585:8000 --memory=1024MB --memory-swap=1024MB --entrypoint="/usr/local/bin/php"  lorisleiva/laravel-docker artisan serve --host 0.0.0.0
```
### crear container con el laravel client
```bash  
docker run -d --name l-client --link laravel-api --volume=%cd%/client:/client -w=/client -p 3333:3000 --memory=4024MB --memory-swap=4024MB  node:12.2.0-alpine npm start
```
## comando utilis

GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'
docker logs mysql | tail -n 2
mysql -uroot -pmanager -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'"

### arrancar servidor laravel
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

### se crear los seeders
php artisan make:seed UsersSeeder
php artisan make:seed UserTypeSeeder
php artisan make:seed TicketsSeeder

### se crean los seeders
php artisan db:seed


