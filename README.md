﻿
# Sonate ♪

  

♪ A game where you have to find a song thanks to its translated lyrics! ♪ (**School Project**)

  

## How to use

  

### Requirement

You only need Docker

  

### Getting Started

#### Development deployment

Uncomment "api-dev" and "app-dev" containers and comment "api" and "app" containers in 'docker-compose.yml'.

Then simply run everything with :

```sh

docker-compose up

```
PS : You can edit the project thanks to volumes and hot reloading without rebuild images !

#### Production deployment (PWA ready !)


Uncomment "api" and "app" containers and comment "api-dev" and "app-dev" containers in 'docker-compose.yml'.

Then simply run everything with :

```sh

docker-compose up

```

You are now ready to play Sonate ♪ !

![newclub](https://user-images.githubusercontent.com/24525092/55685571-3ef8d600-5958-11e9-8e29-a7d37b625b83.png)

  

PS : Don't forget to copy the "example.env" files into".env" to adjust your preferences.

## Architecture

  ![schema](https://user-images.githubusercontent.com/24525092/58804679-bb372f00-8612-11e9-8736-8a4cc19d3969.jpg)
### Front 
Built with **ReactJs** and the components librairy **Bulma**
PWA Ready (only in build mode)

### API
In **NodeJs** with **Express**
**Passport** & **Passeport-JWT** for login strategy and **Bcrypt** to encrypt/decrypt password
**Mongoose** to access and manage datas in MongoDB container
**Request** & **Request-promise** to make Http call (use to parse the lyrics of the songs)

|Route                                            |HTTP Verb|Result                                   |Auth ?|
|-------------------------------------------------|:-------:|:---------------------------------------:|:----:|
|/api/constants                                   |GET      |Get constants                            |NO    |
|api/song/byname?song=<>&band=<>&lang=<>          |GET      |Get song by title and band               |YES   |
|api/song/byband?band=<>&lang=<>                  |GET      |Get song by band                         |YES   |
|api/song/byalbum?band=<>&album=<>&year=<>&lang=<>|GET      |Get song by album, year, and band        |YES   |
|api/song/art?band=<>&album=<>&year=<>            |GET      |Get artwork by album and year            |YES   |
|api/song/clues?band=<>                           |GET      |Get clues by band                        |YES   |
|api/user/register                                |POST     |Post a user (username/password/password2)|NO    |
|api/user/login                                   |POST     |Post a login(username/password)          |NO    |
|api/user/test                                    |GET      |Get a test                               |YES   |
|api/scores/history                               |GET      |Get last games                           |YES   |
|api/scores/history                               |POST     |Post a new game (level/time/songs)       |YES   |

### MongoDB
Init with datas 

Database **sonate** :

|Collection            |Content                                       |
|----------------------|----------------------------------------------|
|param_countries       |Countries with their english and french names |
|param_googleTradLangs |Available language in Google Translate        |
|param_levels          |Settings about mode                           |
|param_settings        |Settings about game                           |
|history               |Historic of game played                       |
|users                 |Users                                         |

## Updates

### 0.2

* Improves and docker

### 0.1

* First Launch
