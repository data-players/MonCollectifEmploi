# customisation de Archipelago pour Transiscope en pays nantais

pour accéder à l'outil et decovrire le projet : https://nantes.transiscope.org/

## lancer le logiciel localement

```
make start-local
```
To stop it : ``` make stop-local ```
Frontend on http://localhost:4000/
Middleware on http://localhost:3000/
Fuseki database on http://localhost:3030 (user: admin, password : admin)
keycloak on http://localhost:8080 (Keycloak is a custom OIDC)
You will get an error when creating some organisation :
```
index.js:209 Error: @semapps/geo-components : No access token in mapbox configuration
```
This is because MapBox Access Token is not define in the docker-compose file. This is not really a problem for local testing.

## Customisation

#### Custom frontend

If you want minor frontend change you can follow this step. Exemples : App Title, App Bar Color, Tab title and favicon.

Use the addOn directory in the repo to replace logo192/512.png, App.js, index.html and favicon.ico.

logo192.png : App Bar Logo, change it by your own logo (same name).

logo512.png : Ressource Logo, change it by your own (same name).

App.js : App Bar title, replace "MyArchipelago" line 23.

index.html : tab bar title, replace "MyArchipelago" line 18.

favicon.ico : tab bar icon, replace the file by your own (same name).

You can change the theme by owervriting customTheme.js, if you just need to change the App Bar color, replace css color "#28ccfb" line 8 by your selected color.

You can easily change other file and custom your archipelago from this directory. But if you begin to change everithing, maybe you need a custom deploye. More optimised.

#### Custom middleware

Of course you can also change middleware files by adding them into the addOn/middlewaredirectory. Same advise as frontend, rememeber that if you need more than simple changes, you probably need a custom archipelago.

