from sqlalchemy import Column, Text, Integer

from controlers import database

class User(database.Base):
    __tablename__ = "USERS"
    __table_args__ = {'extend_existing': True}

    id = Column("ID",Integer,primary_key=True)
    name = Column("NAME",Text, nullable=False)
    email = Column("EMAIL",Text, nullable=False)
    hash = Column("HASH", nullable=False)
