import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine(
    f"postgresql+psycopg2://postgres:{os.environ['POSTGRES_PW']}@event-register-db-1:5432/APP_DB"
)

Session = sessionmaker(bind=engine)

# Session that handles the databse connection
session = Session()

Base = declarative_base()
