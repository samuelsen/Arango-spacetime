const arango = require('arangojs');
const Database = arango.Database;
const aql = arango.aql;

// Using a complex connection string with authentication
const host = 'localhost';//process.env.ARANGODB_HOST;
const port = '8529'; //process.env.ARANGODB_PORT;
const database = '_system';//process.env.ARANGODB_DB;
const username = 'root'; //process.env.ARANGODB_USERNAME;
const password = 'somepassword';//process.env.ARANGODB_PASSWORD;

const db = new arango.Database({
url: `http://${username}:${password}@${host}:${port}`,
  databaseName: database
});

function checkCollectionExists(collectionName, edge = false){
  return new Promise((resolve, reject) => {
    db.collection(collectionName).get()
    .then(a => {
      resolve(true);
    })
    .catch(e => {
      console.log(e.code);
      const response = e.response.body;

      if(response.error){
        if(response.code != 404){
          reject(false);
        }
        else {
          if(edge){
            console.log("make edge collection");
            db.edgeCollection(collectionName).create()
            .then(a => resolve(true))
            .catch(e => {console.log(e); reject(false)});            
          }else{
            db.collection(collectionName).create()
            .then(a => resolve(true))
            .catch(e => {console.log(e); reject(false)});
          }
        }
      }
    });
  });
};

function insertDocument (data, collectionName){
 return new Promise((resolve, reject) => {
   db.collection(collectionName).document(data._key)
   .then(resolve())
   .catch(e => {
     db.collection(collectionName).save(data)
     .then(a => {resolve(a)})
     .catch(e => {
       console.log(e); 
       reject(e);
      });
    });
  });
}

function insertEdge (data, collectionName){
  return new Promise((resolve, reject) => {
    db.edgeCollection(collectionName).save(data)
    .then(a => {resolve(a)})
    .catch(e => {
      console.log(e); 
      reject(e);
    });
  });
}

function makeGraph (graphName){
  return new Promise((resolve, reject) => {
    db.graph(graphName).get()
    .then(function(){console.log("graph exists"); resolve()})
    .catch(e => {
      console.log("graph: " + graphName + "doesen't exist");
      //console.log(e);
      const graphObject = {
        edgeDefinitions: [{
          'collection': graphName + "_edge",
          'from': [graphName],
          'to': [graphName]
        }]
      };
      console.log(graphObject);
      db.graph(graphName).create(graphObject)
      .then(function(){console.log("new graph"); resolve()})
      .catch(e => {console.log(e); reject(e);});
    });
  });
}

function search (collectionName, graph, subject, context, type, depth){
  

  if(depth !== undefined){
    depth = "0.." + depth;
  }else{
    depth = '';
  }

const query =   'FOR u IN ' + collectionName +
                  ' FILTER u.concept LIKE "%' + subject + '%"' +
                  ' FOR v, e, p IN ' + depth + ' ANY u GRAPH "' + graph + '"'+
                    ' FILTER e.STtype LIKE ' + type +
                      ' RETURN p';
  console.log(query);

  return new Promise((resolve, reject) => {
    db.query(query).then(
      cursor => cursor.all()
    ).then(
      docs => resolve(docs),
      err => reject('Query failed:\n' + JSON.stringify(err.response.body))
    );
  });
}

module.exports = {
  checkCollectionExists   : checkCollectionExists,
  insertDocument          : insertDocument,
  insertEdge              : insertEdge,
  makeGraph               : makeGraph,
  search                  : search,
}