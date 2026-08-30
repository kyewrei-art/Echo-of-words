from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
CORS(app)

client = OpenAI(
    api_key=os.getenv("GONKA_API_KEY"),
    base_url="https://api.gonkarouter.io/v1",
)

@app.route("/api/generate", methods=["POST"])
def generate():
    data = request.json
    icons = data.get("icons", [])

    response = client.chat.completions.create(
        model="moonshotai/Kimi-K2.6",
        messages=[
            {"role": "system", "content": "You help aphasia patients express themselves. Based only on the icon keywords given, generate one natural, short, warm sentence in English. Do not add diagnostic content the user did not express."},
            {"role": "user", "content": f"Icons selected: {', '.join(icons)}"}
        ]
    )

    sentence = response.choices[0].message.content
    return jsonify({"sentence": sentence})

if __name__ == "__main__":
    app.run(debug=True, port=5001)