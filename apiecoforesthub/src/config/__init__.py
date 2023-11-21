from sqlalchemy import create_engine
from sqlalchemy.orm.session import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
#Enviroments
user='root'
password='ecoforestsec'
host='localhost'
port='3308'
data_base='ecoforesthub'

#BD and conection

database_url=f"mysql://{user}:{password}@{host}:{port}/{data_base}"

engine = create_engine(database_url, echo=True)

Session = sessionmaker(bind=engine)

Base = declarative_base()

