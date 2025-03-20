# Salon Software System

## Overview
This project is a full-stack application for salon client management, designed to help stylists track client information, service history, and preferences.

## Features
- Client profile management (create, read, update)
- Service history tracking
- Client preferences and notes
- Interactive search and filtering

## Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Flask API
- **Database**: SQLite

## Setup Instructions

### Backend Setup
1. Install required packages:
   ```
   pip install flask flask-sqlalchemy flask-cors
   ```

2. Initialize the database:
   ```
   python setup_db.py
   ```

3. Start the Flask server:
   ```
   python app.py
   ```
   The server will run on http://localhost:5555

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```
   The application will open at http://localhost:3000

## API Documentation

### Client Endpoints

#### GET /clients
Returns a list of all clients.

Response:
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "contact_details": "john.doe@example.com",
    "birthday": "1990-01-01",
    "hair_skin_type": "Oily",
    "allergies": "None",
    "preferred_stylist": "Jane Smith",
    "discovery_source": "Google",
    "photo_url": "https://example.com/photo.jpg"
  }
]
```

#### GET /clients/:id
Returns details for a specific client.

Response:
```json
{
  "id": 1,
  "name": "John Doe",
  "contact_details": "john.doe@example.com",
  "birthday": "1990-01-01",
  "hair_skin_type": "Oily",
  "allergies": "None",
  "preferred_stylist": "Jane Smith",
  "discovery_source": "Google",
  "photo_url": "https://example.com/photo.jpg"
}
```

#### POST /clients
Creates a new client.

Request:
```json
{
  "name": "Jane Smith",
  "contact_details": "jane.smith@example.com",
  "birthday": "1992-05-15",
  "hair_skin_type": "Dry",
  "allergies": "Fragrance",
  "preferred_stylist": "Bob Johnson",
  "discovery_source": "Friend Referral",
  "photo_url": "https://example.com/jane.jpg"
}
```

Response:
```json
{
  "message": "Client created successfully",
  "id": 2
}
```

#### PUT /clients/:id
Updates an existing client.

Request:
```json
{
  "name": "Jane Smith-Jones",
  "contact_details": "jane.smith@updated.com"
}
```

Response:
```json
{
  "message": "Client updated successfully"
}
```

### Service Endpoints

#### GET /services/:clientId
Returns service history for a specific client.

Response:
```json
[
  {
    "id": 1,
    "date_time": "2025-03-25 10:00 AM",
    "service_type": "Haircut",
    "stylist": "Jane Smith",
    "products_used": "Shampoo X, Conditioner Y",
    "cost": 50.0,
    "satisfaction_rating": 5
  }
]
```

#### POST /services/:clientId
Adds a new service record for a client.

Request:
```json
{
  "date_time": "2025-03-30 2:00 PM",
  "service_type": "Color",
  "stylist": "Bob Johnson",
  "products_used": "Color Brand Z",
  "cost": 120.0,
  "satisfaction_rating": 4
}
```

Response:
```json
{
  "message": "Service added successfully",
  "id": 2
}
```

### Preference Endpoints

#### GET /preferences/:clientId
Returns preferences for a specific client.

#### POST /preferences/:clientId
Creates preferences for a client.

#### PUT /preferences/:clientId
Updates existing preferences for a client.

## Database Schema

### Client Table
- id (PK)
- name
- contact_details
- birthday
- hair_skin_type
- allergies
- preferred_stylist
- discovery_source
- photo_url

### Service Table
- id (PK)
- client_id (FK)
- date_time
- service_type
- stylist
- products_used
- cost
- satisfaction_rating

### ClientPreference Table
- id (PK)
- client_id (FK)
- preferred_days
- preferred_times
- communication_preference
- favorite_products
- style_preferences
- stylist_notes

## Future Improvements
1. Add authentication and authorization
2. Implement appointment scheduling
3. Add image upload functionality for before/after photos
4. Create reports and analytics for salon performance
5. Implement push notifications for appointment reminders
6. Add AI-powered product recommendations based on client history

## challenges faced 
1. Time Constraints: The 8-hour time limit was challenging, especially given the scope of the project. I had to prioritize core features over additional enhancements. 
2. Backend Integration:
Integrating the frontend with the Flask backend required careful handling of API requests and responses, which took more time than anticipated.