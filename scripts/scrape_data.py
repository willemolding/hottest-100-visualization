"""
A script to scrape the lists of the top 100 songs from the website http://hottest100.org/

# resources 
http://stackoverflow.com/questions/18966368/python-beautifulsoup-scrape-tables
"""
import urllib2
from bs4 import BeautifulSoup
import pandas as pd

base_url = "http://hottest100.org/"

fields = ['Number', 'Title', 'Artist', 'Time', 'Country']

df = pd.DataFrame(columns=fields + ['Year'])

for year in range(1993, 2015+1):
    url = base_url+str(year)+'.html'

    page = urllib2.urlopen(url).read()
    soup = BeautifulSoup(page)

    table = soup.find('table', {'id' : 'list'})

    for tr in table.find_all('tr')[1:]:
        row = {'Year' : str(year)}
        for field_name, td in zip(fields, tr.find_all('td')):
            row[field_name] = td.text.strip()
        df = df.append(row, ignore_index=True)

df.to_csv('../data/song_rankings_1993_to_2015.csv', encoding='utf-8', index=False)

