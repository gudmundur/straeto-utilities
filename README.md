# Strætó.is utilities

A set of utilities for working with data coming from [Strætó.is][straeto].

## Getting ready

To run the utilities, you need to have [Node.js][nodejs] 0.6+, [npm][npmjs] and [CoffeeScript][coffeescript] installed.

	% git clone http://github.com/gudmundur/straeto-utilities
	% npm install
	
If you don't have CoffeeScript installed, the setup of this project needs it installed globally
	
	% npm install coffee-script -g

## Converting stops from ISN93 to WGS84

To convert ISN93 coordinates from Strætó, export the entire data file to csv, run the `stops.coffee` and off you go. The script arguments are 

	% coffee stops
	Usage: stops input_file.csv output_file.csv
	% coffee stops stops.csv nicely_formatted_stops.csv
	
## Caveats

Currently I'm working on getting confirmation for that the data I've obtained from Strætó is indeed public. 

Additionally I'm working out which license Ævar has on his [ISN93 conversion code][isn].

## Contributions

* [Ævar Arnfjörð Bjarmason](https://github.com/avar), the ISN93 to WGS84 convertion code comes from this rockstar.
* [Björgvin Ragnarsson](https://github.com/nifgraup), various tech and legal aspect pointers.


[straeto]: http://www.straeto.is
[nodejs]: http://nodejs.org
[npmjs]: http://npmjs.org
[coffeescript]: http://jashkenas.github.com/coffee-script/
[isn]: https://gist.github.com/585850