export class AssetsModel {
  public id: string;
  public name: string;
  public purchased_at: any;
  public is_active: boolean;
  public owned_department: string;
  public hierarchy_level_1: string;
  public hierarchy_level_2: string;
  public hierarchy_level_3: string;
  public hierarchy_level_4: string;
  public hierarchy_level_5: string;
  public hierarchy_level_6: string;
  public type_asset: string;
  public category: string;
  public category_extra: string;
  public is_hand_over: string;
  public is_procured: string;
  public internal_detail_indentity: string;
  public primary_category: string;
  public grouping_sub_category_1: string;
  public grouping_sub_category_2: string;
  public brand: string;
  public model_no: string;
  public msize_capcity_1: number;
  public msize_capcity_1_measurement: number;
  public msize_capcity_2: number;
  public msize_capcity_2_measurement: number;
  public msize_capcity_3: number;
  public msize_capcity_3_measurement: number;
  public parent_plate_number: string;
  public plate_number: string;
  public scada_id: string;
  public external_id: string;
  public tag_number: string;
  public pallet_number: string;
  public installed_at: any;
  public rating: string;
  public status: string;
  public maintenance_specification: string;
  public bill_of_material: string;
  public measuring_type: string;
  public is_warranty: boolean;
  public warranty_period_actual: number;
  public po_cost: number;
  public created_at: any;
  public modified_at: any;
  public warranty_vendor: any;
  public po_vendor: any;

  constructor(
    id: string,
    name: string,
    purchased_at: any,
    is_active: boolean,
    owned_department: string,
    hierarchy_level_1: string,
    hierarchy_level_2: string,
    hierarchy_level_3: string,
    hierarchy_level_4: string,
    hierarchy_level_5: string,
    hierarchy_level_6: string,
    type_asset: string,
    category: string,
    category_extra: string,
    is_hand_over: string,
    is_procured: string,
    internal_detail_indentity: string,
    primary_category: string,
    grouping_sub_category_1: string,
    grouping_sub_category_2: string,
    brand: string,
    model_no: string,
    msize_capcity_1: number,
    msize_capcity_1_measurement: number,
    msize_capcity_2: number,
    msize_capcity_2_measurement: number,
    msize_capcity_3: number,
    msize_capcity_3_measurement: number,
    parent_plate_number: string,
    plate_number: string,
    scada_id: string,
    external_id: string,
    tag_number: string,
    pallet_number: string,
    installed_at: any,
    rating: string,
    status: string,
    maintenance_specification: string,
    bill_of_material: string,
    measuring_type: string,
    is_warranty: boolean,
    warranty_period_actual: number,
    po_cost: number,
    created_at: any,
    modified_at: any,
    warranty_vendor: any,
    po_vendor: any
  ) {
    this.id = id;
    this.name = name;
    this.purchased_at = purchased_at;
    this.is_active = is_active;
    this.owned_department = owned_department;
    this.hierarchy_level_1 = hierarchy_level_1;
    this.hierarchy_level_2 = hierarchy_level_2;
    this.hierarchy_level_3 = hierarchy_level_3;
    this.hierarchy_level_4 = hierarchy_level_4;
    this.hierarchy_level_5 = hierarchy_level_5;
    this.hierarchy_level_6 = hierarchy_level_6;
    this.type_asset = type_asset;
    this.category = category;
    this.category_extra = category_extra;
    this.is_hand_over = is_hand_over;
    this.is_procured = is_procured;
    this.internal_detail_indentity = internal_detail_indentity;
    this.primary_category = primary_category;
    this.grouping_sub_category_1 = grouping_sub_category_1;
    this.grouping_sub_category_2 = grouping_sub_category_2;
    this.brand = brand;
    this.model_no = model_no;
    this.msize_capcity_1 = msize_capcity_1;
    this.msize_capcity_1_measurement = msize_capcity_1_measurement;
    this.msize_capcity_2 = msize_capcity_2;
    this.msize_capcity_2_measurement = msize_capcity_2_measurement;
    this.msize_capcity_3 = msize_capcity_3;
    this.msize_capcity_3_measurement = msize_capcity_3_measurement;
    this.parent_plate_number = parent_plate_number;
    this.plate_number = plate_number;
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
    this.po_cost = po_cost;
    this.created_at = created_at;
    this.modified_at = modified_at;
    this.warranty_vendor = warranty_vendor;
    this.po_vendor = po_vendor;
  }
}
