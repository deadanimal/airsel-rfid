export class AssetsModel {
  public id: string;
  public asset_id: string;
  public asset_type: any;
  public transaction_type: boolean;
  public description: string;
  public bo: string;
  public bo_status: string;
  public owning_access_group: string;
  public effective_datetime: string;
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
  public bom_part_id: string;
  public attached_to_asset_id: string;
  public vehicle_identification_num: string;
  public license_number: number;
  public purchase_order_num: number;
  public location_id: number;
  public metrology_firmware: number;
  public nic_firmware: number;
  public configuration: number;
  public warranty_expiration_date: string;
  public warranty_detail: string;
  public vendor_part_no: string;
  public owning_access_group_nam: string;
  public submitted_datetime: string;
  public registered_datetime: any;
  public created_date: string;
  public modified_date: string;
  public measurement_types: boolean;
  public asset_attributes: number;

  constructor(
    id: string,
    asset_id: string,
    asset_type: any,
    transaction_type: boolean,
    description: string,
    bo: string,
    bo_status: string,
    owning_access_group: string,
    effective_datetime: string,
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
    bom_part_id: string,
    attached_to_asset_id: string,
    vehicle_identification_num: string,
    license_number: number,
    purchase_order_num: number,
    location_id: number,
    metrology_firmware: number,
    nic_firmware: number,
    configuration: number,
    warranty_expiration_date: string,
    warranty_detail: string,
    vendor_part_no: string,
    owning_access_group_nam: string,
    submitted_datetime: string,
    registered_datetime: any,
    created_date: string,
    modified_date: string,
    measurement_types: boolean,
    asset_attributes: number,
  ) {
    this.id = id;
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
    this.owning_access_group_nam = owning_access_group_nam;
    this.submitted_datetime = submitted_datetime;
    this.registered_datetime = registered_datetime;
    this.created_date = created_date;
    this.modified_date = modified_date;
    this.measurement_types = measurement_types;
    this.asset_attributes = asset_attributes;
  }
}
