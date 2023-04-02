#!/bin/bash

# Define a function to rename files
rename_files () {
    # Loop through each file in the directory
    for file in "$1"/*; do
        # Check if the file is a regular file (not a directory, symlink, etc.)
        if [[ -f "$file" ]] && [[ $(basename "$file") =~ ^[0-9]+ ]]; then
            # Get the basename of the directory containing the file
            dirname=$(basename "$1")
            # Construct the new filename with the directory name as a prefix
            newfilename="${dirname} - $(basename "$file")"
            # Rename the file
            mv "${file}" "${1}/${newfilename}"
        elif [[ -d "$file" ]]; then
            # Recursively call the function for any subdirectories
            rename_files "$file"
        fi
    done
}

# Call the function with the top-level directory as an argument
rename_files "$1"
