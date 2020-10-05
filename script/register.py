import csv
import requests
import json

with open('air_sel.csv', mode='r', encoding='utf-8-sig') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    line_count = 0
    for row in csv_reader:
        if line_count == 0:
            # print(f'Column names are {", ".join(row)}')
            line_count += 1
        # print(f'\tworks in the {row["Email Address"]}')
        account = {
            'work_category': row["Work Category"],
            'activity_type': row["Activity Type"],
            'activity_description': row["Activity Description"],
            'status': row["Status"],
            'work_order': row["Work Order"]
        }
        line_count += 1
        #print(json.dumps(account))
        requests.post('https://airsel-rfid-api.pipe.my/v1/work-activities/', data=account)
    print(f'Processed {line_count} lines.')