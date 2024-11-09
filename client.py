import requests
from pydub import AudioSegment
import os

# Thiết lập các thông số
API_URL = "https://api-inference.huggingface.co/models/openai/whisper-large-v3"
headers = {"Authorization": "Bearer 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"}  # Thay YOUR_HUGGINGFACE_API_TOKEN bằng token thực tế
filename = "obamaSpeech.mp3"

def query(filename):
    with open(filename, "rb") as f:
        data = f.read()
    response = requests.post(API_URL, headers=headers, data=data)
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Request failed with status code {response.status_code}: {response.text}")

def save_text(output, filename):
    with open(f"Text_for_{filename}.txt", "w", encoding="utf-8") as f:
        f.write(output.get("text", ""))

def split_audio_by_words(audio_path, transcription):
    audio = AudioSegment.from_file(audio_path)
    words = transcription.get("words", [])

    if not words:
        print("Không có thông tin từ trong phản hồi.")
        return

    output_dir = "split_words"
    os.makedirs(output_dir, exist_ok=True)

    for idx, word_info in enumerate(words):
        word = word_info.get("word", "").strip()
        start_time = word_info.get("start", 0) * 1000  # chuyển đổi sang milliseconds
        end_time = word_info.get("end", 0) * 1000

        word_audio = audio[start_time:end_time]
        word_filename = os.path.join(output_dir, f"word_{idx+1}_{word}.mp3")
        word_audio.export(word_filename, format="mp3")
        print(f"Đã lưu: {word_filename}")

        # Gửi đoạn âm thanh của từ này nếu cần
        # response = query(word_filename)
        # print(response.get("text", ""))

def main():
    output = query(filename)
    save_text(output, filename)

    # Chia nhỏ âm thanh theo từ
    split_audio_by_words(filename, output)

if __name__ == "__main__":
    main()