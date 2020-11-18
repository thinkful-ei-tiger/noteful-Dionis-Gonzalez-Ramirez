# Noteful-Dionis-Gonzalez-Ramirez
Simple Noteful app \
Live: https://noteful-5ffxujxvd.vercel.app/

## Noteful JSON server
To get your local copy of the noteful API, clone this project into your local projects folder.
```
git clone https://github.com/tomatau/noteful-json-server
cd ./noteful-json-server
npm install
npm start
```

### Ctrl-c to close the server
You can see documentation for the JSON-server once it's started by visiting http://localhost:9090. \
You can see all of the data currently stored in the server by visiting http://localhost:9090/db. \
To fetch the notes and folders, you should make two GET requests:

- http://localhost:9090/folders
- http://localhost:9090/notes
