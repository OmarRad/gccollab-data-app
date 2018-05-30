import sys, json, numpy as np
import pandas as pd
import code
import datetime

# This script returns data by printing to stdout

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])

def main():
    # Determine type of resample
    
    print(json.dumps(send_obj))

# Clean dataframes for serialization
def clean_df(df):
    for key in df.keys():
        if type(key) is not str:
            try:
                df[str(key)] = df[key]
            except:
                try:
                    df[repr(key)] = df[key]
                except:
                    pass
            del df[key]
    return df

#start process
if __name__ == '__main__':
    main()