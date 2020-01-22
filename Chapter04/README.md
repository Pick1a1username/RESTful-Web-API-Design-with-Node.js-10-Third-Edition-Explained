# Chapter 4

## Introduction

## Starting App

Build a Docker image for db-helper:

```
$ cd db-helper
$ docker build -t pymongo:0.1 .
$ cd ..
```

Start containers by `docker-compose`:

```
$ docker-compose -f docker/docker-compose-test.yaml 
```

Run app:

```
$ docker exec -it docker_node_1 bash
# cd /root/app
# npm start
# exit
```

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

Run test (there are two kinds of test):

```
$ docker exec -it docker_node_1 bash
# cd /root/app
# npm test
# ./node_modules/.bin/mocha test/routes-test.js
```


## APIs

| Method   | URI                       | Description                                                  |
|----------|---------------------------|--------------------------------------------------------------|
| `Get`    | `/catalog`                | Retrieves all available categories in the catalog.           |
| `Post`   | `/catalog`                | Saves or updates an item.                                    |
| `Put`    | `/catalog`                | Saves or updates an item.                                    |
| `Get`    | `/catalog/item/{itemId}`  | Retrieves an item by its ID.                                 |
| `Delete` | `/catalog/item/{itemId}`  | Removes an item                                              |
| `Get`    | `/catalog/{categoryName}` | Retrieves all the items available under a specific category. |


## Swagger UI

Go to `http://localhost:3000/catalog/api-docs` after launching the app.


## Notes

* `bin/www` is included for the ease of test.
