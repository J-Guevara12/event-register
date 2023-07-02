import datetime
from flask import jsonify

from flask import Flask
from flask import request

from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

from controlers.database import session
from controlers.userManager import UserManager
from models.user import User
from models.event import Event


evento = Event(1,datetime.datetime.utcnow(),"Golf","Field","presencial")

#session.add(evento)
session.commit()



app = Flask(__name__)
userManager = UserManager(app)

@app.route("/api/login", methods=["POST"])
def login():
    email = request.json.get("email")
    password = request.json.get("password")
    return userManager.login(email,password)

@app.route("/api/event",methods=["GET"])
@jwt_required()
def taskList():
    events = session.query(Event).all()
    return jsonify(events[0].name)

@app.route("/api/signup",methods=["POST"])
def signup():
    name = request.json.get("name")
    email = request.json.get("email")
    password = request.json.get("password")
    return userManager.createUser(name,email,password)

if __name__ == '__main__':
    app.run(debug=True,port=8000)
