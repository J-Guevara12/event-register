from flask import Flask
from flask import request
from flask import jsonify

from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

from controlers.userManager import UserManager

from models.user import userFromSerial
from models.event import eventFromSerial

from werkzeug.middleware.proxy_fix import ProxyFix


app = Flask(__name__)

# Enables the app to work behind a proxy
app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1)

# Initializes the user manager to perform login and signup
userManager = UserManager(app)

@app.route("/api/login", methods=["POST"])
def login():
    """
    Login API route:

    Expects a POST request with the email and password in its body
    """
    email = request.json.get("email")
    password = request.json.get("password")
    return userManager.login(email,password)

@app.route("/api/signup",methods=["POST"])
def signup():
    """
    Signup API route:

    Expects a POST request with the email, name and password in its body
    """
    name = request.json.get("name")
    email = request.json.get("email")
    password = request.json.get("password")
    return userManager.createUser(name,email,password)

@app.route("/api/event",methods=["GET","POST","PUT","DELETE"])
@jwt_required()
def event():
    """
    Event API route:

    Performs the CRUD operations in the EVENTS table
    """
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

if __name__ == '__main__':
    app.run(debug=True,port=8000)
