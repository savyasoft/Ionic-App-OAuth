#Ionic-App-OAuth


Sample Ionic Application that uses Ionic-OAuth https://github.com/savyasoft/Ionic-OAuth


##Create Ionic app for this service

* create an ionic application. ( ionicframework.com/docs/guide/starting.html  )
* Replace the templates ( folder ) , js ( folse ) and index.html files should be replaced in your ionic application's www folder.
* Replace the bower.json in your ionic application.

##Adding Bower Dependancies

Installig all bower libraries specified in bower.json file. 

```
bower install;
```

(or)

```
bower install angular-cookies;

bower install ionic-oauth;
```

All bower libraries are installed by default other than "angular-cookies"  and "ionic-oauth" .
So it is sufficient to install only those dependancies.

## Update the facebook / twitter / google appid 

Edit the www/lib/ionic-oauth/dist/ionic-oauth.js file to include the following info and save the file

- 'server_url' constant in line 2, to refer to the node oauth proxy server (refer to a sample implementation of this oauth server, https://github.com/savyasoft/Ionic-Node-Server.git )

- Facebook app id in line 5 
- Windows live connect app id in line 6
- Google oauth app id in line 6
- Twitter app id in line 7

## Run the application

* Ensure that the node oauth server is running before the ionic application
* Run the ionic application with 'ionic server' to test it in the browser

