import json
import urllib.request

def process_art_data(x):
  masterList = []
  verify = []
  response = urllib.request.urlopen(x)
  content = response.read().decode()
  contentconvert = json.loads(content)
  for i in contentconvert:
    if "latitude" in i:
      if "longitude" in i:
        verify = [0, 0, 0]
        verify[0] = float(i["latitude"])
        verify[1] = float(i["longitude"])
        verify[2] = (i["type"])
        masterList.append(verify)
  return json.dumps(masterList)