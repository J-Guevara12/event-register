import datetime

from flask import Flask
from flask import request

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import JWTManager

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


if __name__ == '__main__':
    app.run(debug=True,port=8000)
