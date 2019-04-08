# Sonate ♪

♪ A game where you have to find a song thanks to its translated lyrics! ♪ 

## How to use

### Requirement
You only need NodeJs (V10.14.2 or higher)

### Getting Started
#### Deploy Dev
##### Front

```sh
cd ./front/
npm install
npm start
```

##### BACK

```sh
cd ./api/
npm install
npm start
```


#### Deploy Prod

##### Front
Prod (PWA ready): 
```sh
cd ./front/
npm install
npm run build
```
Then, if you want to start the application with its own static server: 
```sh
(npm i serve)
serve -l 5001 -s build
```
Otherwise, if you want to launch the application with the routing of the back, simply use the back's address (default: "localhost:5000").

#### BACK
```sh
cd ./api/
npm install
npm start
```
You are now ready to play Sonate ♪ !
![newclub](https://user-images.githubusercontent.com/24525092/55685571-3ef8d600-5958-11e9-8e29-a7d37b625b83.png)

PS : Don't forget to copy the "example.env" files into".env" to adjust your preferences.
## Updates

### 0.1
* First Launch
