# Visualization of countries of origin for songs in the Triple J Hottest 100

https://willemolding.github.io/hottest-100-visualizaiton

## Summary
Each year the Australian radio station Triple J conducts a nation wide music survey to find the most popular songs that were released in the previous year. The `hottest' 100 songs are played as a countdown every Australia day. My visualisation allows the viewer to explore where in the world the songs originate from and how Australians music tastes have changed in the years since 1993.

## Design
This is the first version of the visualisation. 

- The fill of each country polygon is coloured based on the total number of songs it has had in all the years combined. 
- By default the chart displays an area plot showing the fractions of songs from each country across the years.
- Mousing over a country in the map will change the chart to show only the songs from that country that country across the years.

## Feedback
Fascinating to see the decline in USA input and how England appears to be more or less stable. The map is probably a waste of space seeing as 90% of countries don't feature. Maybe you could replace it with little flags or something? Also maybe the graphs don't need fractional increments for song counts?

## Resources
http://stackoverflow.com/questions/9518186/manipulate-elements-by-binding-new-data
http://www.stator-afm.com/tutorial/d3-js-mouse-events/
http://stackoverflow.com/questions/25416063/title-for-charts-and-axes-in-dimple-js-charts
https://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart