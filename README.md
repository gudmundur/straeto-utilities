# Strætó.is utilities

A set of utilities for working with data coming from [Strætó.is][straeto].

## Getting ready

To run the utilities, you need to have [Node.js][nodejs] 0.6+, [npm][npmjs] and [CoffeeScript][coffeescript] installed.

	% git clone http://github.com/gudmundur/straeto-utilities
	% cd straeto-utilities
	% npm install
	
If you don't have CoffeeScript installed, the setup of this project needs it installed globally
	
	% npm install coffee-script -g

## Converting stops from ISN93 to WGS84

To convert ISN93 coordinates from Strætó, export the entire data file to csv, run the `stops.coffee` and off you go. The script arguments are 

	% coffee stops
	Usage: stops input_file.csv output_file.csv
	% coffee stops.coffee stops.csv nicely_formatted_stops.csv

## Stop extraction

The scraped data doesn't contain any information on where each bus stop is located, so some manual effort was required, the data has to be mapped to a list of stops, each containing a list of which busses stop there.

This conversion is done by taking the output of the scraper, and executing the `convert_routes_to_stops.coffee` utility.

	% cp ../straeto-scraper/leid*.json .
	% coffee convert_routes_to_stops.coffee

The converted output was loaded into a [Google Docs Spreadsheet][stops_gps], and with the effort of a few good people, the approximate locations of the stops are available.

	... export the stop data Google Docs to a csv file ...
	% coffee stop_csv_to_json.coffee

Now we have a list of all stops, along with gps coordinates, and which routes pass by.

## Caveats

Currently I'm working on getting confirmation for that the data I've obtained from Strætó is indeed public. 

## Contributions

* [Ævar Arnfjörð Bjarmason](https://github.com/avar), the ISN93 to WGS84 convertion code comes from this rockstar.
* [Björgvin Ragnarsson](https://github.com/nifgraup), various tech and legal aspect pointers.


[straeto]: http://www.straeto.is
[nodejs]: http://nodejs.org
[npmjs]: http://npmjs.org
[coffeescript]: http://jashkenas.github.com/coffee-script/
[isn]: https://gist.github.com/585850
[stops_gps]: https://docs.google.com/spreadsheet/ccc?key=0AsyYqUhG4vXTdGNZcDd1N0RDNkhGNkVYMXlrc0VkdFE
