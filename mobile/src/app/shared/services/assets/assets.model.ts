export class AssetsModel {
  public id: string;
  // public name: string;
  // public wams_asset_id: string;
  // public rfid: string;
  // public qrcode: string;
  // public purchased_at: string;
  // public is_active: boolean;
  // public badge_no: string;
  // public owning_department: string;
  // public level_1: string;
  // public level_2: string;
  // public level_3: string;
  // public level_4: string;
  // public level_5: string;
  // public level_6: string;
  // public primary_category: string;
  // public identity: string;
  // public sub_category_1: string;
  // public sub_category_2: string;
  // public description: string;
  // public type_asset: string;
  // public category: string;
  // public acquired_by: string;
  // public brand: string;
  // public model_no: string;
  // public size_capacity_1: number;
  // public size_capacity_1_measurement: number;
  // public size_capacity_2: number;
  // public size_capacity_2_measurement: number;
  // public size_capacity_3: number;
  // public size_capacity_3_measurement: number;
  // public parent_plate_number: string;
  // public plate_number: string;
  // public serial_number: string;
  // public vendor_part_no: string;
  // public scada_id: string;
  // public external_id: string;
  // public tag_number: string;
  // public pallet_number: string;
  // public installed_at: string;
  // public rating: string;
  // public status: string;
  // public maintenance_specification: string;
  // public bill_of_material: string;
  // public measuring_type: string;
  // public is_warranty: boolean;
  // public warranty_period_actual: number;
  // public warranty_vendor: string;
  // public po_vendor: string;
  // public po_cost: number;
  // public location: string;
  // public created_by: string;
  // public modified_by: string;
  // public approval_status: string;
  // public approval_by: string;
  // public approval_at: string;
  // public reject_remark: string;
  // public created_at: string;
  // public modified_at: string;
  // public asset_id: string;
  // public node_id: string;
  // public measurement_types: []

  public asset_id: string;
  public asset_type: string;
  public transaction_type: string;
  public description: string;
  public bo: string;
  public bo_status: string;
  public owning_access_group: string;
  public effective_datetime: any;
  public node_id: string;
  public badge_no: string;
  public serial_no: string;
  public pallet_no: string;
  public handed_over_asset: string;
  public fixed_asset_no: string;
  public scada_id: string;
  public condition_rating: string;
  public condifence_rating: string;
  public maintenance_specification: string;
  public measurement_types: [];
  public bom_part_id: string;
  public attached_to_asset_id: string;
  public vehicle_identification_num: string;
  public license_number: string;
  public purchase_order_num: string;
  public location_id: string;
  public metrology_firmware: string;
  public nic_firmware: string;
  public configuration: string;
  public warranty_expiration_date: any;
  public warranty_detail: string;
  public vendor_part_no: string;
  public asset_attributes: [];
  public owning_access_group_nam: string;
  public specification: string;
  public hex_code: string;
  public field_1: string;
  public field_2: string;
  public submitted_datetime: any;
  public registered_datetime: any;
  public created_date: any;
  public modified_date: any;

  constructor(
    id: string,
    // name: string,
    // wams_asset_id: string,
    // rfid: string,
    // qrcode: string,
    // purchased_at: string,
    // is_active: boolean,
    // badge_no: string,
    // owning_department: string,
    // level_1: string,
    // level_2: string,
    // level_3: string,
    // level_4: string,
    // level_5: string,
    // level_6: string,
    // primary_category: string,
    // identity: string,
    // sub_category_1: string,
    // sub_category_2: string,
    // description: string,
    // type_asset: string,
    // category: string,
    // acquired_by: string,
    // brand: string,
    // model_no: string,
    // size_capacity_1: number,
    // size_capacity_1_measurement: number,
    // size_capacity_2: number,
    // size_capacity_2_measurement: number,
    // size_capacity_3: number,
    // size_capacity_3_measurement: number,
    // parent_plate_number: string,
    // plate_number: string,
    // serial_number: string,
    // vendor_part_no: string,
    // scada_id: string,
    // external_id: string,
    // tag_number: string,
    // pallet_number: string,
    // installed_at: string,
    // rating: string,
    // status: string,
    // maintenance_specification: string,
    // bill_of_material: string,
    // measuring_type: string,
    // is_warranty: boolean,
    // warranty_period_actual: number,
    // warranty_vendor: string,
    // po_vendor: string,
    // po_cost: number,
    // location: string,
    // created_by: string,
    // modified_by: string,
    // approval_status: string,
    // approval_by: string,
    // approval_at: string,
    // reject_remark: string,
    // created_at: string,
    // modified_at: string,
    // asset_id: string,
    // node_id: string,
    // measurement_types: []

    asset_id: string,
    asset_type: string,
    transaction_type: string,
    description: string,
    bo: string,
    bo_status: string,
    owning_access_group: string,
    effective_datetime: any,
    node_id: string,
    badge_no: string,
    serial_no: string,
    pallet_no: string,
    handed_over_asset: string,
    fixed_asset_no: string,
    scada_id: string,
    condition_rating: string,
    condifence_rating: string,
    maintenance_specification: string,
    measurement_types: [],
    bom_part_id: string,
    attached_to_asset_id: string,
    vehicle_identification_num: string,
    license_number: string,
    purchase_order_num: string,
    location_id: string,
    metrology_firmware: string,
    nic_firmware: string,
    configuration: string,
    warranty_expiration_date: any,
    warranty_detail: string,
    vendor_part_no: string,
    asset_attributes: [],
    owning_access_group_nam: string,
    specification: string,
    hex_code: string,
    field_1: string,
    field_2: string,
    submitted_datetime: any,
    registered_datetime: any,
    created_date: any,
    modified_date: any
  ) {
    this.id = id;
    // this.name = name;
    // this.wams_asset_id = wams_asset_id;
    // this.rfid = rfid;
    // this.qrcode = qrcode;
    // this.purchased_at = purchased_at;
    // this.is_active = is_active;
    // this.badge_no = badge_no;
    // this.owning_department = owning_department;
    // this.level_1 = level_1;
    // this.level_2 = level_2;
    // this.level_3 = level_3;
    // this.level_4 = level_4;
    // this.level_5 = level_5;
    // this.level_6 = level_6;
    // this.primary_category = primary_category;
    // this.identity = identity;
    // this.sub_category_1 = sub_category_1;
    // this.sub_category_2 = sub_category_2;
    // this.description = description;
    // this.type_asset = type_asset;
    // this.category = category;
    // this.acquired_by = acquired_by;
    // this.brand = brand;
    // this.model_no = model_no;
    // this.size_capacity_1 = size_capacity_1;
    // this.size_capacity_1_measurement = size_capacity_1_measurement;
    // this.size_capacity_2 = size_capacity_2;
    // this.size_capacity_2_measurement = size_capacity_2_measurement;
    // this.size_capacity_3 = size_capacity_3;
    // this.size_capacity_3_measurement = size_capacity_3_measurement;
    // this.parent_plate_number = parent_plate_number;
    // this.plate_number = plate_number;
    // this.serial_number = serial_number;
    // this.vendor_part_no = vendor_part_no;
    // this.scada_id = scada_id;
    // this.external_id = external_id;
    // this.tag_number = tag_number;
    // this.pallet_number = pallet_number;
    // this.installed_at = installed_at;
    // this.rating = rating;
    // this.status = status;
    // this.maintenance_specification = maintenance_specification;
    // this.bill_of_material = bill_of_material;
    // this.measuring_type = measuring_type;
    // this.is_warranty = is_warranty;
    // this.warranty_period_actual = warranty_period_actual;
    // this.warranty_vendor = warranty_vendor;
    // this.po_vendor = po_vendor;
    // this.po_cost = po_cost;
    // this.location = location;
    // this.created_by = created_by;
    // this.modified_by = modified_by;
    // this.approval_status = approval_status;
    // this.approval_by = approval_by;
    // this.approval_at = approval_at;
    // this.reject_remark = reject_remark;
    // this.created_at = created_at;
    // this.modified_at = modified_at;
    // this.asset_id = asset_id;
    // this.node_id = node_id;
    // this.measurement_types = measurement_types;

    this.asset_id = asset_id;
    this.asset_type = asset_type;
    this.transaction_type = transaction_type;
    this.description = description;
    this.bo = bo;
    this.bo_status = bo_status;
    this.owning_access_group = owning_access_group;
    this.effective_datetime = effective_datetime;
    this.node_id = node_id;
    this.badge_no = badge_no;
    this.serial_no = serial_no;
    this.pallet_no = pallet_no;
    this.handed_over_asset = handed_over_asset;
    this.fixed_asset_no = fixed_asset_no;
    this.scada_id = scada_id;
    this.condition_rating = condition_rating;
    this.condifence_rating = condifence_rating;
    this.maintenance_specification = maintenance_specification;
    this.measurement_types = measurement_types;
    this.bom_part_id = bom_part_id;
    this.attached_to_asset_id = attached_to_asset_id;
    this.vehicle_identification_num = vehicle_identification_num;
    this.license_number = license_number;
    this.purchase_order_num = purchase_order_num;
    this.location_id = location_id;
    this.metrology_firmware = metrology_firmware;
    this.nic_firmware = nic_firmware;
    this.configuration = configuration;
    this.warranty_expiration_date = warranty_expiration_date;
    this.warranty_detail = warranty_detail;
    this.vendor_part_no = vendor_part_no;
    this.asset_attributes = asset_attributes;
    this.owning_access_group_nam = owning_access_group_nam;
    this.specification = specification;
    this.hex_code = hex_code;
    this.field_1 = field_1;
    this.field_2 = field_2;
    this.submitted_datetime = submitted_datetime;
    this.registered_datetime = registered_datetime;
    this.created_date = created_date;
    this.modified_date = modified_date;
  }
}
