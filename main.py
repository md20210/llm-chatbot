from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS vollständig konfigurieren
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Nur diese Origin erlauben
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],  # OPTIONS explizit erlauben
    allow_headers=["*"],  # Alle Header erlauben
)

# LLM von Hugging Face laden
llm_pipeline = pipeline("text-generation", model="gpt2")

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(request: ChatRequest):
    response = llm_pipeline(request.message, max_new_tokens=50, num_return_sequences=1)[0]["generated_text"]
    return {"response": response}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)