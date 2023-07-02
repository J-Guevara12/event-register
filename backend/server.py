import datetime
import os
from flask import Flask

from controlers.database import session
from models.user import User
from models.event import Event

consulta =session.query(User).get(1)

evento = Event(1,datetime.datetime.utcnow(),"Golf","Field","presencial")

session.add(evento)
session.commit()

server = Flask(__name__)

@server.route("/api")
def hello_world():
    return f"Hello, beautiful {consulta.name},{consulta.id},{consulta.email}"


if __name__ == '__main__':
    server.run(debug=True,port=8000)
