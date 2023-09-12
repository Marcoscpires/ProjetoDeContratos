var knex = require('knex')({
    client: 'mysql2',
    connection: {
        host : 'localhost',      
        user : 'root',     
        password : '123123', 
        database : 'biovel_marcos' 
     }
});
module.exports = knex