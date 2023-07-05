from sqlalchemy import Column, Text, Integer, desc
from flask import jsonify

from controlers.database import session, Base, engine
from .event import Event

class User(Base):
    """
    User Object mapped with the USERS table in the database
    """
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
        """
        Instance method:
        Returns a serializable Event object that can be sent trough an API 

        Output:
            Dictionary containing all information contained by an User Object
        """
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
        }

    def verifyEmail(self):
        """
        Instance method:
        Checks if the user's object email is the same as it's database counterpar

        Output:
            If the verification went successful
        """
        queryID = session.query(User.id).filter(User.email==self.email).all()[0][0]
        return queryID==self.id

    def getEvents(self):
        """
        Instance method:
        Consults all the events related with an user in the database

        Output:
            - List of serialized events
        """
        query = session.query(Event).filter(Event.userID==self.id).order_by(desc(Event.date)).all()
        return [event.serialize() for event in query]

    def addEvent(self,event):
        """
        Instance method:
        Adds a new event to the database

        Input:
            - event: Event object to be added

        Output:
            - Confirmation of the state of the operation
        """
        event.userID = self.id
        session.add(event)
        session.commit()
        return "Event created",200

    def editEvent(self,event):
        """
        Instance method:
        Edits an event in the database

        Input:
            - event: Event object to be edited

        Output:
            - Confirmation of the state of the operation
        """
        event.userID = self.id
        currentEvent = session.query(Event).filter(Event.id==event.id).one()

        if(currentEvent.userID!=self.id):
            return "User not authorized to edit this event", 401

        currentEvent.name = event.name
        currentEvent.place = event.place
        currentEvent.date = event.date
        currentEvent.modality = event.modality

        session.commit()
        return "Event edited",200

    def deleteEvent(self,eventId):
        """
        Instance method:
        Deletes an event in the database

        Input:
            - eventId: ID of the object to be deleted

        Output:
            - Confirmation of the state of the operation
        """
        event = session.query(Event).filter(Event.id==eventId).one()
        if(event.userID != self.id):
            return "User not authorized to delete this event", 401
        session.delete(event)
        session.commit()
        return f"Event {event.name} deleted", 200

def userFromSerial(serialData):
    """
    Function:
    Converts an incoming JSON into an User object

    Input:
        - serialData: Dictionary or JSON object with the atributtes of an User

    Output;
        - User object containing the information provided by serialData
    """
    user = User(serialData["name"],serialData["email"],"")
    user.id = serialData["id"]
    return user
