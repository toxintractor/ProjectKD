# Knowledge and Data

This tutorial shows the basics for building Sem-Web apps based on what you have learnt so far.

## Goals of the tutorial

In this session you will learn how to:

* set up a web-app
* connect your web-app with your triplestore
* create nice visualisations of your data  
* create dynamic interactions between your web-app and your GraphDB triplestore.

### Things we will be using

* `vuDataset.ttl` as data example. This Turtle file contains only 9 triples, describing the courses each teacher is involved in.
* HTML to generate the content in a web page
* CSS style, following the [Bootstrap](https://getbootstrap.com/docs/4.0/components) toolkit
* [Angular](https://angular.io/), a Javascript framework to facilitate the bindings between  
* The [Chart.js](http://jtblin.github.io/angular-chart.js/) library to visualise data  

**N.B. The information above is only for reference!!** No need to install anything, everything you need is already in the .zip file.


## Setting up

* Just download the files (`index.html`, `main.js`, `vuDataset.ttl` as well as the css + js subdir) from this directory.
* Start your GraphDB Workbench.

## Steps

* Create a new repository in GraphDB, and name it `repo-VU`
* Import the `vuDataset.ttl` dataset into this repository (Import --> RDF --> Upload RDF Files)
* Test the following SPARQL query in your `repo-VU` repository (see `Screenshot-Query.png` from this directory)
```
SELECT ?teacher (COUNT(?course) AS ?nbr_courses)
WHERE { ?teacher <http://example.org/vu/teaches> ?course }
GROUP BY (?teacher)
ORDER BY DESC(?nbr_courses)
```
* Open `index.html` in your browser
* Give a name for your Web application, and write it in the first text field
* Paste the GraphDB repository URL in the second text field (see `Screenshot-Repository.png` from this directory)
* Paste the SPARQL query that you wrote before in the third text field
* Click the button `GO!`. Now you should see a Pie Chart showing the teaching distribution between the three teachers (see `Screenshot-WebApp.png` from this directory)

To understand what is happening, and play around with the interface and the queries, open `index.html` and the `main.js` in a text editor of your choice (preferably a text editor with syntax highlighting like `atom` to see clearly the code).


## Problems? Some trouble-shooting:

* _How to see what kind of errors I'm getting?_ --> Right click anywhere on your Web page --> click `inspect` --> click on the tab `console`

* _I modified something on the `index.html` or `main.js`, but nothing has changed_ -->
Did you save your files again and reloaded the Web page?

* _I'm getting an error concerning `Access-Control-Allow-Origin`_ --> two possible ways to solve this error: 1. Install the [moesif CORS extension](https://chrome.google.com/webstore/detail/moesif-orign-cors-changer/digfbfaphojjndkpccljibejjbppifbc?hl=en-US) in your browser and turned it on, or 2. Add the following line in your GraphDB settings `-Dgraphdb.workbench.cors.enable=True` (not the GraphDB Workbench but the settings, see `Screenshot-GraphDB-settings.png`)

* _I'm getting some connection error_ --> try to replace the IP address in the GraphDB repository URL with localhost. For instance, replace `http://192.168.0.102:7200/repositories/repo-VU` with `http://localhost:7200/repositories/repo-VU`.
