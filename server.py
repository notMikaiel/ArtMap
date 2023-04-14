# This file sets up a web server using the Bottle library
# It defines routes for serving the HTML page, JavaScript file, and art data in JSON format
# The toIndex function serves the index.html file when the root URL is requested
# The toMap function serves the map.js file when the /map.js URL is requested
# The get_art_data function returns a JSON string containing art data when the /art URL is requested
# The run function starts the server and listens for incoming requests

import server
import json
from bottle import route, run
from bottle import static_file

@route("/map.js")
def toMap():
  return static_file("map.js", root="")

@route("/")
def toIndex():
  return static_file("index.html", root="")

@route('/art')
def get_art_data():
  return json.dumps([[35.6763257, 139.6993177, "Meiji Shrine"],
  [35.7101456, 139.8105814, "Skytree"],
  [35.6950532, 139.7017945, "Godzilla Head"]])

run(host="0.0.0.0", port=8080, debug=True)