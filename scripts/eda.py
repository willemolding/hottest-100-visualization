"""
A few simple exploratory plots and statistics to check the data is acceptable before jumping into
creating the visualisation
"""

import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

df = pd.read_csv('../data/song_rankings_1993_to_2015.csv')

# check that there are in fact 100 songs for each year
print df.groupby('Year')['Number'].count()

# get an idea of which countries take part and their total entry counts
print df.groupby('Country')['Number'].count()

df2 = df.groupby(['Year','Country'])['Number'].count()
df2.plot(kind='area', x='Year', y='Country')
plt.show()

# # create a plot of how the country composition changes over time
# plt.stackplot(np.unique(df.Year),
# 	df.groupby('Year'))
# plt.show()