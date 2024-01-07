import pandas as pd

# Function to create a dummy column with zeros or a specified default value
def create_dummy_column(df, column_name, default_value=0.0):
    df[column_name] = default_value
    return df

# Load the CSV file
file_path = file_path = 'C:\\Users\\hp\\Desktop\\ML-Script\\output.csv'  # Replace with your file path
df = pd.read_csv(file_path)

# Columns in the target format, including the 'label' column
target_columns = [
    "flow_duration", "Header_Length", "Protocol Type", "Duration", "Rate", "Srate", "Drate", 
    "fin_flag_number", "syn_flag_number", "rst_flag_number", "psh_flag_number", "ack_flag_number", 
    "ece_flag_number", "cwr_flag_number", "ack_count", "syn_count", "fin_count", "urg_count", 
    "rst_count", "HTTP", "HTTPS", "DNS", "Telnet", "SMTP", "SSH", "IRC", "TCP", "UDP", "DHCP", 
    "ARP", "ICMP", "IPv", "LLC", "Tot sum", "Min", "Max", "AVG", "Std", "Tot size", "IAT", 
    "Number", "Magnitue", "Radius", "Covariance", "Variance", "Weight", "label"
]

# Adding missing columns as dummy columns
for col in target_columns:
    if col not in df.columns:
        # Using a different default value for the 'label' column
        default_value = "XSS" if col == "label" else 0.0
        df = create_dummy_column(df, col, default_value)

# Reorder columns to match the target format and drop any extra columns
df = df[target_columns]

# Save the transformed data to a new CSV file
output_file_path = file_path = 'C:\\Users\\hp\\Desktop\\ML-Script\\pcapTes.csv'  # Replace with your desired output file path
df.to_csv(output_file_path, index=False)
