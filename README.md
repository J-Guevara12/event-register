# Event-register

Event register full stack app built in docker containers with docker compose

## Stack
* Proxy: Nginx works as a reversed proxy hiding all the ports related with the database
* Frontend: Built in NextJS and MUI as the component's library.
* Backend: REST API in flask that handles the relationship between the client and the Database.
* Database: PostgreSQL is the relational database management system used for this application.
* HTTP Sever: The backend is built over a HTTP server implemented in python's Gunicorn library.

## Instalation

### Prerequisites
To reproduce this program in your local machine you will need:
* Docker
* Docker compose

### Clone this repository
```bash
git clone https://github.com/J-Guevara12/event-register.git
cd event-register
```
### Set up environment variables
Create a `.env` file with the following variables:

```
POSTGRES_PW=/REPLACE/
JWT_SECRET_KEY=/REPLACE/
PGADMIN_EMAIL=/REPLACE/
PGADMIN_PW=/REPLACE/
PEPPER=/REPLACE/
```
Replace all `/REPLACE/` with the values you see adequate.


Run:
```bash
source .env
```
### Compose containers
inside the main folder execute:
```bash
docker compose up
```
Make sure your docker daemon is running.


Wait until the images and containers install, then when you see the following in your terminal:
```bash
event-register-frontend-1  | 
event-register-frontend-1  | > frontend@0.1.0 start
event-register-frontend-1  | > next start
event-register-frontend-1  | 
event-register-frontend-1  | 
event-register-frontend-1  | - ready started server on 0.0.0.0:3000, url: http://localhost:3000
```
Go to [localhost:80](http://localhost:80 "localhost:80") and you should see the login page.

## Usage
As your database will be empty, you must create an account and log in, then you will be able to Create, Read, Edit and Delete your events that will be ordered in your form page from the most recent one to the oldest one.


If you want to use PgAdmin, go to [localhost:5050](http://localhost:5050 "localhost:5050") and log in with the email and password specified in yout `.env` file, then add server and in connection configure it as:
```
host: event-register-db-1
userName: Postgres
password: //The one configured in .env
```
