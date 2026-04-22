from fastapi import FastAPI
import numpy as np

app = FastAPI()

@app.post("/detect")
async def detect_voice(data: dict):
    audio = np.array(data["audio"])

    # Dummy logic (replace with real model later)
    if max(audio) > 0.8:
        return {"alert": True}

    return {"alert": False}