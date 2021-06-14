export class AssetRegistrationsModel {
  public id: string;
  public asset_id: string;
  public badge_no: string;
  public node_id: string;
  public hex_code: string;
  public asset_identity: string;
  public parent_location: string;
  public location_description: string;
  public building: string;
  public address_line_1: string;
  public address_line_2: string;
  public address_line_3: string;
  public city: string;
  public state: string;
  public postal_code: string;
  public country: string;
  public tag_number: string;
  public service_area: string;
  public location_main_contact: string;
  public location_asset_maintenance_manager: string;
  public maintenance_planner: string;
  public gis_esri_id: string;
  public latitude: string;
  public longitude: string;
  public asset_critically: string;
  public cost_center: string;
  public asset_owning_department: string;
  public main_operation: string;
  public region: string;
  public operation: string;
  public process_function: string;
  public sub_process_system: string;
  public asset_or_component_type: string;
  public asset_class_asset_category: string;
  public handed_over_asset_or_procured: string;
  public internal_asset_adentity: string;
  public asset_primary_category: string;
  public sub_category_1: string;
  public sub_category_2: string;
  public brand: string;
  public model_number: string;
  public size_capacity_1: string;
  public size_capacity_1_unit_measurement: string;
  public size_capacity_2: string;
  public size_capacity_2_unit_measurement: string;
  public size_capacity_3: string;
  public size_capacity_3_unit_measurement: string;
  public parent_asset_plate_number: string;
  public asset_plate_number: string;
  public detailed_description: string;
  public serial_number: string;
  public asset_tag_number: string;
  public purchase_date_installed_handed_over_date: string;
  public condition_rating: string;
  public maintenance_specification: string;
  public measurement_type: string;
  public warranty: string;
  public actual_warranty_period: string;
  public warranty_vendor_name: string;
  public bottom_water_level: string;
  public closing_torque: string;
  public dimention: string;
  public frequency: string;
  public infrastructure_status: string;
  public installation: string;
  public manufacturer: string;
  public material_type: string;
  public no_of_channel: string;
  public opening_torque: string;
  public pump_head: string;
  public staging_height: string;
  public top_water_level: string;
  public valve_pressure_rating: string;
  public vehicle_engine_number: string;
  public vehicle_insurance_auto_windscreen_insured: string;
  public vehicle_insurance_date_period_to: string;
  public vehicle_insurance_sum_insured: string;
  public vehicle_owner_status: string;
  public vehicle_puspakom_expired_date: string;
  public vehicle_roadtax_expired_date: string;
  public vehicle_seating_capacity: string;
  public communication_protocol: string;
  public environmental_performance: string;
  public horse_power: string;
  public infrastructure_status_reason: string;
  public insulation: string;
  public manufacturer_year: string;
  public model: string;
  public no_of_phases: string;
  public outlet_diameter: string;
  public revolutions_per_minute: string;
  public supply_location: string;
  public type: string;
  public vehicle_chasis_number: string;
  public vehicle_insurance_vendor: string;
  public vehicle_insurance_cover_note_number: string;
  public vehicle_insurance_no_claim_discount: string;
  public vehicle_insurance_total_premium: string;
  public vehicle_register_date: string;
  public vehicle_spad_permit_date_period_to: string;
  public vehicle_spad_no_license_operator: string;
  public vehicle_registration_owner: string;
  public capacity_size: string;
  public coverage_range: string;
  public flow_rate: string;
  public hysteresis: string;
  public inlet_diameter: string;
  public legal_name: string;
  public manufacture_part_number: string;
  public motor_current: string;
  public no_of_stage: string;
  public power_supply_type: string;
  public source_from: string;
  public temperature: string;
  public valve_diameter: string;
  public vehicle_engine_capacity: string;
  public vehicle_model: string;
  public vehicle_insurance_date_period_from: string;
  public vehicle_insurance_policy_type: string;
  public vehicle_puspakom_date_inspection: string;
  public vehicle_roadtarate: string;
  public vehicle_roadtax_renew_date: string;
  public vehicle_spad_permit_date_period_from: string;
  public voltage: string;
  public asset_status: string;
  public bo: string;
  public bo_status: string;
  public new_parent_location: string;
  public status: string;
  public created_at: string;
  public modified_at: string;

  constructor(
    id: string,
    asset_id: string,
    badge_no: string,
    node_id: string,
    hex_code: string,
    asset_identity: string,
    parent_location: string,
    location_description: string,
    building: string,
    address_line_1: string,
    address_line_2: string,
    address_line_3: string,
    city: string,
    state: string,
    postal_code: string,
    country: string,
    tag_number: string,
    service_area: string,
    location_main_contact: string,
    location_asset_maintenance_manager: string,
    maintenance_planner: string,
    gis_esri_id: string,
    latitude: string,
    longitude: string,
    asset_critically: string,
    cost_center: string,
    asset_owning_department: string,
    main_operation: string,
    region: string,
    operation: string,
    process_function: string,
    sub_process_system: string,
    asset_or_component_type: string,
    asset_class_asset_category: string,
    handed_over_asset_or_procured: string,
    internal_asset_adentity: string,
    asset_primary_category: string,
    sub_category_1: string,
    sub_category_2: string,
    brand: string,
    model_number: string,
    size_capacity_1: string,
    size_capacity_1_unit_measurement: string,
    size_capacity_2: string,
    size_capacity_2_unit_measurement: string,
    size_capacity_3: string,
    size_capacity_3_unit_measurement: string,
    parent_asset_plate_number: string,
    asset_plate_number: string,
    detailed_description: string,
    serial_number: string,
    asset_tag_number: string,
    purchase_date_installed_handed_over_date: string,
    condition_rating: string,
    maintenance_specification: string,
    measurement_type: string,
    warranty: string,
    actual_warranty_period: string,
    warranty_vendor_name: string,
    bottom_water_level: string,
    closing_torque: string,
    dimention: string,
    frequency: string,
    infrastructure_status: string,
    installation: string,
    manufacturer: string,
    material_type: string,
    no_of_channel: string,
    opening_torque: string,
    pump_head: string,
    staging_height: string,
    top_water_level: string,
    valve_pressure_rating: string,
    vehicle_engine_number: string,
    vehicle_insurance_auto_windscreen_insured: string,
    vehicle_insurance_date_period_to: string,
    vehicle_insurance_sum_insured: string,
    vehicle_owner_status: string,
    vehicle_puspakom_expired_date: string,
    vehicle_roadtax_expired_date: string,
    vehicle_seating_capacity: string,
    communication_protocol: string,
    environmental_performance: string,
    horse_power: string,
    infrastructure_status_reason: string,
    insulation: string,
    manufacturer_year: string,
    model: string,
    no_of_phases: string,
    outlet_diameter: string,
    revolutions_per_minute: string,
    supply_location: string,
    type: string,
    vehicle_chasis_number: string,
    vehicle_insurance_vendor: string,
    vehicle_insurance_cover_note_number: string,
    vehicle_insurance_no_claim_discount: string,
    vehicle_insurance_total_premium: string,
    vehicle_register_date: string,
    vehicle_spad_permit_date_period_to: string,
    vehicle_spad_no_license_operator: string,
    vehicle_registration_owner: string,
    capacity_size: string,
    coverage_range: string,
    flow_rate: string,
    hysteresis: string,
    inlet_diameter: string,
    legal_name: string,
    manufacture_part_number: string,
    motor_current: string,
    no_of_stage: string,
    power_supply_type: string,
    source_from: string,
    temperature: string,
    valve_diameter: string,
    vehicle_engine_capacity: string,
    vehicle_model: string,
    vehicle_insurance_date_period_from: string,
    vehicle_insurance_policy_type: string,
    vehicle_puspakom_date_inspection: string,
    vehicle_roadtarate: string,
    vehicle_roadtax_renew_date: string,
    vehicle_spad_permit_date_period_from: string,
    voltage: string,
    asset_status: string,
    status: string,
    bo: string,
    bo_status: string,
    new_parent_location: string,
    created_at: string,
    modified_at: string
  ) {
    this.id = id;
    this.asset_id = asset_id;
    this.badge_no = badge_no;
    this.node_id = node_id;
    this.hex_code = hex_code;
    this.asset_identity = asset_identity;
    this.parent_location = parent_location;
    this.location_description = location_description;
    this.building = building;
    this.address_line_1 = address_line_1;
    this.address_line_2 = address_line_2;
    this.address_line_3 = address_line_3;
    this.city = city;
    this.state = state;
    this.postal_code = postal_code;
    this.country = country;
    this.tag_number = tag_number;
    this.service_area = service_area;
    this.location_main_contact = location_main_contact;
    this.location_asset_maintenance_manager = location_asset_maintenance_manager;
    this.maintenance_planner = maintenance_planner;
    this.gis_esri_id = gis_esri_id;
    this.latitude = latitude;
    this.longitude = longitude;
    this.asset_critically = asset_critically;
    this.cost_center = cost_center;
    this.asset_owning_department = asset_owning_department;
    this.main_operation = main_operation;
    this.region = region;
    this.operation = operation;
    this.process_function = process_function;
    this.sub_process_system = sub_process_system;
    this.asset_or_component_type = asset_or_component_type;
    this.asset_class_asset_category = asset_class_asset_category;
    this.handed_over_asset_or_procured = handed_over_asset_or_procured;
    this.internal_asset_adentity = internal_asset_adentity;
    this.asset_primary_category = asset_primary_category;
    this.sub_category_1 = sub_category_1;
    this.sub_category_2 = sub_category_2;
    this.brand = brand;
    this.model_number = model_number;
    this.size_capacity_1 = size_capacity_1;
    this.size_capacity_1_unit_measurement = size_capacity_1_unit_measurement;
    this.size_capacity_2 = size_capacity_2;
    this.size_capacity_2_unit_measurement = size_capacity_2_unit_measurement;
    this.size_capacity_3 = size_capacity_3;
    this.size_capacity_3_unit_measurement = size_capacity_3_unit_measurement;
    this.parent_asset_plate_number = parent_asset_plate_number;
    this.asset_plate_number = asset_plate_number;
    this.detailed_description = detailed_description;
    this.serial_number = serial_number;
    this.asset_tag_number = asset_tag_number;
    this.purchase_date_installed_handed_over_date = purchase_date_installed_handed_over_date;
    this.condition_rating = condition_rating;
    this.maintenance_specification = maintenance_specification;
    this.measurement_type = measurement_type;
    this.warranty = warranty;
    this.actual_warranty_period = actual_warranty_period;
    this.warranty_vendor_name = warranty_vendor_name;
    this.bottom_water_level = bottom_water_level;
    this.closing_torque = closing_torque;
    this.dimention = dimention;
    this.frequency = frequency;
    this.infrastructure_status = infrastructure_status;
    this.installation = installation;
    this.manufacturer = manufacturer;
    this.material_type = material_type;
    this.no_of_channel = no_of_channel;
    this.opening_torque = opening_torque;
    this.pump_head = pump_head;
    this.staging_height = staging_height;
    this.top_water_level = top_water_level;
    this.valve_pressure_rating = valve_pressure_rating;
    this.vehicle_engine_number = vehicle_engine_number;
    this.vehicle_insurance_auto_windscreen_insured = vehicle_insurance_auto_windscreen_insured;
    this.vehicle_insurance_date_period_to = vehicle_insurance_date_period_to;
    this.vehicle_insurance_sum_insured = vehicle_insurance_sum_insured;
    this.vehicle_owner_status = vehicle_owner_status;
    this.vehicle_puspakom_expired_date = vehicle_puspakom_expired_date;
    this.vehicle_roadtax_expired_date = vehicle_roadtax_expired_date;
    this.vehicle_seating_capacity = vehicle_seating_capacity;
    this.communication_protocol = communication_protocol;
    this.environmental_performance = environmental_performance;
    this.horse_power = horse_power;
    this.infrastructure_status_reason = infrastructure_status_reason;
    this.insulation = insulation;
    this.manufacturer_year = manufacturer_year;
    this.model = model;
    this.no_of_phases = no_of_phases;
    this.outlet_diameter = outlet_diameter;
    this.revolutions_per_minute = revolutions_per_minute;
    this.supply_location = supply_location;
    this.type = type;
    this.vehicle_chasis_number = vehicle_chasis_number;
    this.vehicle_insurance_vendor = vehicle_insurance_vendor;
    this.vehicle_insurance_cover_note_number = vehicle_insurance_cover_note_number;
    this.vehicle_insurance_no_claim_discount = vehicle_insurance_no_claim_discount;
    this.vehicle_insurance_total_premium = vehicle_insurance_total_premium;
    this.vehicle_register_date = vehicle_register_date;
    this.vehicle_spad_permit_date_period_to = vehicle_spad_permit_date_period_to;
    this.vehicle_spad_no_license_operator = vehicle_spad_no_license_operator;
    this.vehicle_registration_owner = vehicle_registration_owner;
    this.capacity_size = capacity_size;
    this.coverage_range = coverage_range;
    this.flow_rate = flow_rate;
    this.hysteresis = hysteresis;
    this.inlet_diameter = inlet_diameter;
    this.legal_name = legal_name;
    this.manufacture_part_number = manufacture_part_number;
    this.motor_current = motor_current;
    this.no_of_stage = no_of_stage;
    this.power_supply_type = power_supply_type;
    this.source_from = source_from;
    this.temperature = temperature;
    this.valve_diameter = valve_diameter;
    this.vehicle_engine_capacity = vehicle_engine_capacity;
    this.vehicle_model = vehicle_model;
    this.vehicle_insurance_date_period_from = vehicle_insurance_date_period_from;
    this.vehicle_insurance_policy_type = vehicle_insurance_policy_type;
    this.vehicle_puspakom_date_inspection = vehicle_puspakom_date_inspection;
    this.vehicle_roadtarate = vehicle_roadtarate;
    this.vehicle_roadtax_renew_date = vehicle_roadtax_renew_date;
    this.vehicle_spad_permit_date_period_from = vehicle_spad_permit_date_period_from;
    this.voltage = voltage;
    this.asset_status = asset_status;
    this.status = status;
    this.bo = bo;
    this.bo_status = bo_status;
    this.new_parent_location = new_parent_location;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}
