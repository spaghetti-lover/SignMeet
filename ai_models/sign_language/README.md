# Text to Sign

## Introduction

This is an implementation of text to sign language. Supported translations include:

- Vietnamese (vi) $\to$ Vietnamese Sign Language (vsl)
- English (en) $\to$ American Sign Language (asl)

## Requirements

- All required packages are specified in `requirements.txt`
- In `assets`:
  - unzip `asl-pose.zip` to `en_lexicon\asl` for en $\to$ asl
  - unzip `vsl-pose.zip` to `vi_lexicon\vsl` for vi $\to$ vsl

## How to use

- Use `to_pose()` in `utils.py` to translate from text to sign language. All needed parameters are noted inside the funtion.
