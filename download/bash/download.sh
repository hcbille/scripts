#!/bin/sh

# Check if the input file is provided as an argument
if [ $# -ne 1 ]; then
    echo "Usage: $0 <input_file>"
    exit 1
fi

input_file="$1"

# Check if the input file exists
if [ ! -f "$input_file" ]; then
    echo "Error: Input file not found."
    exit 1
fi

# Read each line of the file and execute "ping" for each URL
while IFS= read -r url || [ -n "$url" ]; do
    audiobook-dl $url -o ./{author}/{title}
    # Add your desired shell command here using $url as the URL
done < "$input_file"
