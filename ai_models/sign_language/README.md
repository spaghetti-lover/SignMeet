# Text to Sign

## Introduction

This is an implementation of text to sign language. Supported translations include:

- Vietnamese (vi) $\to$ Vietnamese Sign Language (vsl)
- English (en) $\to$ American Sign Language (asl)

## Requirements

- All required packages are specified in `requirements.txt`
- In `\assets`:
  - unzip `\word\asl.zip` to `\en_lexicon\asl` for en $\to$ asl
  - unzip `\word\vsl.zip` to `\vi_lexicon\vsl` for vi $\to$ vsl
- In `\ai_models\sign_language\spoken_to_signed\assets\fingerspelling_lexicon`:
  - unzip `\fingerspelling\vsl.zip` to `\vsl` for vi $\to$ vsl
- All pose zip files can be found [here](https://drive.google.com/drive/folders/1KojAfVlD1XtY3MQtC2Ef9BMMqELevC-3?usp=drive_link)

## How to use

- Use `to_pose()` in `utils.py` to translate from text to sign language. All needed parameters are noted inside the funtion.
