export class AssetsLocationModel {
  public id: string;
  public location_type: string;
  public locatin_disposition: string;
  public Bo: string;
  public description: string;
  public parent_loc_or_org: string;
  public work_request_approval_profile: string;
  public owning_org: string;
  public building: string;
  public room: string;
  public position: string;

  public country: string;
  public address_1: string;
  public address_2: string;
  public address_3: string;
  public cross_street: string;
  public city: string;
  public suburb: string;
  public state: string;
  public postal: string;

  public location_class: string;
  public main_contact: string;
  public maintenance_manager: string;
  public planner: string;
  public cost_center: string;
  public rcm_system: string;
  public environmental_rating: string;
  public service_condition: string;
  public duty_cycle: string;

  public backlog_group: string;
  public run_to_failure: string;
  public breaker: string;
  public runtime_source: string;
  public tag_number: string;
  public site_location: string;
  public point_id: string;
  public service_area: string;
  public latitude: string;
  public longitude: string;
  public asset_criticality: string;
  public criticality_reason: string;
  public gis_id: string;
  public connected_to_location_id: string;
  public water_asset_category: string;
  public land_asset_status: string;
  public land_ownership_number: string;
  public take_over_date: string;
  public take_over_date_source_qt11: string;
  public take_over_date_source_ccc: string;
  public land_area_acre: string;
  public plan_certified_number: string;
  public plan_pre_computation_number: string;

  public plan_as_built_number: string;
  public quit_rent_bill_number: string;
  public current_rate_of_quit_rent: string;
  public quit_rent_bill_payment_date: string;
  public assessment_bill_number: string;
  public current_rate_Of_assesment: string;
  public assessment_bill_payment_date: string;
  public lease_expired_date: string;
  public remarks: string;

  public parent_location_name: string;
  public main_contact_name: string;
  public maintenance_manager_nam: string;
  public planner_name: string;
  public submitted_datetime: string;
  public created_date: string;
  public modified_date: string;

  constructor(
    id: string,
    location_type: string,
    locatin_disposition: string,
    Bo: string,
    description: string,
    parent_loc_or_org: string,
    work_request_approval_profile: string,
    owning_org: string,
    building: string,
    room: string,
    position: string,
    country: string,
    address_1: string,
    address_2: string,
    address_3: string,
    cross_street: string,
    city: string,
    suburb: string,
    state: string,
    postal: string,
    location_class: string,
    main_contact: string,
    maintenance_manager: string,
    planner: string,
    cost_center: string,
    rcm_system: string,
    environmental_rating: string,
    service_condition: string,
    duty_cycle: string,
    backlog_group: string,
    run_to_failure: string,
    breaker: string,
    runtime_source: string,
    tag_number: string,
    site_location: string,
    point_id: string,
    service_area: string,
    latitude: string,
    longitude: string,
    asset_criticality: string,
    criticality_reason: string,
    gis_id: string,
    connected_to_location_id: string,
    water_asset_category: string,
    land_asset_status: string,
    land_ownership_number: string,
    take_over_date: string,
    take_over_date_source_qt11: string,
    take_over_date_source_ccc: string,
    land_area_acre: string,
    plan_certified_number: string,
    plan_pre_computation_number: string,
    plan_as_built_number: string,
    quit_rent_bill_number: string,
    current_rate_of_quit_rent: string,
    quit_rent_bill_payment_date: string,
    assessment_bill_number: string,
    current_rate_Of_assesment: string,
    assessment_bill_payment_date: string,
    lease_expired_date: string,
    remarks: string,
    parent_location_name: string,
    main_contact_name: string,
    maintenance_manager_nam: string,
    planner_name: string,
    submitted_datetime: string,
    created_date: string,
    modified_date: string,
  ) {
    this.id = id;
    this.location_type = location_type;
    this.locatin_disposition = locatin_disposition;
    this.Bo = Bo;
    this.description = description;
    this.parent_loc_or_org = parent_loc_or_org;
    this.work_request_approval_profile = work_request_approval_profile;
    this.owning_org = owning_org;
    this.building = building;
    this.room = room;
    this.position = position;
    this.country = country;
    this.address_1 = address_1;
    this.address_2 = address_2;
    this.country = country;
    this.address_3 = address_3;
    this.cross_street = cross_street;
    this.city = city;
    this.suburb = suburb;
    this.state = state;
    this.postal = postal;
    this.location_class = location_class;
    this.main_contact = main_contact;
    this.maintenance_manager = maintenance_manager;
    this.planner = planner;
    this.cost_center = cost_center;
    this.rcm_system = rcm_system;
    this.environmental_rating = environmental_rating;
    this.service_condition = service_condition;
    this.duty_cycle = duty_cycle;
    this.backlog_group = backlog_group;
    this.run_to_failure = run_to_failure;
    this.breaker = breaker;
    this.runtime_source = runtime_source;
    this.tag_number = tag_number;
    this.site_location = site_location;
    this.point_id = point_id;
    this.service_area = service_area;
    this.latitude = latitude;
    this.longitude = longitude;
    this.asset_criticality = asset_criticality;
    this.criticality_reason = criticality_reason;
    this.gis_id = gis_id;
    this.connected_to_location_id = connected_to_location_id;
    this.water_asset_category = water_asset_category;
    this.land_asset_status = land_asset_status;
    this.land_ownership_number = land_ownership_number;
    this.take_over_date = take_over_date;
    this.take_over_date_source_qt11 = take_over_date_source_qt11;
    this.take_over_date_source_ccc = take_over_date_source_ccc;
    this.land_area_acre = land_area_acre;
    this.plan_certified_number = plan_certified_number;
    this.plan_pre_computation_number = plan_pre_computation_number;
    this.plan_as_built_number = plan_as_built_number;
    this.quit_rent_bill_number = quit_rent_bill_number;
    this.current_rate_of_quit_rent = current_rate_of_quit_rent;
    this.quit_rent_bill_payment_date = quit_rent_bill_payment_date;
    this.assessment_bill_number = assessment_bill_number;
    this.current_rate_Of_assesment = current_rate_Of_assesment;
    this.assessment_bill_payment_date = assessment_bill_payment_date;
    this.lease_expired_date = lease_expired_date;
    this.remarks = remarks;
    this.parent_location_name = parent_location_name;
    this.main_contact_name = main_contact_name;
    this.maintenance_manager_nam = maintenance_manager_nam;
    this.planner_name = planner_name;
    this.submitted_datetime = submitted_datetime;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
