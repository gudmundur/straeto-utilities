fs      = require 'fs'
json    = require 'json'
async   = require 'async'
_       = require 'underscore'

routeRegex = ///leid(\d*)\.json///
flatten = (array) -> [].concat array...

emitStops = (r) -> ([stop, r.routeNr] for stop in r.stops)
reduceToList = (memo, value) ->
    [k, v] = value
    memo[k] = memo[k] or []
    memo[k].push v
    memo

extractStops = (path, callback) ->
    fs.readFile path, (err, data) ->
        routeNr = (Number) path.match(routeRegex)[1]
        stops = _(json.parse(data).timetables).chain()
            .flatten()
            .pluck('timetable')
            .flatten()
            .pluck('stop')
            .uniq(false)
            .value()

        callback null, 
            routeNr: routeNr,
            stops: stops


fs.readdir '.', (err, files) ->
    routeFiles = _.filter files, (f) -> f.match(routeRegex)
    async.map routeFiles, extractStops, (err, routes) ->
        mappedPairs = flatten(_.map routes, emitStops)
        stops = _([k, v] for k, v of _.reduce(mappedPairs, reduceToList, {})).sortBy (p) -> p[0]
        
        (console.log "#{s[0]};#{s[1].join(';')}" for s in stops)


