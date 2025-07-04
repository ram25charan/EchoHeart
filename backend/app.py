from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Initialize Flask app
app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "EchoHeart Backend Running"

@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()
    feeling = data.get("feeling")
    tone = data.get("tone")

    if not feeling or not tone:
        return jsonify({"message": "Invalid input"}), 400

    prompt = (
        f"You are an empathetic AI. A user is feeling '{feeling}' and wants a response in a '{tone}' tone.\n"
        f"Your task is to:\n"
        f"- Understand their emotion\n"
        f"- Reflect the chosen tone\n"
        f"- Comfort or uplift them\n"
        f"Respond with a short, natural paragraph (2 to 5 lines)."
    )

    try:
        model = genai.GenerativeModel('models/gemini-1.5-flash')
        response = model.generate_content(prompt)

        if response and response.text:
            return jsonify({"message": response.text.strip()})
        else:
            return jsonify({"message": "Failed to generate a response."}), 500
    except Exception as e:
        return jsonify({"message": "Server error", "error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
