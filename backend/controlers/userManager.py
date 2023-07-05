import hashlib
import os

from flask import jsonify

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import JWTManager

from controlers.database import session
from models.user import User
from models.event import Event

class UserManager():
    def __init__(self, app):
        app.config["JWT_SECRET_KEY"] = os.environ["JWT_SECRET_KEY"]
        jwt = JWTManager(app)

    def login(self,email,password):
        passwordHash = hashlib.sha256(password.encode()).hexdigest()
        query =session.query(User).filter(User.hash == passwordHash).all()
        if(query):
            for user in query:
                if(user.email==email):
                    access_token = create_access_token(identity=user.serialize())
                    return jsonify(access_token=access_token,username=user.name)
        return jsonify({"msg": "Wrong email or password"}), 401

    def createUser(self,name,email,password):
        query = session.query(User).filter(email==User.email).all()
        if(query):
            return jsonify({"msg": "Email already registered"}), 410

        passwordHash = hashlib.sha256(password.encode()).hexdigest()

        newUser = User(name,email,passwordHash)

        session.add(newUser)
        session.commit()
        return jsonify({"msg": "created Successfully"}),201
