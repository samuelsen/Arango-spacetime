const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const REST = require('./rest-api');
const associations = require('./associations');

const request = require('request');

const serverPort = process.env.HTTP_PORT || 8089;

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('{"menu" : "The possible association types that can be used for the association between concepts."}' + JSON.stringify(associations.menu));
});

app.get('/h', (req, res) => {
  res.send('{"insert" : insert information should be in this form "(type of association, from concept , to concept, context-note)"');
});

//handle inserts
require('./insert.js')(app);

app.post('/make-graph', (req, res) => {
  console.log(req.body);

  if(!req.body.collectionName){
    res.send("error: need to contain a name that can be used for the graph");
  }else{
    REST.makeGraph(req.body.collectionName)
    .then(res.send(req.body.collectionName))
    .catch(e => {res.send(e)});
  }
});

require('./search.js')(app);

app.listen(serverPort, () => {
    console.log('Datagraft-RDF-to-Arago-DB started on http://localhost:' + serverPort + '/');
});