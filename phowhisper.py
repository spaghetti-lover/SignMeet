import requests
import time
from pydub import AudioSegment

API_URL = "https://api-inference.huggingface.co/models/openai/whisper-large-v3"
headers = {"Authorization": "Bearer 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"}

def query(filename):
    with open(filename, "rb") as f:
        data = f.read()
    response = requests.post(API_URL, headers=headers, data=data)
    return response.json()

filename = "obamaSpeech.mp3"
output = query(filename)

transcribed_text = output.get("text", "")

audio = AudioSegment.from_file(filename)
audio_duration = audio.duration_seconds

words = transcribed_text.split()

total_words = len(words)
words_per_second = total_words / audio_duration

for word in words:
    print(word, end=' ', flush=True)
    time.sleep(1 / words_per_second)

with open(f"Text_for_{filename}.txt", "w", encoding="utf-8") as f:
    f.write(transcribed_text)