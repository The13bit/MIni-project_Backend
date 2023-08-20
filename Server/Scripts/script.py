import pandas as pd
import numpy as np
import sys
import os
url=sys.argv[1]
year=sys.argv[2]
sem=sys.argv[3]
branch=sys.argv[4]

folder_path='processed_data/'
if not os.path.exists(folder_path):
    os.makedirs(folder_path)
file_path=os.path.join(folder_path,year+'_'+sem+'_'+branch+'.csv')

df=pd.read_csv(url)


#mean by std_branch
df.set_index('Std_Branch', inplace=True)
grouped=df.groupby('Std_Branch')['Std_Marks'].mean()
grouped=grouped.reset_index()
grouped.to_csv(file_path, index=False)
print(grouped)

