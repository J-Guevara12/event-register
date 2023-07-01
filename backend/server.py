import os
from flask import Flask
import psycopg2

conn = psycopg2.connect(
    database="APP_DB",
    user="postgres",
    password=os.environ["POSTGRES_PW"], 
    host = "event-register-db-1", 
    port="5432")

cur = conn.cursor()

#cur.execute("CREATE TABLE EVENTS ()")

conn.commit()

cur.close()
conn.close()

server = Flask(__name__)

@server.route("/")
def hello_world():
    return "<p>Hello, world</p>"


if __name__ == '__main__':
    server.run()
