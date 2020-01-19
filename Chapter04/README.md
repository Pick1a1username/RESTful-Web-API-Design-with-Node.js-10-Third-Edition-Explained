# Chapter 4

## Introduction

## Starting App

## Testing App

Build a Docker image for db-helper if you haven't done yet:

```
$ cd db-helper
$ docker build -t pymongo:0.1 .
$ cd ..
```

Start containers by `docker-compose`:

```
$ docker-compose -f docker/docker-compose-test.yaml 
```

Bootstrap DB:

```
$ docker exec -it docker_pymongo_1 bash
# cd /app
# ./db-helper.py
# exit
```

Run test:

```
$ docker exec -it docker_node_1 bash
# cd /root/app
# npm start
# exit
```


## APIs

## Swagger UI

## Notes


* `bin/www` is included for the ease of test.
