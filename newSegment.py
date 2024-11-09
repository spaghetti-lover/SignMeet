import sounddevice as sd
from scipy.io.wavfile import write
import asyncio
import os
import requests

API_URL = "https://api-inference.huggingface.co/models/openai/whisper-large-v3"
headers = {"Authorization": "Bearer "}

# def query(filename):
#     with open(filename, "rb") as f:
#         data = f.read()
#     response = requests.post(API_URL, headers=headers, data=data)
#     return response.json()

# output = query("sample0.mp3")
# print(output)

async def query(filename):
    