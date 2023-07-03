import datetime
import sys


from flask import Flask
from flask import request
from flask import jsonify

from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

from controlers.database import session
from controlers.userManager import UserManager
from models.user import User, userFromSerial
from models.event import Event


evento = Event(1,datetime.datetime.utcnow(),"Golf","Field","presencial")

#session.add(evento)
#session.commit()



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
    user = userFromSerial(get_jwt_identity())
    if(user.verifyEmail()):
        return jsonify(events=user.getEvents())
    else:
        return jsonify("nicen't")

@app.route("/api/signup",methods=["POST"])
def signup():
    name = request.json.get("name")
    email = request.json.get("email")
    password = request.json.get("password")
    return userManager.createUser(name,email,password)

if __name__ == '__main__':
    app.run(debug=True,port=8000)
