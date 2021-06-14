import csv
import requests
import json

with open('asset_location_sync-Worksheet.csv', mode='r', encoding='utf-8-sig') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    line_count = 0
    for row in csv_reader:
        if line_count == 0:
            # print(f'Column names are {", ".join(row)}')
            line_count += 1
        # print(f'\tworks in the {row["Email Address"]}')
        qweqwe = row["node_id"]
        # print(qweqwe.zfill(12));      
        account = {
            # 'id': row["id"],
            'node_id': qweqwe.zfill(12),
            'description': row["description"],
            # 'description': row["description"],
        }

        line_count += 1
        # if line_count == 50 :
        #     exit()
        
        # print(json.dumps(account))
        # print(f'Processed {account} lines.')
        r = requests.post('https://airsel-rfid-api.pipe.my/v1/asset-location-sync/', data=account)
        print('status = ', r.status_code)
    # print(f'Processed {line_count} lines.')
    #     'http://127.0.0.1:8000/v1/asset-location/'
        # requests.post('http://127.0.0.1:8000/v1/asset-location/', data=account)
    print(f'Processed {line_count} lines.')