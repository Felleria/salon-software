from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

# Initialize the Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///salon.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)

# Initialize the database
db = SQLAlchemy(app)

# Define models
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

# Routes
@app.route('/')
def home():
    return "✅ Salon Management API is running! Use proper endpoints like /clients"

# Client Routes
@app.route('/clients', methods=['GET'])
def get_all_clients():
    try:
        clients = Client.query.all()
        result = []
        for client in clients:
            client_data = {
                'id': client.id,
                'name': client.name,
                'contact_details': client.contact_details,
                'birthday': client.birthday,
                'hair_skin_type': client.hair_skin_type,
                'allergies': client.allergies,
                'preferred_stylist': client.preferred_stylist,
                'discovery_source': client.discovery_source,
                'photo_url': client.photo_url
            }
            result.append(client_data)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/clients/<int:client_id>', methods=['GET'])
def get_client(client_id):
    try:
        client = Client.query.get_or_404(client_id)
        client_data = {
            'id': client.id,
            'name': client.name,
            'contact_details': client.contact_details,
            'birthday': client.birthday,
            'hair_skin_type': client.hair_skin_type,
            'allergies': client.allergies,
            'preferred_stylist': client.preferred_stylist,
            'discovery_source': client.discovery_source,
            'photo_url': client.photo_url
        }
        return jsonify(client_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/clients', methods=['POST'])
def create_client():
    try:
        data = request.json
        # Validation for required fields
        if not data.get('name'):
            return jsonify({"error": "Name is required"}), 400
        if not data.get('contact_details'):
            return jsonify({"error": "Contact details are required"}), 400
            
        new_client = Client(
            name=data['name'],
            contact_details=data['contact_details'],
            birthday=data.get('birthday'),
            hair_skin_type=data.get('hair_skin_type'),
            allergies=data.get('allergies'),
            preferred_stylist=data.get('preferred_stylist'),
            discovery_source=data.get('discovery_source'),
            photo_url=data.get('photo_url')
        )
        db.session.add(new_client)
        db.session.commit()
        return jsonify({"message": "Client created successfully", "id": new_client.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/clients/<int:client_id>', methods=['PUT'])
def update_client(client_id):
    try:
        client = Client.query.get_or_404(client_id)
        data = request.json
        
        client.name = data.get('name', client.name)
        client.contact_details = data.get('contact_details', client.contact_details)
        client.birthday = data.get('birthday', client.birthday)
        client.hair_skin_type = data.get('hair_skin_type', client.hair_skin_type)
        client.allergies = data.get('allergies', client.allergies)
        client.preferred_stylist = data.get('preferred_stylist', client.preferred_stylist)
        client.discovery_source = data.get('discovery_source', client.discovery_source)
        client.photo_url = data.get('photo_url', client.photo_url)
        
        db.session.commit()
        return jsonify({"message": "Client updated successfully"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Service Routes
@app.route('/services/<int:client_id>', methods=['GET'])
def get_client_services(client_id):
    try:
        # Check if client exists
        client = Client.query.get_or_404(client_id)
        
        # Get query parameters for filtering
        service_type = request.args.get('service_type')
        stylist = request.args.get('stylist')
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')
        
        # Start with all services for this client
        query = Service.query.filter_by(client_id=client_id)
        
        # Apply filters if present
        if service_type:
            query = query.filter(Service.service_type == service_type)
        if stylist:
            query = query.filter(Service.stylist == stylist)
        if start_date:
            query = query.filter(Service.date_time >= start_date)
        if end_date:
            query = query.filter(Service.date_time <= end_date)
            
        # Execute query and format results
        services = query.all()
        result = []
        for service in services:
            service_data = {
                'id': service.id,
                'client_id': service.client_id,
                'date_time': service.date_time,
                'service_type': service.service_type,
                'stylist': service.stylist,
                'products_used': service.products_used,
                'cost': service.cost,
                'satisfaction_rating': service.satisfaction_rating
            }
            result.append(service_data)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/services/<int:client_id>', methods=['POST'])
def add_service(client_id):
    try:
        # Check if client exists
        client = Client.query.get_or_404(client_id)
        
        data = request.json
        # Validation for required fields
        if not data.get('date_time'):
            return jsonify({"error": "Date and time are required"}), 400
        if not data.get('service_type'):
            return jsonify({"error": "Service type is required"}), 400
        if not data.get('stylist'):
            return jsonify({"error": "Stylist is required"}), 400
        if not data.get('cost'):
            return jsonify({"error": "Cost is required"}), 400
            
        new_service = Service(
            client_id=client_id,
            date_time=data['date_time'],
            service_type=data['service_type'],
            stylist=data['stylist'],
            products_used=data.get('products_used'),
            cost=float(data['cost']),
            satisfaction_rating=data.get('satisfaction_rating')
        )
        db.session.add(new_service)
        db.session.commit()
        return jsonify({"message": "Service added successfully", "id": new_service.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Preference Routes
@app.route('/preferences/<int:client_id>', methods=['GET'])
def get_client_preferences(client_id):
    try:
        # Check if client exists
        client = Client.query.get_or_404(client_id)
        
        preference = ClientPreference.query.filter_by(client_id=client_id).first()
        if not preference:
            return jsonify({"message": "No preferences found for this client"}), 404
        
        preference_data = {
            'id': preference.id,
            'client_id': preference.client_id,
            'preferred_days': preference.preferred_days,
            'preferred_times': preference.preferred_times,
            'communication_preference': preference.communication_preference,
            'favorite_products': preference.favorite_products,
            'style_preferences': preference.style_preferences,
            'stylist_notes': preference.stylist_notes
        }
        return jsonify(preference_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/preferences/<int:client_id>', methods=['POST'])
def create_client_preferences(client_id):
    try:
        # Check if client exists
        client = Client.query.get_or_404(client_id)
        
        # Check if preferences already exist
        existing = ClientPreference.query.filter_by(client_id=client_id).first()
        if existing:
            return jsonify({"message": "Preferences already exist for this client"}), 400
        
        data = request.json
        new_preference = ClientPreference(
            client_id=client_id,
            preferred_days=data.get('preferred_days'),
            preferred_times=data.get('preferred_times'),
            communication_preference=data.get('communication_preference'),
            favorite_products=data.get('favorite_products'),
            style_preferences=data.get('style_preferences'),
            stylist_notes=data.get('stylist_notes')
        )
        db.session.add(new_preference)
        db.session.commit()
        return jsonify({"message": "Client preferences created successfully", "id": new_preference.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/preferences/<int:client_id>', methods=['PUT'])
def update_client_preferences(client_id):
    try:
        # Check if client exists
        client = Client.query.get_or_404(client_id)
        
        preference = ClientPreference.query.filter_by(client_id=client_id).first()
        if not preference:
            return jsonify({"message": "No preferences found for this client"}), 404
        
        data = request.json
        preference.preferred_days = data.get('preferred_days', preference.preferred_days)
        preference.preferred_times = data.get('preferred_times', preference.preferred_times)
        preference.communication_preference = data.get('communication_preference', preference.communication_preference)
        preference.favorite_products = data.get('favorite_products', preference.favorite_products)
        preference.style_preferences = data.get('style_preferences', preference.style_preferences)
        preference.stylist_notes = data.get('stylist_notes', preference.stylist_notes)
        
        db.session.commit()
        return jsonify({"message": "Client preferences updated successfully"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Additional utility endpoints
@app.route('/stylists', methods=['GET'])
def get_stylists():
    try:
        # Get unique stylists from the service table
        stylists = db.session.query(Service.stylist).distinct().all()
        stylist_list = [s[0] for s in stylists]
        return jsonify(stylist_list)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/service-types', methods=['GET'])
def get_service_types():
    try:
        # Get unique service types from the service table
        service_types = db.session.query(Service.service_type).distinct().all()
        type_list = [s[0] for s in service_types]
        return jsonify(type_list)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Resource not found"}), 404

@app.errorhandler(400)
def bad_request(error):
    return jsonify({"error": "Bad request"}), 400

@app.errorhandler(500)
def server_error(error):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    app.run(port=5555, debug=True)