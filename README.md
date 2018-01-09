# Arango-spacetime
A service to handle input from the Cellibrium project and insert to Arango DB

The Cellibrium project: https://github.com/markburgess/Cellibrium

# How to
Clone / download this repo. Then run `npm install` to install all dependencies.

To use the script you'll first need to edit the `rest-api.js` file to reflect your connection settings.
The vars to change is these:
```
const host = 'localhost';
const port = '8529';
const database = '_system';
const username = 'root';
const password = 'somepassword';
```

Then to run the application run the command: `npm start` and the service will listen at port `8089`

# Application routes
## Get `/`
`file: server.js`

Returnes the menu of possibel associations between the concepts

##  POST `/`
`file: input.js`

Takes a JSON object as input containing the collection name and the input line to transform and insert to the database. It should be structured like this:

```
{
	"collectionName" : "name of collection",
	"input" : "(a_hasrole, Miss Scarlet refuses to marry Professory plum,why,cluedo)"
}
```
Where « collectionName» is the collection name to insert to, and 
«Input» is the input data that we want to process.

- The first part of the input is what type of association are used, the possible inputs are inside the file «associations.js». These can also be retrieved by doing a «GET» to the application root.
- The second is the from concept.
- The third is the to concept
- And the last is a context note.

NB! There should only be one input line per request to the service.

## GET `/h`
`file: server.js`

Returns a hint of how the input should be formated

## POST `/make-graph`
`file: server.js`

Takes a collection name as input. The graph is made with this name and from the coresponding collections containg the given name. The input should be as follows:

```
{
    "collectionName" : "name of collection"
}
```

## POST `/s`
`file: search.js`

Search route. Used to retrive stories from the graph in Arango given som parameters.
The input should be formatted as a JSON object as follows:

```
{
	"collectionName": "name of collection",
	"graph": "graph name"
	"subject" : "Scarlet",
	"type": "4",
	"depth": "2",
}
```
Where the input are as follows:
- `collectionName` the name of the collection where our concepts are stored. This is the same as used when doing inserts.
- `subject` what we are searching / looking for in our graph.
- `graph` the name of the graph we want to traverse for concepts.
- `type` the type of assoiciation we are looking at. This is what's referd to as `STtypes`.
- `depth` how deep in the graph we want to go / travers to get results.

# Files
- `associations.js` the file containg the assoiciation types, and menus for possible insert types.
- `insert.js` the file handling all inserts, mapping the insert data to the spacetime model, then inserting everything to the DB.
- `rest.api.js` the file handling all communication between Arango and our application. Implementing the arangojs package for handling inserts, and querries to the DB.
- `search.js` handling search inputs and checking values befor passing them to the `rest-api.js`for mapping the search params to an AQL query.
- `server.js` the server file for the service, the entry point for our application.

# TODO / in progress
- Add basic traversal queries for the transformation
    - fix depth option
