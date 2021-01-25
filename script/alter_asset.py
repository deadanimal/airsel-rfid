import requests
import json

# Base items
api_url = 'https://airsel-rfid-api.pipe.my/v1/assets/'
r_header = {'Content-type':'application/json', 'Accept':'application/json'}

# Opening JSON file 
file_json = open('./airsel_asset.json',) 
  
# returns JSON object as  
# a dictionary 
data_assets = json.load(file_json) 
  
# Iterating through the json 
# list 
for asset in data_assets: 
    # body = {
    #     'warranty_expiration_date': '2021-01-21'
    # }
    # print(api_url+asset['id']+'/')
    body = {
        'warranty_expiration_date': None
    }
    r_patch = requests.patch(api_url+asset['id']+'/', data=json.dumps(body), headers=r_header)
    print(r_patch.status_code)
# Closing file 
file_json.close() 
