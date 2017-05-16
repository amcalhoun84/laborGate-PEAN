const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:root@localhost:5432/laborGate';
const client = new pg.Client(connectionString);
client.connect();
const query = client.query('CREATE TABLE tasks(id SERIAL PRIMARY KEY, name VARCHAR(64) not null, description VARCHAR(256), complete BOOLEAN, overdue BOOLEAN)');
query.on('end', () => { client.end(); });


