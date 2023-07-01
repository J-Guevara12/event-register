import os
from flask import Flask
from sqlalchemy import create_engine
import psycopg2

conn = psycopg2.connect(
    database="APP_DB",
    user="postgres",
    password=os.environ["POSTGRES_PW"], 
    host = "event-register-db-1", 
    port="5432")

cur = conn.cursor()

conn.commit()

cur.close()
conn.close()

engine = create_engine("postgresql+psycopg2://postgres:databasePassword@event-register-db-1:5432/APP_DB")

server = Flask(__name__)

@server.route("/")
def hello_world():
    return "<p>Hello, beautiful world</p>"


if __name__ == '__main__':
    server.run(debug=True,port=8000)
