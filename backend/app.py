import datetime

from flask import Flask
from flask import request
from flask import jsonify

from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

from controlers.userManager import UserManager
from models.user import User, userFromSerial
from models.event import Event, eventFromSerial

from werkzeug.middleware.proxy_fix import ProxyFix


app = Flask(__name__)

app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1)

userManager = UserManager(app)

@app.route("/api/login", methods=["POST"])
def login():
    email = request.json.get("email")
    password = request.json.get("password")
    return userManager.login(email,password)

@app.route("/api/event",methods=["GET","POST","PUT","DELETE"])
@jwt_required()
def taskList():
    user = userFromSerial(get_jwt_identity())
    if(user.verifyEmail()):
        if request.method=="DELETE":
            eventId = request.json.get('id')
            return user.deleteEvent(eventId)
        if request.method=="GET":
            return jsonify(events=user.getEvents())
        event = eventFromSerial(request.json.get('event'))
        if request.method=="POST":
            return user.addEvent(event)
        if request.method=="PUT":
            return user.editEvent(event)
    else:
        return jsonify("User not found"),401

@app.route("/api/signup",methods=["POST"])
def signup():
    name = request.json.get("name")
    email = request.json.get("email")
    password = request.json.get("password")
    return userManager.createUser(name,email,password)

if __name__ == '__main__':
    app.run(debug=True,port=8000)
