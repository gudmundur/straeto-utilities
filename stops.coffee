csv = require 'csv'
isn = require './isn'

n = 1e-6

[input, output] = process.argv[2..]

unless input and output
    console.log 'Usage: stops input_file output_file'
    return

csv().fromPath(input)
    .toPath(output)
    .transform((data, index) ->
        return ['stopId', 'long name', 'short name', 'latitude', 'longitude'] if index is 0
        [stopId, longName, shortName, easting, northing] = data

        res = new isn.isnet93_to_wgs84(easting * n, northing * n)
        return [stopId, longName, shortName, res.lat, res.lon]
    )
