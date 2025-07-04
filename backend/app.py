from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import google.generativeai as genai

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

model = genai.GenerativeModel("models/gemini-1.5-flash")

app = Flask(__name__)
CORS(app)

@app.route("/generate", methods=["POST"])
def generate():
    data = request.json
    prompt = data.get("prompt", "")

    if not prompt:
        return jsonify({"message": "Prompt missing"}), 400

    try:
        response = model.generate_content(prompt)
        return jsonify({"message": response.text.strip()})
    except Exception as e:
        print("Error:", e)
        return jsonify({"message": "Gemini generation failed"}), 500

if __name__ == "__main__":
    app.run(debug=True)
