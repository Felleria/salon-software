from flask import Flask, request, jsonify

# Initialize the Flask app
app = Flask(__name__)



@app.route('/')
def home():
    return "✅API is running! Use proper endpoints like /client "


if __name__ == '__main__':
    app.run(port=5555, debug=True)