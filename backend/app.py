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
            {
                "role": "system",
                "content": (
                    "You help aphasia patients express themselves. "
                    "Generate one natural, warm English sentence based only on "
                    "the meaning represented by the selected icons. "
                    "Include all relevant information represented by the icons, "
                    "but keep the sentence concise. "
                    "Do not add information the user did not express. "
                    "Return only the final sentence."
                )
            },
            {
                "role": "user",
                "content": f"Icons: {', '.join(icons)}"
            }
        ],
        extra_body={
            "thinking": {"type": "disabled"}
        },
        max_tokens=100,
    )

    sentence = response.choices[0].message.content
    if "</think>" in sentence:
        sentence = sentence.rsplit("</think>", 1)[-1].strip()
    return jsonify({"sentence": sentence})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port)