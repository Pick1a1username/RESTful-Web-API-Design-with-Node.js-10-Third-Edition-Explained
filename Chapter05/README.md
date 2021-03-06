# Chapter 5

## Introduction

This chapter is incomplete, and no plan to complete this chapter.

This chapter has several parts which are not fully explained. So Just go to chapter 6 after reading chapter 5 in the textbook.

## Starting App

Build a Docker image for db-helper:

```
$ cd db-helper
$ docker build -t pymongo:0.1 .
$ cd ..
```

Start containers by `docker-compose`:

```
$ docker-compose -f docker/docker-compose.yaml 
```

Run app:

```
$ docker exec -it docker_node_1 bash
# cd /root/app
# npm start
# exit
```


## Testing App (WIP)

Build a Docker image for db-helper if you haven't done yet:

```
$ cd db-helper
$ docker build -t pymongo:0.1 .
$ cd ..
```

Start containers by `docker-compose`:

```
$ docker-compose -f docker/docker-compose.yaml 
```

Run test (there are two kinds of test):

```
$ docker exec -it docker_node_1 bash
# cd /root/app
# npm test
# ./node_modules/.bin/mocha test/routes-test.js --exit
```


## APIs (WIP)

| Method   | URI                       | Description                                                  |
|----------|---------------------------|--------------------------------------------------------------|
| `GET`    | `/catalog`                | Retrieves all available categories in the catalog.           |
| `GET`    | `/catalog/{categoryName}` | Retrieves all the items available under a specific category. |
| `GET`    | `/item/{itemId}`  | Retrieves an item by its ID.                                 |
| `POST` | `/item/`  | Creates a new item; if an item with the same ID exists, it will be updated.                                              |
| `PUT` | `/item/{itemId}`  | Updates an existing item; if an item with the provided ID does not exist, it creates it. |
| `DELETE` | `/item/{itemId}`  | Deletes an existing item.                         |


## Swagger UI

Go to `http://localhost:3000/catalog/api-docs` after launching the app.


## Notes

* `bin/www` is included for the ease of test.
