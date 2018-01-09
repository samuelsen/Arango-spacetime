const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const request = require('request');
const REST = require('./rest-api.js');
const associations = require('./associations').association;

/*Hash function  - used to hash namespaces for keys*/
String.prototype.hashCode = function () {
    var hash = 0;
    if (this.length == 0) return hash;
    for (i = 0; i < this.length; i++) {
        char = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return (hash + 2147483647) + 1; 
};


module.exports = (app) => {
    app.use(jsonParser);

    var counter = 0;
    var lineCounter = 0;
    var values = {};
    var edges = [];

    app.post('/', (req, res) => {
        console.log(req.body);
        line = req.body.input;
        const collectionName  = req.body.collectionName ? req.body.collectionName : "spacetime"; //default collection name to 'spacetime' if no name is given.

        //Parse the input touple here:
        line = line.slice(1, -1).split(',');
        console.log(line);

        var valueObj = {"_key": line[1].hashCode().toString(), "concept": line[1]};
        console.log(valueObj);
        
        if(!values[line[1].hashCode().toString()]){
            values[line[1].hashCode().toString()] = valueObj;
        }
    
        var valueObj = {"_key": line[2].hashCode().toString(), "concept": line[2]};
        console.log(valueObj);
        
        if(!values[line[2].hashCode().toString()]){
            values[line[2].hashCode().toString()] = valueObj;
        }
    
        REST.checkCollectionExists(collectionName)
        .then(function(){
            for (key in values){
                console.log(values[key]);
                REST.insertDocument(values[key], collectionName)
                .catch(e => res.send(e));
            }
        })
        .catch(e => res.send(e.response.body));

        console.log(associations[line[0]]);

        var edgeObj = {"_from": collectionName + '/' + line[1].hashCode().toString(), 
                        "_to": collectionName + '/' + line[2].hashCode().toString(), 
                        "STtype": associations[line[0]][0],
                        "association": associations[line[0]][1],
                        "context": line[3]
                    };
        edges.push(edgeObj);
        
        var edgeObj = {"_from": collectionName + '/' + line[2].hashCode().toString(), 
                        "_to": collectionName + '/' + line[1].hashCode().toString(), 
                        "STtype": associations[line[0]][0],
                        "association": associations[line[0]][2],
                        "context": line[3]
                    };
        edges.push(edgeObj);
        
        REST.checkCollectionExists(collectionName+"_edge", true)
        .then(function(){
            edges.forEach(edge => 
                REST.insertEdge(edge, collectionName+'_edge')
                .catch(e => res.send(e.response.body)));
        })
        .catch(e => console.log(e));
        res.send({"values": JSON.stringify(values), "edges": JSON.stringify(edges)});
    });
};