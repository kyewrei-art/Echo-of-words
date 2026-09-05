from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os, re
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

    if not icons:
        return jsonify({"sentence": ""}), 400

    response = client.chat.completions.create(
        model="moonshotai/Kimi-K2.6",
        messages=[
            {
                "role": "system",
                "content": (
                    "Generate ONE short, natural English sentence based on "
                    "the selected icons. The icons represent what the patient "
                    "wants to communicate. Output ONLY the final sentence. "
                    "Do not explain your reasoning. "
                    "Do not describe the icons. "
                    "Do not provide alternatives. "
                    "Keep it simple and natural."
                )
            },
            {
                "role": "user",
                "content": f"Selected icons: {', '.join(icons)}"
            }
        ],
        max_tokens=1024,
    )

    # DEBUG — these must be AFTER the API call
    print("MODEL RESPONSE:", response)
    print("MESSAGE:", response.choices[0].message)
    print("CONTENT:", repr(response.choices[0].message.content))
    print("FINISH:", response.choices[0].finish_reason)

    sentence = response.choices[0].message.content or ""

    # Remove <think>...</think> if present
    sentence = re.sub(
        r"<think>.*?(</think>|$)",
        "",
        sentence,
        flags=re.DOTALL | re.IGNORECASE
    ).strip()

    sentence = sentence.replace("**", "").strip()

    if not sentence:
        sentence = "Sorry, I couldn't form a sentence — please try again."

    return jsonify({"sentence": sentence})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port)