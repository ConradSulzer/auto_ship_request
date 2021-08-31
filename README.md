# Auto Ship Request

A simple node app that you can use to automatically generate new shipment request lcoally.

## Usage
1. Clone the repo: `git@github.com:ConradSulzer/auto_ship_request.git`
2. Run `npm install`
3. Create a file named `.env` in the root directory and add the following:
```
APP_IP_ADDRESS= 192.168.0.# //your computers local IP where Fillogic app is running
CLIENT_ID=<client_id from Fillogic app>
CLIENT_SECRET=<client secret from Fillogic app>
USERNAME=<admin email from Fillogic app>
PASSWORD=<admin passowrd for above email>
```
4. Run `node app.js` from the app's root directory.
5. When prompted in the terminal, enter the number of shipment request to generate.
6. When prompted in the terminal, enter the number of milliseconds to wait between requests. 


The requests are sent synchronously so even if you put 1 ms as the wait time the fastest 
it can run subsequent requests is however long it takes to get a response for the previous request.
This currently only supports domestic requests and one static line item.
