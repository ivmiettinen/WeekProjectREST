BEGIN;

    SET client_encoding
    = 'UTF-8';

DROP DATABASE IF EXISTS topic;
CREATE DATABASE topic;


create table topic
(
    id SERIAL PRIMARY KEY,
    title varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    timetomaster INTEGER,
    timespent varchar(255) NOT NULL,
    source varchar(255) NOT NULL,
    startlearningdate varchar(255) NOT NULL,
    inprogress varchar(255) NOT NULL
);