import csv
import requests
import json

with open('asset_type-Sheet1.csv', mode='r', encoding='utf-8-sig') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    line_count = 0
    for row in csv_reader:
        if line_count == 0:
            # print(f'Column names are {", ".join(row)}')
            line_count += 1
        # print(f'\tworks in the {row["Email Address"]}')
        
        account = {
            # 'id': row["id"],
            'asset_bussiness_object': row["asset_bussiness_object"],
            'asset_type_code': row["asset_type_code"],
            'asset_type_description': row["asset_type_description"],
            'status': row["status"],
            'assessment_class': row["assessment_class"],
            'profile_failure': row["profile_failure"],
            'owned_organisation': row["owned_organisation"],
            'instance_organisation': row["instance_organisation"],
            'asset_category': row["asset_category"]
        }

        line_count += 1
        # print(json.dumps(account))
        # print(f'Processed {account} lines.')
        r = requests.post('https://airsel-rfid-api.pipe.my/v1/asset-types/', data=account)
        print('status = ', r.status_code)
    # print(f'Processed {line_count} lines.')
    #     'http://127.0.0.1:8000/v1/asset-location/'
        # requests.post('http://127.0.0.1:8000/v1/asset-location/', data=account)
    print(f'Processed {line_count} lines.')