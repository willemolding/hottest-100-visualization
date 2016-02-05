# Visualization of countries of origin for songs in the Triple J Hottest 100

https://willemolding.github.io/hottest-100-visualizaiton

## Summary
Each year the Australian radio station Triple J conducts a nation wide music survey to find the most popular songs that were released in the previous year. The `hottest' 100 songs are played as a countdown every Australia day. My visualisation allows the viewer to explore where in the world the songs originate from and how Australians music tastes have changed in the years since 1993.

## Design
This is the first version of the visualisation. 

- The fill of each country polygon is coloured based on the total number of songs it has had in all the years combined. 
- By default the chart displays an area plot showing the fractions of songs from each country across the years.
- Mousing over a country in the map will change the chart to show only the songs from that country that country across the years.

Improvements made based on feedback

- The x axis on the chart was changed to a time axis rather than catagorical so the dates appear on the tick marks
- Grouped all but the big 3 countries into an other group for the area plot

## Feedback
Reviewer 1:
Fascinating to see the decline in USA input and how England appears to be more or less stable. The map is probably a waste of space seeing as 90% of countries don't feature. Maybe you could replace it with little flags or something? Also maybe the graphs don't need fractional increments for song counts?

Reviewer 2:
On the overall all time plot I find it's pretty difficult to discern anything beyond the big three countries, so maybe group the rest into "Other". I'd prefer either dot points or individual bars to a continuous graph. The continuous one actually has some faults at the moment because if a country got a song in non-consecutive years, the years in between look like they appear in the countdown.

I'm not sure about the best way to do the map. The way I'm imagining it, the eligible countries are listed in total count order, and mousing over a country brings up a more zoomed in map of just the country and the surrounding areas of the globe.

Reveiwer 3:
It would be cool if you could filter the data by top 100, top 50, top 10 for example and see which countries are producing the really popular music. I would also like to see information about individual songs. Like when you mouse over points on the graph it could list the ones from that country.

## Resources
http://stackoverflow.com/questions/9518186/manipulate-elements-by-binding-new-data
http://www.stator-afm.com/tutorial/d3-js-mouse-events/
http://stackoverflow.com/questions/25416063/title-for-charts-and-axes-in-dimple-js-charts
https://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
