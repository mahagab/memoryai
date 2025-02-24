import os
import json
from flask import Flask, request, jsonify
import google.generativeai as genai
from google.oauth2 import service_account
from google.genai import types


app = Flask(__name__)

# Caminho para o key.json
KEY_JSON_PATH = os.getenv("GOOGLE_APPLICATION_CREDENTIALS", "key.json")

# Autenticação usando credenciais da conta de serviço
credentials = service_account.Credentials.from_service_account_file(KEY_JSON_PATH)

# Configurar a API Generative AI
genai.configure(credentials=credentials)

# Inicializa o modelo Gemini
model = genai.GenerativeModel(model_name="gemini-1.5-flash")
contents = [
    types.Content(
      role="user",
      parts=[
        types.Part.from_text(text="""você é um administrador de contas""")
      ]
    )
  ]
def generate_bot_response(user_input):
    """Gera uma resposta baseada na entrada do usuário."""
    try:
        if not user_input:
            return "Entrada vazia!"

        response = model.generate_content(user_input)
        return response.text
    except Exception as e:
        return f"Erro ao gerar resposta: {str(e)}"

@app.route("/chat", methods=["POST"])
def chat_endpoint():
    try:
        data = request.json
        user_input = data.get("message", "")

        if not user_input:
            return jsonify({"error": "Mensagem vazia"}), 400

        response_text = generate_bot_response(user_input)
        return jsonify({"response": response_text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
