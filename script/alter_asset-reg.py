import csv
import requests
import json

with open('rfid-tag-ph-pj-PH-PETALING.csv', mode='r', encoding='utf-8-sig') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    line_count = 0
    for row in csv_reader:
        if line_count == 0:
            # print(f'Column names are {", ".join(row)}')
            line_count += 1
        # print(f'\tworks in the {row["Email Address"]}')
        
        account = {
            # 'id': row["id"],
            # 'asset_id': row["asset_id"],
            # 'asset_type': row["asset_type"],
            # 'description': row["description"],
            # 'description': row["description"],
            # 'bo': row["bo"],
            # 'bo_status': row["bo_status"],
            # 'owning_access_group': row["owning_access_group"],
            # 'effective_datetime': row["effective_datetime"],
            # 'node_id': row["node_id"],
            'badge_no': row["badge_no"]
            # 'serial_no': row["serial_no"],
            # 'pallet_no': row["pallet_no"],
            # 'handed_over_asset': row["handed_over_asset"],
            # 'fixed_asset_no': row["fixed_asset_no"],
            # 'scada_id': row["scada_id"],
            # 'condition_rating': row["condition_rating"],
            # 'condifence_rating': row["condifence_rating"],
            # 'maintenance_specification': row["maintenance_specification"],
            # 'bom_part_id': row["bom_part_id"],
            # 'attached_to_asset_id': row["attached_to_asset_id"],
            # 'vehicle_identification_num': row["vehicle_identification_num"],
            # 'license_number': row["license_number"],
            # 'purchase_order_num': row["purchase_order_num"],
            # 'location_id': row["location_id"],
            # 'metrology_firmware': row["metrology_firmware"],
            # 'nic_firmware': row["nic_firmware"],
            # 'configuration': row["configuration"],
            # 'warranty_expiration_date': row["warranty_expiration_date"],
            # 'warranty_detail': row["warranty_detail"],
            # 'vendor_part_no': row["vendor_part_no"],
            # 'owning_access_group_nam': row["owning_access_group_nam"],
            # 'specification': row["specification"],
            # 'hex_code': row["hex_code"],
            # 'field_1': row["field_1"],
            # 'field_2': row["field_2"],
            # 'submitted_datetime': row["submitted_datetime"],
            # 'registered_datetime': row["registered_datetime"]
        }

        line_count += 1
        # print(json.dumps(account))
        # print(f'Processed {account} lines.')
        r = requests.post('https://airsel-rfid-api.pipe.my/v1/asset-registration/', data=account)
        print('status = ', r.status_code)
    # print(f'Processed {line_count} lines.')
    #     'http://127.0.0.1:8000/v1/asset-location/'
        # requests.post('http://127.0.0.1:8000/v1/asset-location/', data=account)
    print(f'Processed {line_count} lines.')