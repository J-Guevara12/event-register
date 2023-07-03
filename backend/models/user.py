from sqlalchemy import Column, Text, Integer
from flask import jsonify

from controlers.database import session, Base
from .event import Event

class User(Base):
    __tablename__ = "USERS"
    __table_args__ = {'extend_existing': True}

    id = Column("ID",Integer,primary_key=True)
    name = Column("NAME",Text, nullable=False)
    email = Column("EMAIL",Text, nullable=False)
    hash = Column("HASH", nullable=False)

    def __init__(self,name,email,hash):
        self.name = name
        self.email = email
        self.hash = hash

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
        }

    def verifyEmail(self):
        queryID = session.query(User.id).filter(User.email==self.email).all()[0][0]
        return queryID==self.id

    def getEvents(self):
        query = session.query(Event).filter(Event.userID==self.id).all()
        return [event.serialize() for event in query]

def userFromSerial(serialData):
    user = User(serialData["name"],serialData["email"],"")
    user.id = serialData["id"]
    return user
