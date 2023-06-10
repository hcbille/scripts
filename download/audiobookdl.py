import subprocess
import yaml

# Function to execute the console command
def execute_command(command):
    subprocess.call(command, shell=True)

# Read the YAML file
with open('config.yaml', 'r') as file:
    config = yaml.safe_load(file)

# Extract values from the YAML file
username = config['username']
password = config['password']

# Read the rows from the text file
with open('textfile.txt', 'r') as file:
    rows = file.readlines()
    total_rows = len(rows)

# Iterate through the rows
for index, row in enumerate(rows, start=1):
    # Remove newline characters from the row
    row = row.strip()

    # Replace the placeholders with the row, username, and password in the console command
    command = f"audiobook-dl --username {username} --password {password} {row}"

    # Execute the command
    execute_command(command)

    # Output progress
    print(f"Processed row {index}/{total_rows}")

    # If you want to remove the row from the text file after processing it, you can uncomment the following lines:
    # rows.remove(row)
    # with open('textfile.txt', 'w') as file:
    #     file.writelines(rows)
