export class AssetsModel {
    public id: string;
    public name: string;
    public purchased_date: any;
    public status: any;
    public created_date: any;
    public modified_date: any;
    public vendor: any;
    public zone: any;

    constructor(
        id: string,
        name: string,
        purchased_date: any,
        status: any,
        created_date: any,
        modified_date: any,
        vendor: any,
        zone: any
    ) {
        this.id = id;
        this.name = name;
        this.purchased_date = purchased_date;
        this.status = status;
        this.created_date = created_date;
        this.modified_date = modified_date;
        this.vendor = vendor;
        this.zone = zone;
    }
}