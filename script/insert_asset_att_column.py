import csv
import requests
import json

with open('asset_att_collumn.csv', mode='r', encoding='utf-8-sig') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    line_count = 0
    for row in csv_reader:
        if line_count == 0:
            # print(f'Column names are {", ".join(row)}')
            line_count += 1
        # print(f'\tworks in the {row["Email Address"]}')
        
        account = {
            # 'id': row["id"],
            'asset_type_id': row["asset_type_id"],
            'bottom_water_level': row["bottom_water_level"],
            'closing_torque': row["closing_torque"],
            'dimention': row["dimention"],
            'frequency': row["frequency"],
            'infrastructure_status': row["infrastructure_status"],
            'installation': row["installation"],
            'manufacturer': row["manufacturer"],
            'material_type': row["material_type"],
            'no_of_channel': row["no_of_channel"],
            'opening_torque': row["opening_torque"],
            'pump_head': row["pump_head"],
            'staging_height': row["staging_height"],
            'top_water_level': row["top_water_level"],
            'valve_pressure_rating': row["valve_pressure_rating"],
            'vehicle_engine_number': row["vehicle_engine_number"],
            'vehicle_insurance_auto_windscreen_insured': row["vehicle_insurance_auto_windscreen_insured"],
            'vehicle_insurance_date_period_to': row["vehicle_insurance_date_period_to"],
            'vehicle_insurance_sum_insured': row["vehicle_insurance_sum_insured"],
            'vehicle_owner_status': row["vehicle_owner_status"],
            'vehicle_puspakom_expired_date': row["vehicle_puspakom_expired_date"],
            'vehicle_roadtax_expired_date': row["vehicle_roadtax_expired_date"],
            'vehicle_seating_capacity': row["vehicle_seating_capacity"],
            'communication_protocol': row["communication_protocol"],
            'environmental_performance': row["environmental_performance"],
            'horse_power': row["horse_power"],
            'infrastructure_status_reason': row["infrastructure_status_reason"],
            'insulation': row["insulation"],
            'manufacturer_year': row["manufacturer_year"],
            'model': row["model"],
            'no_of_phases': row["no_of_phases"],
            'outlet_diameter': row["outlet_diameter"],
            'revolutions_per_minute': row["revolutions_per_minute"],
            'supply_location': row["supply_location"],
            'type': row["type"],
            'vehicle_chasis_number': row["vehicle_chasis_number"],
            'vehicle_insurance_vendor': row["vehicle_insurance_vendor"],
            'vehicle_insurance_cover_note_number': row["vehicle_insurance_cover_note_number"],
            'vehicle_insurance_no_claim_discount': row["vehicle_insurance_no_claim_discount"],
            'vehicle_insurance_total_premium': row["vehicle_insurance_total_premium"],
            'vehicle_register_date': row["vehicle_register_date"],
            'vehicle_spad_permit_date_period_to': row["vehicle_spad_permit_date_period_to"],
            'vehicle_spad_no_license_operator': row["vehicle_spad_no_license_operator"],
            'vehicle_registration_owner': row["vehicle_registration_owner"],
            'capacity_size': row["capacity_size"],
            'coverage_range': row["coverage_range"],
            'flow_rate': row["flow_rate"],
            'hysteresis': row["hysteresis"],
            'inlet_diameter': row["inlet_diameter"],
            'legal_name': row["legal_name"],
            'manufacture_part_number': row["manufacture_part_number"],
            'motor_current': row["motor_current"],
            'no_of_stage': row["no_of_stage"],
            'power_supply_type': row["power_supply_type"],
            'source_from': row["source_from"],
            'temperature': row["temperature"],
            'valve_diameter': row["valve_diameter"],
            'vehicle_engine_capacity': row["vehicle_engine_capacity"],
            'vehicle_model': row["vehicle_model"],
            'vehicle_insurance_date_period_from': row["vehicle_insurance_date_period_from"],
            'vehicle_insurance_policy_type': row["vehicle_insurance_policy_type"],
            'vehicle_puspakom_date_inspection': row["vehicle_puspakom_date_inspection"],
            'vehicle_roadtax_rate': row["vehicle_roadtax_rate"],
            'vehicle_roadtax_renew_date': row["vehicle_roadtax_renew_date"],
            'vehicle_spad_permit_date_period_from': row["vehicle_spad_permit_date_period_from"],
            'voltage': row["voltage"],
            'asset_status': row["asset_status"],
            'brand': row["brand"],
            'model_number': row["model_number"],
            'bo': row["bo"],
            'bo_status': row["bo_status"]
        }

        line_count += 1
        # print(json.dumps(account))
        # print(f'Processed {account} lines.')
        r = requests.post('https://airsel-rfid-api.pipe.my/v1/asset-attribute-column/', data=account)
        print('status = ', r.status_code)
    # print(f'Processed {line_count} lines.')
    #     'http://127.0.0.1:8000/v1/asset-location/'
        # requests.post('http://127.0.0.1:8000/v1/asset-location/', data=account)
    print(f'Processed {line_count} lines.')