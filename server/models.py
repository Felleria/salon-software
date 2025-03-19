from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    contact_details = db.Column(db.String(200), nullable=False)
    birthday = db.Column(db.String(50))
    hair_skin_type = db.Column(db.String(100))
    allergies = db.Column(db.String(200))
    preferred_stylist = db.Column(db.String(100))
    discovery_source = db.Column(db.String(100))
    photo_url = db.Column(db.String(255))
    
    services = db.relationship('Service', backref='client', lazy=True)

class Service(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=False)
    date_time = db.Column(db.String(50), nullable=False)
    service_type = db.Column(db.String(100), nullable=False)
    stylist = db.Column(db.String(100), nullable=False)
    products_used = db.Column(db.String(255))
    cost = db.Column(db.Float, nullable=False)
    satisfaction_rating = db.Column(db.Integer)

# from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy import MetaData
# from datetime import datetime

# metadata = MetaData()
# db = SQLAlchemy(metadata=metadata)

# # models.py
# class Client(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable=False)
#     contact_details = db.Column(db.String(100), nullable=False)
#     birthday = db.Column(db.String(50), nullable=True)
#     hair_skin_type = db.Column(db.String(50), nullable=True)
#     allergies = db.Column(db.String(200), nullable=True)
#     preferred_stylist = db.Column(db.String(50), nullable=True)
#     discovery_source = db.Column(db.String(100), nullable=True)
#     photo_url = db.Column(db.String(200), nullable=True)

#     services = db.relationship('Service', backref='client', lazy=True)

   

# class Service(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     client_id = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=False)
#     date_time = db.Column(db.String(50), nullable=False)
#     service_type = db.Column(db.String(100), nullable=False)
#     stylist = db.Column(db.String(50), nullable=False)
#     products_used = db.Column(db.String(200), nullable=True)
#     cost = db.Column(db.Float, nullable=False)
#     satisfaction_rating = db.Column(db.Integer, nullable=True)

