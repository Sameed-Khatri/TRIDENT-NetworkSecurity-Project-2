from Feature_extraction import Feature_extraction
import time
import warnings
warnings.filterwarnings('ignore')

if __name__ == '__main__':
    start = time.time()
    print("========== CIC IoT feature extraction ==========")

    pcap_file = 'C:\\Users\\hp\\Desktop\\ML-Script\\trident-network-security\\backend\\capture.pcap'


    csv_file_name = 'output'

    print(pcap_file)
    print(">>>> 1. Processing the .pcap file.")
    
    fe = Feature_extraction()
    success = fe.pcap_evaluation(pcap_file, csv_file_name)

    if success:
        print("Processing completed successfully.")
    else:
        print("There was an error in processing.")

    end = time.time()
    print(f'Elapsed Time = {(end - start)}s')
