# Knowledge and Data Project App

We made a VideoGame recommender app on basis of the tutorial app.

## How the app works

The app works on basis of angular. This app makes a connection with graphdb.
If you choose a game in the list, the 12 recommended apps will apear.

### How to get the app Working

* Download al the files in this repository


## Problems? Some trouble-shooting:

* _How to see what kind of errors I'm getting?_ --> Right click anywhere on your Web page --> click `inspect` --> click on the tab `console`

* _I modified something on the `index.html` or `main.js`, but nothing has changed_ -->
Did you save your files again and reloaded the Web page?

* _I'm getting an error concerning `Access-Control-Allow-Origin`_ --> two possible ways to solve this error: 1. Install the [moesif CORS extension](https://chrome.google.com/webstore/detail/moesif-orign-cors-changer/digfbfaphojjndkpccljibejjbppifbc?hl=en-US) in your browser and turned it on, or 2. Add the following line in your GraphDB settings `-Dgraphdb.workbench.cors.enable=True` (not the GraphDB Workbench but the settings, see `Screenshot-GraphDB-settings.png`)

* _I'm getting some connection error_ --> try to replace the IP address in the GraphDB repository URL with localhost. For instance, replace `http://192.168.0.102:7200/repositories/repo-VU` with `http://localhost:7200/repositories/repo-VU`.
