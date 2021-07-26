export const UserData = [
    {
        id: 1,
        username: 'qmcdougald0',
        email: 'dholborn0@bbc.co.uk',
        status: 'True',
        user_type: 'Headquarter',
        last_login: '14/05/2019'
    },
    {
        id: 2,
        username: 'ewhitworth1',
        email: 'agoodwell1@sun.com',
        status: 'True',
        user_type: 'Headquarter',
        last_login: '21/04/2020'
    },
    {
        id: 3,
        username: 'mantowski2',
        email: 'cpaolazzi2@furl.net',
        status: 'False',
        user_type: 'Branch',
        last_login: '04/11/2019'
    },
    {
        id: 4,
        username: 'toxlee3',
        email: 'dfargie3@vistaprint.com',
        status: 'False',
        user_type: 'Branch',
        last_login: '04/09/2019'
    },
    {
        id: 5,
        username: 'tmcguirk4',
        email: 'mwarrack4@hugedomains.com',
        status: 'True',
        user_type: 'Admin',
        last_login: '12/04/2020'
    }
]

export const UserPrivilegeData = [
    {
        module: 'Utility',
        user_type: 'Branch',
        access: 'True'
    },
    {
        module: 'Asset',
        user_type: 'Admin',
        access: 'False'
    },
    {
        module: 'Utility',
        user_type: 'Admin',
        access: 'True'
    },
    {
        module: 'Inventory',
        user_type: 'Branch',
        access: 'False'
    },
    {
        module: 'Inventory',
        user_type: 'Branch',
        access: 'True'
    }
]

export const AuditTrailData = [
    {
        module: 'Calendar',
        action: 'Update',
        username: 'Iwan Affendi',
        date: '12/12/2019',
        time: '12:00 P.M'
    },
    {
        module: 'Inventory',
        action: 'Add',
        username: 'Redzuan Fikri',
        date: '11/12/2019',
        time: '08:00 A.M'
    },
    {
        module: 'Asset',
        action: 'Update',
        username: 'Iwan Affendi',
        date: '10/12/2019',
        time: '10:00 A.M'
    },
    {
        module: 'Asset',
        action: 'Delete',
        username: 'Redzuan Fikri',
        date: '09/12/2019',
        time: '09:30 A.M'
    },
    {
        module: 'Asset',
        action: 'Add',
        username: 'Imran Ilyas',
        date: '08/12/2019',
        time: '10:15 A.M'
    }
]