# Prueba de concepto REACT + LARAVEL + MYSQL


### Requisitos previos:
- docker 

## Sen contruye el escenario utilizando docker-compose
### se contruyen los containers del escenario completo
```bash  
npm run composer
```
### Se inicializa el Api con la data y las tablas de la db
```bash  
npm run api:init
```

## los pueros expuestos en el escenario con composer son: 
- Para la DB localhost:3307
- Para el API localhost:8585
- Para el CLIENT localhost:3333




# Sen construyen los contenedores para el escenario manualmente
### Estos conmandos estan construidos para ser ejecutados en windows pront
## crear container para mysql


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


### comando utilis
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'
docker logs mysql | tail -n 2
mysql -uroot -pmanager -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'"

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

https://www.keiron.cl/test/react-laravel/


