# Parallelizing 1M jobs

The DB folder contains a persistent data for the DB and scripts to fill and empty the DB with mock data.

The api process is getting the number of documents from a collection in a db inside a mongodb server.
then its splitting the db to groups of 100 documents by creating an array with objects that contain skip and limit.
skip is growing by intervals of 100 and limit is always 100.
the process is sending messages to a rabbitmq queue called "dbRange", each msg is a string representation of those objects.

The manager process is pulling messages from "dbRange" queue, performing a mongodb query to get the document with limit and skip from the message.
each documents value is sent to another queue called "tasks".

The worker process is pulling messages from "tasks" queue and performing the tasks.

for demonstration purposes the documents value is an integer and the task is to print it.

-----------------------------------------

In order to use the project please do the following steps.

1. clone the repository.  
2. ```npm install``` in api,DB,manager and worker directories.
3. ```docker compose up``` in root directory to create a container with mongodb, mongodb manager and rabbitmq.  
4. ```npm run generate``` in DB folder to generate data(numbers from 1 to 1M) for the DB or ```npm run generate-random``` to generate randomized data.  
5. open a few terminal sessions and ```npm run start``` once from api folder and ```npm run start``` multiple times from worker and manager directories.  

