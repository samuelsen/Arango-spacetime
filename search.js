const express = require('express');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const request = require('request');
const REST = require('./rest-api.js');
const associations = require('./associations');

function error (res, message) {
    res.send(`"{'error' : "${message}"}"`);
}

module.exports = (app) => {    
    app.use(jsonParser);
    app.post('/s', (req, res) => {
        console.log('search');
        console.log(req.body);

        
        const subject = req.body.subject ? req.body.subject : error(res, "Missing subject");
        //var context = req.body.context ? req.body.context : error(res, '"wrong context given. The input should be a number from 1 - 24 from the following" , "menu" :' + JSON.stringify(associations.menu));
        var type    = req.body.type ? req.body.type : null;
        const depth   = req.body.depth ? req.body.depth : isNaN(req.body.depth) ? error(res, "The search depth should be specified with a number") : undefined;
        const graph   = req.body.graph ? req.body.graph : error(res, "Missing name of graph to search");
        const collectionName   = req.body.collectionName ? req.body.collectionName : error(res, "Missing name of collection to search");
        
        /*if(isNaN(context)){
            error(res, '"wrong context given. The input should be a number from 1 - 24 from the following" , "menu" :' + JSON.stringify(associations.menu));
        }else*/
        
        if(depth !== undefined && isNaN(depth)){
            error(res, "The search depth should be specified with a number");
        }else{
           
            /*context = associations.menu[context];
            console.log(context);
                
            if(type == null || isNaN(type)){
                type = associations.association[context][0];
            }
        
            console.log(type);
            */

            const context = "";
            REST.search(collectionName, graph, subject, context, type, depth)
            .then(results => res.send(results))
            .catch(e => {console.log(e); res.send(e)});
        }
    });
};