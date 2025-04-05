import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

@pytest.mark.asyncio
async def test_chat_endpoint():
    response = client.post("/chat", json={"message": "Hallo"})
    assert response.status_code == 200
    assert "response" in response.json()
    assert isinstance(response.json()["response"], str)
    assert len(response.json()["response"]) > 0