DROP DATABASE IF EXISTS laborGate;
CREATE DATABASE laborGate;

--\c laborGate;--

CREATE TABLE users ( 
	ID SERIAL PRIMARY KEY,
	name VARCHAR,
	email VARCHAR,
	password VARCHAR,
	type VARCHAR
);

CREATE TABLE tasks (
	ID SERIAL PRIMARY KEY,
	name VARCHAR,
	description VARCHAR,
	urgency VARCHAR,
	duedate DATE,
	complete BOOLEAN,
	overdue BOOLEAN,
	assignedtoID INT
);

CREATE TABLE groups (
	ID SERIAL PRIMARY KEY,
	name VARCHAR,
	type VARCHAR,
	groupdMember_id INT
);

CREATE TABLE userTasks ( 
	task_id INT,
	user_id INT
);

CREATE TABLE userTasks ( 
	user_id INT,
	task_id INT
);

CREATE TABLE userTasks ( 
	user_id INT,
	task_id INT
);