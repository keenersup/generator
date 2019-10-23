## Web server generator with nodejs and graphql

```
git clone 

touch .env
# edit .env file with personal security

git init

npm run serve
```


## todo
```
client Dockerfile
```

## Docker
```
docker build -t app-test .
docker run -d  -p 8081:8081 --name app-test app-test
```

## docker-compose
```
docker-compose up -d
#rebuild
docker-compose up --build -d
```


## test
```
docker-compose -f docker-compose-dev.yml up -d

docker-compose -f docker-compose-db.yml up -d \
&& npm run dev
```

## .env 추가 파일
```
SERVER_PORT=8081
MONGO_EXPRESS_PORT=8082
MONGO_PORT=27017

MONGO_HOST=localhost
MONGODB_DATABASE=project

MONGO_ROOT_USER
MONGO_ROOT_PASSWORD

MONGODB_USER
MONGODB_PASSWORD

MONGOEXPRESS_LOGIN
MONGOEXPRESS_PASSWORD
```