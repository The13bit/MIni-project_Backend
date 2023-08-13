import pandas as pd
import numpy as np
import sys
url=sys.argv[1]
df=pd.read_csv(url)


#mean by std_branch
df.set_index('Std_Branch', inplace=True)
grouped=df.groupby('Std_Branch')['Std_Marks'].mean()
grouped=grouped.reset_index()
print(grouped)

