export class UsersModel {
    public name: string;
    public staff_id: string;
    public nric: string;
    public mobile_number: string;
    public user_type: any;
    public username: string;
    public is_active: boolean;

    constructor(
        name: string,
        staff_id: string,
        nric: string,
        mobile_number: string,
        user_type: any,
        username: string,
        is_active: boolean
    ) {
        this.name = name;
        this.staff_id = staff_id;
        this.nric = nric;
        this.mobile_number = mobile_number;
        this.user_type = user_type;
        this.username = username;
        this.is_active = is_active;
    }
}