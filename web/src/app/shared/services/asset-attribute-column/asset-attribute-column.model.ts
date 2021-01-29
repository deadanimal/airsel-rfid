export class AssetAttributeColumnModel {
  public id: string;
  public asset_type_id: string;
  public bottom_water_level: boolean;
  public closing_torque: boolean;
  public dimention: boolean;
  public frequency: boolean;
  public infrastructure_status: boolean;
  public installation: boolean;
  public manufacturer: boolean;
  public material_type: boolean;
  public no_of_channel: boolean;
  public opening_torque: boolean;
  public pump_head: boolean;
  public staging_height: boolean;
  public top_water_level: boolean;
  public valve_pressure_rating: boolean;
  public vehicle_engine_number: boolean;
  public vehicle_insurance_auto_windscreen_insured: boolean;
  public vehicle_insurance_date_period_to: boolean;
  public vehicle_insurance_sum_insured: boolean;
  public vehicle_owner_status: boolean;
  public vehicle_puspakom_expired_date: boolean;
  public vehicle_roadtax_expired_date: boolean;
  public vehicle_seating_capacity: boolean;
  public communication_protocol: boolean;
  public environmental_performance: boolean;
  public horse_power: boolean;
  public infrastructure_status_reason: boolean;
  public insulation: boolean;
  public manufacturer_year: boolean;
  public model: boolean;
  public no_of_phases: boolean;
  public outlet_diameter: boolean;
  public revolutions_per_minute: boolean;
  public supply_location: boolean;
  public type: boolean;
  public vehicle_chasis_number: boolean;
  public vehicle_insurance_vendor: boolean;
  public vehicle_insurance_cover_note_number: boolean;
  public vehicle_insurance_no_claim_discount: boolean;
  public vehicle_insurance_total_premium: boolean;
  public vehicle_register_date: boolean;
  public vehicle_spad_permit_date_period_to: boolean;
  public vehicle_spad_no_license_operator: boolean;
  public vehicle_registration_owner: boolean;
  public capacity_size: boolean;
  public coverage_range: boolean;
  public flow_rate: boolean;
  public hysteresis: boolean;
  public inlet_diameter: boolean;
  public legal_name: boolean;
  public manufacture_part_number: boolean;
  public motor_current: boolean;
  public no_of_stage: boolean;
  public power_supply_type: boolean;
  public source_from: boolean;
  public temperature: boolean;
  public valve_diameter: boolean;
  public vehicle_engine_capacity: boolean;
  public vehicle_model: boolean;
  public vehicle_insurance_date_period_from: boolean;
  public vehicle_insurance_policy_type: boolean;
  public vehicle_puspakom_date_inspection: boolean;
  public vehicle_roadtax_rate: boolean;
  public vehicle_roadtax_renew_date: boolean;
  public vehicle_spad_permit_date_period_from: boolean;
  public voltage: boolean;
  public asset_status: boolean;
  public brand: boolean;

  public created_at: string;
  public modified_at: string;

  constructor(
     id: string,
     asset_type_id: string,
     bottom_water_level: boolean,
     closing_torque: boolean,
     dimention: boolean,
     frequency: boolean,
     infrastructure_status: boolean,
     installation: boolean,
     manufacturer: boolean,
     material_type: boolean,
     no_of_channel: boolean,
     opening_torque: boolean,
     pump_head: boolean,
     staging_height: boolean,
     top_water_level: boolean,
     valve_pressure_rating: boolean,
     vehicle_engine_number: boolean,
     vehicle_insurance_auto_windscreen_insured: boolean,
     vehicle_insurance_date_period_to: boolean,
     vehicle_insurance_sum_insured: boolean,
     vehicle_owner_status: boolean,
     vehicle_puspakom_expired_date: boolean,
     vehicle_roadtax_expired_date: boolean,
     vehicle_seating_capacity: boolean,
     communication_protocol: boolean,
     environmental_performance: boolean,
     horse_power: boolean,
     infrastructure_status_reason: boolean,
     insulation: boolean,
     manufacturer_year: boolean,
     model: boolean,
     no_of_phases: boolean,
     outlet_diameter: boolean,
     revolutions_per_minute: boolean,
     supply_location: boolean,
     type: boolean,
     vehicle_chasis_number: boolean,
     vehicle_insurance_vendor: boolean,
     vehicle_insurance_cover_note_number: boolean,
     vehicle_insurance_no_claim_discount: boolean,
     vehicle_insurance_total_premium: boolean,
     vehicle_register_date: boolean,
     vehicle_spad_permit_date_period_to: boolean,
     vehicle_spad_no_license_operator: boolean,
     vehicle_registration_owner: boolean,
     capacity_size: boolean,
     coverage_range: boolean,
     flow_rate: boolean,
     hysteresis: boolean,
     inlet_diameter: boolean,
     legal_name: boolean,
     manufacture_part_number: boolean,
     motor_current: boolean,
     no_of_stage: boolean,
     power_supply_type: boolean,
     source_from: boolean,
     temperature: boolean,
     valve_diameter: boolean,
     vehicle_engine_capacity: boolean,
     vehicle_model: boolean,
     vehicle_insurance_date_period_from: boolean,
     vehicle_insurance_policy_type: boolean,
     vehicle_puspakom_date_inspection: boolean,
     vehicle_roadtax_rate: boolean,
     vehicle_roadtax_renew_date: boolean,
     vehicle_spad_permit_date_period_from: boolean,
     voltage: boolean,
     asset_status: boolean,
     brand: boolean,

     created_at: string,
     modified_at: string,
  ) {
    this.id = id;
    this.asset_type_id = asset_type_id;
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
    this.vehicle_roadtax_rate = vehicle_roadtax_rate;
    this.vehicle_roadtax_renew_date = vehicle_roadtax_renew_date;
    this.vehicle_spad_permit_date_period_from = vehicle_spad_permit_date_period_from;
    this.voltage = voltage;
    this.asset_status = asset_status;

    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}
