import csv
import requests
import json

with open('asset_location_090320162300.csv', mode='r', encoding='utf-8-sig') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    line_count = 0
    for row in csv_reader:
        if line_count == 0:
            # print(f'Column names are {", ".join(row)}')
            line_count += 1
        # print(f'\tworks in the {row["Email Address"]}')
        
        account = {
            # 'id': row["id"],
            'location_type': row["location_type"],
            'locatin_disposition': row["locatin_disposition"],
            'Bo': row["Bo"],
            'description': row["description"],
            'parent_loc_or_org': row["parent_loc_or_org"],
            'work_request_approval_profile': row["work_request_approval_profile"],
            'owning_org': row["owning_org"],
            'building': row["building"],
            'room': row["room"],
            'position': row["position"],
            'country': row["country"],
            'address_1': row["address_1"],
            'address_2': row["address_2"],
            'address_3': row["address_3"],
            'cross_street': row["cross_street"],
            'city': row["city"],
            'suburb': row["suburb"],
            'state': row["state"],
            'postal': row["postal"],
            'location_class': row["location_class"],
            'main_contact': row["main_contact"],
            'maintenance_manager': row["maintenance_manager"],
            'planner': row["planner"],
            'cost_center': row["cost_center"],
            'rcm_system': row["rcm_system"],
            'environmental_rating': row["environmental_rating"],
            'service_condition': row["service_condition"],
            'duty_cycle': row["duty_cycle"],
            'backlog_group': row["backlog_group"],
            'run_to_failure': row["run_to_failure"],
            'breaker': row["breaker"],
            'runtime_source': row["runtime_source"],
            'tag_number': row["tag_number"],
            'site_location': row["site_location"],
            'point_id': row["point_id"],
            'service_area': row["service_area"],
            'latitude': row["latitude"],
            'longitude': row["longitude"],
            'asset_criticality': row["asset_criticality"],
            'criticality_reason': row["criticality_reason"],
            'gis_id': row["gis_id"],
            'connected_to_location_id': row["connected_to_location_id"],
            'water_asset_category': row["water_asset_category"],
            'land_asset_status': row["land_asset_status"],
            'land_ownership_number': row["land_ownership_number"],
            'take_over_date': row["take_over_date"],
            'take_over_date_source_qt11': row["take_over_date_source_qt11"],
            'take_over_date_source_ccc': row["take_over_date_source_ccc"],
            'land_area_acre': row["land_area_acre"],
            'plan_certified_number': row["plan_certified_number"],
            'plan_pre_computation_number': row["plan_pre_computation_number"],
            'plan_as_built_number': row["plan_as_built_number"],
            'quit_rent_bill_number': row["quit_rent_bill_number"],
            'current_rate_of_quit_rent': row["current_rate_of_quit_rent"],
            'quit_rent_bill_payment_date': row["quit_rent_bill_payment_date"],
            'assessment_bill_number': row["assessment_bill_number"],
            'current_rate_Of_assesment': row["current_rate_Of_assesment"],
            'assessment_bill_payment_date': row["assessment_bill_payment_date"],
            'lease_expired_date': row["lease_expired_date"],
            'remarks': row["remarks"],
            'parent_location_name': row["parent_location_name"],
            'main_contact_name': row["main_contact_name"],
            'maintenance_manager_nam': row["maintenance_manager_nam"],
            'planner_name': row["planner_name"],
            # 'submitted_datetime': row["submitted_datetime"],
            # 'created_date': row["created_date"],
            # 'modified_date': row["modified_date"],
        }

        line_count += 1
        # print(json.dumps(account))
        # print(f'Processed {account} lines.')
        r = requests.post('https://airsel-rfid-api.pipe.my/v1/asset-location/', data=account)
        print('status = ', r.status_code)
    # print(f'Processed {line_count} lines.')
    #     'http://127.0.0.1:8000/v1/asset-location/'
        # requests.post('http://127.0.0.1:8000/v1/asset-location/', data=account)
    print(f'Processed {line_count} lines.')