import hashlib
import secrets
import os

from flask import jsonify

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import JWTManager

from controlers.database import session
from models.user import User
from models.event import Event

class UserManager():
    """
    Class that handles all the user related operation such as sign-up and log-in
    """
    def __init__(self, app):
        """
        Class initializator:

        INPUT:
            - app: Flask application instance where the user manager will work
        """
        app.config["JWT_SECRET_KEY"] = os.environ["JWT_SECRET_KEY"]
        jwt = JWTManager(app)

    def login(self,email,password):
        """
        Instance method:
        Hashes the password and compares it against the database

        Input:
            - email: string with the email of the user
            - password: string with the email of the user

        Output:
            - HTTP response with the product of the operation and the JWT Token in case of success
        """
        query =session.query(User).filter(User.email == email).all()

        if(query):
            for user in query:
                passwordHash = hashlib.sha256(password.encode()+user.salt.encode()).hexdigest()
                if(user.hash==passwordHash):
                    access_token = create_access_token(identity=user.serialize())
                    return jsonify(access_token=access_token,username=user.name)
        return jsonify({"msg": "Wrong email or password"}), 401

    def createUser(self,name,email,password):
        """
        Instance method:
        Creates an User Instance and saves it in the database

        Input:
            - email: string with the email of the user
            - name: string with the name of the user
            - password: string with the email of the user

        Output:
            - HTTP response with the product of the operation
        """
        query = session.query(User).filter(email==User.email).all()
        if(query):
            # Checks if the email is already registered
            return jsonify({"msg": "Email already registered"}), 410

        salt = secrets.token_urlsafe(32)
        passwordHash = hashlib.sha256(password.encode()+salt.encode()).hexdigest()

        newUser = User(name,email,passwordHash)
        newUser.salt = salt

        session.add(newUser)
        session.commit()

        return jsonify({"msg": "created Successfully"}),201
