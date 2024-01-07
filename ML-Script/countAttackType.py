import pandas as pd

# Replace with your CSV file path
file_path = 'C:\\Users\\hp\\Desktop\\ML-Script\\ML-Script\\predictionsTest8.csv'

# Read the CSV file
df = pd.read_csv(file_path)

# Check if 'Predicted_Label' column exists
if 'Predicted_Label' in df.columns:
    # Count the occurrences of each value in the 'Predicted_Label' column
    label_counts = df['Predicted_Label'].value_counts()

    # Get the most frequent value
    most_frequent_label = label_counts.idxmax()

    print(most_frequent_label)
else:
    print('The column "Predicted_Label" does not exist in the CSV file.')
