from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

@app.route('/generate', methods=['POST'])
def generate():
    data = request.get_json()
    feeling = data.get('feeling')
    tone = data.get('tone')

    # Basic response logic for testing
    if not feeling or not tone:
        return jsonify({'message': 'Invalid input'}), 400

    message = f"You are feeling {feeling}, and you'd like to express it in a {tone} tone."
    return jsonify({'message': message})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))  # Use PORT env var if set (Render requires this)
    app.run(host='0.0.0.0', port=port)
