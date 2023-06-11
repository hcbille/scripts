#!/bin/bash

# Function to add an alias
add_alias() {
    alias_name="$1"
    command="$2"

    echo "alias $alias_name='$command'" >> ~/.bash_aliases
    source ~/.bash_aliases
    echo "Alias added: $alias_name"
}

# Function to load aliases from YAML file
load_aliases() {
    yaml_file="$1"

    while IFS=":" read -r alias_name command || [ -n "$alias_name" ]; do
        if [[ $alias_name && $command ]]; then
            add_alias "$alias_name" "$command"
        fi
    done < <(yq eval '.aliases[] | "\(.alias_name):\(.command)"' "$yaml_file")
}

# Function to list all aliases
list_aliases() {
    grep -oP "alias \K[^=]+" ~/.bash_aliases
}

# Function to install yq if not already installed
install_yq() {
    if ! command -v yq &>/dev/null; then
        echo "yq not found. Installing yq..."
        sudo apt-get update
        sudo apt-get install yq -y
    fi
}

# Main script
if [ "$1" = "load" ]; then
    install_yq
    load_aliases "$2"
elif [ "$1" = "list" ]; then
    list_aliases
else
    echo "Invalid command. Usage: ./alias_script.sh [load|list] [yaml_file]"
fi
