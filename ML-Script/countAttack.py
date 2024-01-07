import pandas as pd

# Replace with your CSV file path
file_path = 'C:\\Users\\hp\\Desktop\\ML-Script\\ML-Script\\predictionsTest2.csv'

# Read the CSV file
df = pd.read_csv(file_path)

# Check if 'predicted_label' column exists
if 'Predicted_Label' in df.columns:
    # Count the occurrences of each value in the 'predicted_label' column
    label_counts = df['Predicted_Label'].value_counts()

    # Check if the majority of the values are 'Attack'
    if label_counts.get('Attack', 0) > len(df) / 2:
        print('Attack')
    else:
        print('No Attack')
else:
    print('The column "Predicted_Label" does not exist in the CSV file.')
