import csv
import requests
import json

with open('approval-profile.csv', mode='r', encoding='utf-8-sig') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    line_count = 0
    for row in csv_reader:
        if line_count == 0:
            line_count += 1
        
        account = {
            # 'id': row["id"],
            'approval_profile': row["approval_profile"],
            'description': row["description"]
        }

        line_count += 1
        # print(json.dumps(account))
        # print(f'Processed {account} lines.')
        r = requests.post('https://airsel-rfid-api.pipe.my/v1/approval-profile/', data=account)
        print('status = ', r.status_code)
    # print(f'Processed {line_count} lines.')
    #     'http://127.0.0.1:8000/v1/asset-location/'
        # requests.post('http://127.0.0.1:8000/v1/asset-location/', data=account)
    print(f'Processed {line_count} lines.')