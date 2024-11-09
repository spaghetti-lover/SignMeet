import sounddevice as sd
import asyncio
import aiohttp
import io
from scipy.io.wavfile import write
import numpy as np
import queue

# Thông số âm thanh
FREQ = 44100
DURATION = 5  # mỗi đoạn ghi âm, tính bằng giây
CHANNELS = 1  # Số kênh (mono)

# Cấu hình API
API_URL = "https://api-inference.huggingface.co/models/openai/whisper-large-v3"
API_TOKEN = "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"  # Đặt trực tiếp API Token tại đây
HEADERS = {"Authorization": f"Bearer {API_TOKEN}"}

# Hàng đợi an toàn cho luồng để giao tiếp giữa callback và task async
audio_queue = queue.Queue()

def audio_callback(indata, frames, time, status):
    if status:
        print(f"Status: {status}")
    audio_queue.put(indata.copy())

async def query(session, data):
    async with session.post(API_URL, headers=HEADERS, data=data) as response:
        if response.status == 200:
            result = await response.json()
            return result
        else:
            text = await response.text()
            print(f"Error {response.status}: {text}")
            return {"text": ""}

async def process_audio(session, chunk):
    buf = io.BytesIO()
    write(buf, FREQ, chunk)
    buf.seek(0)
    data = buf.read()
    result = await query(session, data)
    transcription = result.get('text', '')
    if transcription:
        print(transcription, end=' ', flush=True)

async def consumer():
    loop = asyncio.get_event_loop()
    buffer = []
    total_frames = 0
    target_frames = FREQ * DURATION

    async with aiohttp.ClientSession() as session:
        while True:
            try:
                indata = await loop.run_in_executor(None, audio_queue.get)
                buffer.append(indata)
                total_frames += len(indata)

                if total_frames >= target_frames:
                    audio_data = np.concatenate(buffer, axis=0)
                    chunk = audio_data[:target_frames]
                    remaining = audio_data[target_frames:]

                    if len(remaining) > 0:
                        buffer = [remaining]
                        total_frames = len(remaining)
                    else:
                        buffer = []
                        total_frames = 0

                    # Tạo task để xử lý đoạn âm thanh
                    asyncio.create_task(process_audio(session, chunk))

            except Exception as e:
                print(f"Error in consumer: {e}")

async def main():
    consumer_task = asyncio.create_task(consumer())

    with sd.InputStream(samplerate=FREQ, channels=CHANNELS, callback=audio_callback, blocksize=1024):
        print("Bắt đầu ghi âm liên tục và xử lý...")
        try:
            await asyncio.Event().wait()
        except asyncio.CancelledError:
            pass

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\nĐã dừng ghi âm.")
