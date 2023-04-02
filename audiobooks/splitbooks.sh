#!/bin/bash
for file in *.mp3; do
	filename="${file%.*}"
	mkdir -p "/audiobook/$filename"
	ffmpeg -i "$file" -f segment -segment_time 3600 -c copy "/audiobook/$filename/$filename-%03d.mp3"
	mkdir -p archive/
	mv "$file" archive/
done
