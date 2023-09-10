import argparse
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np


parser=argparse.ArgumentParser()
parser.add_argument("csv", help="csv")
parser.add_argument("--perf_of_IAT", action="store_true")
args=parser.parse_args()
df=pd.read_csv(args.csv)

if args.perf_of_IAT:
    iat1_data=df[df["exam_type"]=="IAT-1"]
    iat2_data=df[df["exam_type"]=="IAT-2"]

    subjects=["xie_id",
        "name",
        "branch",
        "year",
        "sem",
        "exam_type",
        "Maths_3",
        "DSA",
        "Java",
        "CG",
        "DSGT",
        "DLCOA",]
    
    bar_width=0.35
    index=np.arange(len(subjects))

    for subject in subjects[]:
        plt.bar(index, iat1_data[subject], bar_width, label="IAT-1")
        plt.bar(index+bar_width, iat2_data[subject], bar_width, label="IAT-2")
        index=index+2*bar_width

    plt.xlabel("Subjects")
    plt.ylabel("Marks")

    plt.xticks(np.arange(len(subjects)) + bar_width * (len(subjects) / 2), subjects) 
    plt.legend()
    plt.show()   








print(df)