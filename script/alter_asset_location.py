import requests
import json

api_url = 'https://airsel-rfid-api.pipe.my/v1/asset-location/'
r_header = {'Content-type':'application/json', 'Accept':'application/json'}
# Opening JSON file 
file_json = open('./airsel_asset_location.json',) 
  
# returns JSON object as  
# a dictionary 
data_asset_locations = json.load(file_json) 
  
# Iterating through the json 
# list 
for asset_location in data_asset_locations: 
    body = {
        'quit_rent_bill_payment_date': None,
        'lease_expired_date': None
    }
    # print(api_url+asset_location['id']+'/')
    r_patch = requests.patch(api_url+asset_location['id']+'/', data=json.dumps(body), headers=r_header)
    print(json.dumps(body))
    print(r_patch.status_code)
# Closing file 
file_json.close() 
