from sqlalchemy import Column, Text, Integer, TIMESTAMP

from controlers import database

class Event(database.Base):
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
        return {
            "id": self.id,
            "userID": self.userID,
            "date": self.date,
            "name": self.name,
            "place": self.place,
            "modality": self.modality,
        }
