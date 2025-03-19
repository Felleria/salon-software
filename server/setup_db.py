from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

# Create a new Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///salon.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

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
    preferences = db.relationship('ClientPreference', backref='client', lazy=True, uselist=False)

class Service(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=False)
    date_time = db.Column(db.String(50), nullable=False)
    service_type = db.Column(db.String(100), nullable=False)
    stylist = db.Column(db.String(100), nullable=False)
    products_used = db.Column(db.String(255))
    cost = db.Column(db.Float, nullable=False)
    satisfaction_rating = db.Column(db.Integer)

class ClientPreference(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=False)
    preferred_days = db.Column(db.String(200))
    preferred_times = db.Column(db.String(200))
    communication_preference = db.Column(db.String(50))
    favorite_products = db.Column(db.String(255))
    style_preferences = db.Column(db.String(255))
    stylist_notes = db.Column(db.Text)

# Create the database and add sample data
with app.app_context():
    # Create tables
    db.create_all()
    print("Database tables created successfully!")
    
    # Add sample clients
    clients = [
        Client(
            name="John Doe",
            contact_details="john.doe@example.com",
            birthday="1990-01-01",
            hair_skin_type="Oily, Fine",
            allergies="None",
            preferred_stylist="Jane Smith",
            discovery_source="Google",
            photo_url="https://randomuser.me/api/portraits/men/1.jpg"
        ),
        Client(
            name="Sarah Johnson",
            contact_details="sarah.j@example.com",
            birthday="1985-05-15",
            hair_skin_type="Dry, Coarse",
            allergies="Sulfates",
            preferred_stylist="Mike Brown",
            discovery_source="Friend Referral",
            photo_url="https://randomuser.me/api/portraits/women/2.jpg"
        ),
        Client(
            name="Robert Chen",
            contact_details="robert.c@example.com",
            birthday="1992-08-23",
            hair_skin_type="Normal, Thick",
            allergies="Fragrance",
            preferred_stylist="Jane Smith",
            discovery_source="Instagram",
            photo_url="https://randomuser.me/api/portraits/men/3.jpg"
        ),
        Client(
            name="Emma Wilson",
            contact_details="emma.w@example.com",
            birthday="1988-11-30",
            hair_skin_type="Combination, Curly",
            allergies="None",
            preferred_stylist="Chris Davis",
            discovery_source="Website",
            photo_url="https://randomuser.me/api/portraits/women/4.jpg"
        ),
        Client(
            name="James Taylor",
            contact_details="james.t@example.com",
            birthday="1994-03-17",
            hair_skin_type="Sensitive, Thin",
            allergies="Parabens",
            preferred_stylist="Mike Brown",
            discovery_source="Walk-in",
            photo_url="https://randomuser.me/api/portraits/men/5.jpg"
        )
    ]
    
    for client in clients:
        db.session.add(client)
    
    db.session.commit()
    print("Sample clients added successfully!")
    
    # Create service records
    services = [
        # John Doe's services
        Service(
            client_id=1,
            date_time="2025-01-15 10:00 AM",
            service_type="Haircut",
            stylist="Jane Smith",
            products_used="Redken Shampoo, Aveda Styling Cream",
            cost=50.0,
            satisfaction_rating=5
        ),
        Service(
            client_id=1,
            date_time="2025-02-18 11:30 AM",
            service_type="Color Touch-up",
            stylist="Jane Smith",
            products_used="Wella Color Charm, Olaplex No.3",
            cost=95.0,
            satisfaction_rating=4
        ),
        
        # Sarah Johnson's services
        Service(
            client_id=2,
            date_time="2025-01-05 2:00 PM",
            service_type="Balayage",
            stylist="Mike Brown",
            products_used="Schwarzkopf BlondMe, K18 Treatment",
            cost=180.0,
            satisfaction_rating=5
        ),
        Service(
            client_id=2,
            date_time="2025-02-25 3:30 PM",
            service_type="Haircut & Blowout",
            stylist="Mike Brown",
            products_used="Pureology Hydrate, Moroccanoil",
            cost=85.0,
            satisfaction_rating=5
        ),
        
        # Robert Chen's services
        Service(
            client_id=3,
            date_time="2025-01-10 9:30 AM",
            service_type="Men's Cut",
            stylist="Jane Smith",
            products_used="American Crew Shampoo, Forming Cream",
            cost=40.0,
            satisfaction_rating=4
        ),
        Service(
            client_id=3,
            date_time="2025-03-01 10:00 AM",
            service_type="Men's Cut & Beard Trim",
            stylist="Jane Smith",
            products_used="American Crew, Beard Oil",
            cost=55.0,
            satisfaction_rating=5
        ),
        
        # Emma Wilson's services
        Service(
            client_id=4,
            date_time="2025-01-20 4:00 PM",
            service_type="Curly Cut & Style",
            stylist="Chris Davis",
            products_used="DevaCurl No-Poo, Styling Cream",
            cost=75.0,
            satisfaction_rating=5
        ),
        Service(
            client_id=4,
            date_time="2025-02-10 1:00 PM",
            service_type="Deep Conditioning Treatment",
            stylist="Chris Davis",
            products_used="Briogeo Don't Despair Repair Mask",
            cost=45.0,
            satisfaction_rating=4
        ),
        
        # James Taylor's services
        Service(
            client_id=5,
            date_time="2025-02-05 11:00 AM",
            service_type="Men's Cut & Color",
            stylist="Mike Brown",
            products_used="Redken Brews, Color Camo",
            cost=70.0,
            satisfaction_rating=3
        ),
        Service(
            client_id=5,
            date_time="2025-03-10 2:30 PM",
            service_type="Men's Cut",
            stylist="Mike Brown",
            products_used="Redken Brews Shampoo, Texture Pomade",
            cost=40.0,
            satisfaction_rating=4
        )
    ]
    
    for service in services:
        db.session.add(service)
    
    # Create client preferences
    preferences = [
        ClientPreference(
            client_id=1,
            preferred_days="Tuesday, Wednesday",
            preferred_times="Morning",
            communication_preference="Email",
            favorite_products="Redken Extreme Shampoo",
            style_preferences="Short sides, longer top",
            stylist_notes="Prefers minimal small talk"
        ),
        ClientPreference(
            client_id=2,
            preferred_days="Friday, Saturday",
            preferred_times="Afternoon",
            communication_preference="Text",
            favorite_products="Olaplex, Moroccan Oil",
            style_preferences="Natural looking balayage, shoulder length",
            stylist_notes="Loves to chat about travel"
        ),
        ClientPreference(
            client_id=3,
            preferred_days="Monday, Thursday",
            preferred_times="Early morning",
            communication_preference="Phone",
            favorite_products="American Crew Fiber",
            style_preferences="Clean fade, sharp lines",
            stylist_notes="In and out quickly - busy schedule"
        ),
        ClientPreference(
            client_id=4,
            preferred_days="Wednesday, Sunday",
            preferred_times="Late afternoon",
            communication_preference="Text",
            favorite_products="DevaCurl, Curl Smith",
            style_preferences="Curly Deva cut, no straightening",
            stylist_notes="Interested in hair care tips for curls"
        ),
        ClientPreference(
            client_id=5,
            preferred_days="Saturday",
            preferred_times="Midday",
            communication_preference="Email",
            favorite_products="Aveda Control Paste",
            style_preferences="Modern quiff, natural-looking color",
            stylist_notes="Sensitive scalp, gentle pressure when washing"
        )
    ]
    
    for preference in preferences:
        db.session.add(preference)
    
    db.session.commit()
    print("Sample services and preferences added successfully!")