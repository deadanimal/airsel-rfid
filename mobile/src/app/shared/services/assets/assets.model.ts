export class AssetsModel {
  public id: string;
  public name: string;
  public wams_asset_id: string;
  public rfid: string;
  public qrcode: string;
  public purchased_at: string;
  public is_active: boolean;
  public badge_number: string;
  public owning_department: string;
  public level_1: string;
  public level_2: string;
  public level_3: string;
  public level_4: string;
  public level_5: string;
  public level_6: string;
  public primary_category: string;
  public identity: string;
  public sub_category_1: string;
  public sub_category_2: string;
  public asset_description: string;
  public type_asset: string;
  public category: string;
  public acquired_by: string;
  public brand: string;
  public model_no: string;
  public size_capacity_1: number;
  public size_capacity_1_measurement: number;
  public size_capacity_2: number;
  public size_capacity_2_measurement: number;
  public size_capacity_3: number;
  public size_capacity_3_measurement: number;
  public parent_plate_number: string;
  public plate_number: string;
  public serial_number: string;
  public vendor_part_no: string;
  public scada_id: string;
  public external_id: string;
  public tag_number: string;
  public pallet_number: string;
  public installed_at: string;
  public rating: string;
  public status: string;
  public maintenance_specification: string;
  public bill_of_material: string;
  public measuring_type: string;
  public is_warranty: boolean;
  public warranty_period_actual: number;
  public warranty_vendor: string;
  public po_vendor: string;
  public po_cost: number;
  public location: string;
  public created_by: string;
  public modified_by: string;
  public approval_status: string;
  public approval_by: string;
  public approval_at: string;
  public reject_remark: string;
  public created_at: string;
  public modified_at: string;

  constructor(
    id: string,
    name: string,
    wams_asset_id: string,
    rfid: string,
    qrcode: string,
    purchased_at: string,
    is_active: boolean,
    badge_number: string,
    owning_department: string,
    level_1: string,
    level_2: string,
    level_3: string,
    level_4: string,
    level_5: string,
    level_6: string,
    primary_category: string,
    identity: string,
    sub_category_1: string,
    sub_category_2: string,
    asset_description: string,
    type_asset: string,
    category: string,
    acquired_by: string,
    brand: string,
    model_no: string,
    size_capacity_1: number,
    size_capacity_1_measurement: number,
    size_capacity_2: number,
    size_capacity_2_measurement: number,
    size_capacity_3: number,
    size_capacity_3_measurement: number,
    parent_plate_number: string,
    plate_number: string,
    serial_number: string,
    vendor_part_no: string,
    scada_id: string,
    external_id: string,
    tag_number: string,
    pallet_number: string,
    installed_at: string,
    rating: string,
    status: string,
    maintenance_specification: string,
    bill_of_material: string,
    measuring_type: string,
    is_warranty: boolean,
    warranty_period_actual: number,
    warranty_vendor: string,
    po_vendor: string,
    po_cost: number,
    location: string,
    created_by: string,
    modified_by: string,
    approval_status: string,
    approval_by: string,
    approval_at: string,
    reject_remark: string,
    created_at: string,
    modified_at: string
  ) {
    this.id = id;
    this.name = name;
    this.wams_asset_id = wams_asset_id;
    this.rfid = rfid;
    this.qrcode = qrcode;
    this.purchased_at = purchased_at;
    this.is_active = is_active;
    this.badge_number = badge_number;
    this.owning_department = owning_department;
    this.level_1 = level_1;
    this.level_2 = level_2;
    this.level_3 = level_3;
    this.level_4 = level_4;
    this.level_5 = level_5;
    this.level_6 = level_6;
    this.primary_category = primary_category;
    this.identity = identity;
    this.sub_category_1 = sub_category_1;
    this.sub_category_2 = sub_category_2;
    this.asset_description = asset_description;
    this.type_asset = type_asset;
    this.category = category;
    this.acquired_by = acquired_by;
    this.brand = brand;
    this.model_no = model_no;
    this.size_capacity_1 = size_capacity_1;
    this.size_capacity_1_measurement = size_capacity_1_measurement;
    this.size_capacity_2 = size_capacity_2;
    this.size_capacity_2_measurement = size_capacity_2_measurement;
    this.size_capacity_3 = size_capacity_3;
    this.size_capacity_3_measurement = size_capacity_3_measurement;
    this.parent_plate_number = parent_plate_number;
    this.plate_number = plate_number;
    this.serial_number = serial_number;
    this.vendor_part_no = vendor_part_no;
    this.scada_id = scada_id;
    this.external_id = external_id;
    this.tag_number = tag_number;
    this.pallet_number = pallet_number;
    this.installed_at = installed_at;
    this.rating = rating;
    this.status = status;
    this.maintenance_specification = maintenance_specification;
    this.bill_of_material = bill_of_material;
    this.measuring_type = measuring_type;
    this.is_warranty = is_warranty;
    this.warranty_period_actual = warranty_period_actual;
    this.warranty_vendor = warranty_vendor;
    this.po_vendor = po_vendor;
    this.po_cost = po_cost;
    this.location = location;
    this.created_by = created_by;
    this.modified_by = modified_by;
    this.approval_status = approval_status;
    this.approval_by = approval_by;
    this.approval_at = approval_at;
    this.reject_remark = reject_remark;
    this.created_at = created_at;
    this.modified_at = modified_at;
  }
}
