export class AssetMaintenanceSpecModel {

    public id: string;
    public maintenance_spec_cd: string
    public asset_type_cd: any
    public created_date: any
    public modified_date: any

    constructor(
        id: string,
        maintenance_spec_cd: string,
        asset_type_cd: any,
        created_date: any,
        modified_date: any,
    ) {
        this.id = id;
        this.maintenance_spec_cd = maintenance_spec_cd
        this.asset_type_cd = asset_type_cd
        this.created_date = created_date
        this.modified_date = modified_date
    }
}