#!/bin/bash

# Check if Python is installed
if ! command -v python &> /dev/null; then
    echo "Python not found. Installing Python..."
    sudo apt-get update
    sudo apt-get install -y python
fi

# Check if pip is installed
if ! command -v pip &> /dev/null; then
    echo "pip not found. Installing pip..."
    sudo apt-get update
    sudo apt-get install -y python-pip
fi

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "ffmpeg not found. Installing ffmpeg..."
    sudo apt-get update
    sudo apt-get install -y ffmpeg
fi

# Install PyYAML
pip install pyyaml

# Install audiobook-dl
pip install audiobook-dl
