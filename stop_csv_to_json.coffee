csv = require 'csv'

result = []

csv()
    .fromPath('stops.csv')
    .transform((data, index) ->
        return if index is 0

        [stop, lat, lon, routes...] = data

        stop: stop
        lat: (Number) lat
        lon: (Number) lon
        routes: (Number) r for r in routes
    ).on('data', (data, index) ->
        result.push data
    ).on('end', ->
        console.log result
    )
