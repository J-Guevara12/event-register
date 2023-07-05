from sqlalchemy import Column, Text, Integer, TIMESTAMP

from controlers import database

class Event(database.Base):
    """
    Event Object mapped with the EVENTS table in the database
    """
    __tablename__ = "EVENTS"
    __table_args__ = {'extend_existing': True}

    id = Column("ID",Integer,primary_key=True)
    userID = Column("USER_ID",Integer,nullable=False)
    date = Column("DATE",TIMESTAMP,nullable=False)
    name = Column("NAME",Text, nullable=False)
    place = Column("PLACE",Text,nullable=False)
    modality = Column("MODALITY",Text,nullable=False)

    def __init__(self,userId,date,name,place,modality):
        self.userID = userId
        self.date = date
        self.name = name
        self.place = place
        self.modality = modality

    def serialize(self):
        """
        Instance method:
        Returns a serializable Event object that can be sent trough an API 

        Output:
            Dictionary containing all information contained by an Event Object
        """
        return {
            "id": self.id,
            "userID": self.userID,
            "date": self.date,
            "name": self.name,
            "place": self.place,
            "modality": self.modality,
        }

def eventFromSerial(serialData):
    """
    Function:
    Converts an incoming JSON into a Event object

    Input:
        - serialData: Dictionary or JSON object with the atributtes of an Event

    Output;
        - Event object containing the information provided by serialData
    """
    event = Event(
        0,
        serialData["date"],
        serialData["name"],
        serialData["place"],
        serialData["modality"])

    if(serialData["id"]):
        event.id = serialData["id"]
    return event
