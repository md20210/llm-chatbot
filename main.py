from fastapi import FastAPI
from pydantic import BaseModel
from transformers import BlenderbotTokenizer, BlenderbotForConditionalGeneration
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

model_name = "facebook/blenderbot-3B"
tokenizer = BlenderbotTokenizer.from_pretrained(model_name)
model = BlenderbotForConditionalGeneration.from_pretrained(model_name)

chat_history = []  # Nur einmal deklarieren

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(request: ChatRequest):
    chat_history.append(request.message)
    context = " ".join(chat_history[-3:])  # Letzte 3 Nachrichten
    inputs = tokenizer(context, return_tensors="pt")
    reply_ids = model.generate(
        **inputs, 
        max_length=100, 
        num_beams=6,  # Mehr Beams für bessere Antworten
        no_repeat_ngram_size=2,  # Weniger Wiederholungen
        early_stopping=True
    )
    response = tokenizer.decode(reply_ids[0], skip_special_tokens=True)
    chat_history.append(response)
    return {"response": response}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)