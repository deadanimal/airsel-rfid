export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    isCollapsed?: boolean;
    isCollapsing?: any;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    type?: string;
    collapse?: string;
    children?: ChildrenItems2[];
    isCollapsed?: boolean;
}
export interface ChildrenItems2 {
    path?: string;
    title?: string;
    type?: string;
}
//Menu Items
//Asset Management
export const AMROUTES: RouteInfo[] = [
  {
    path: '/ams/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'fas fa-desktop text-blue'
  },
  {
    path: '/ams/calendar',
    title: 'Calendar',
    type: 'link',
    icontype: 'far fa-calendar-alt text-blue'
  },
  {
    path: '/ams/asset-management',
    title: 'Asset Management',
    type: 'sub',
    icontype: 'fas fa-boxes text-blue',
    collapse: 'asset-management',
    isCollapsed: true,
    children: [
      { path: 'registration', title: 'Asset Registration', type: 'link' },
      { path: 'approval', title: 'Approval', type: 'link' },
      { path: 'database', title: 'Asset Database', type: 'link' }
    ]
  },
  {
    path: '/ams/big-data',
    title: 'Big Data Analytics',
    type: 'sub',
    icontype: 'far fa-chart-bar text-blue',
    isCollapsed: true,
    children: [
      { path: 'tableau', title: 'Tableau', type: 'link' },
      // { path: 'analytics', title: 'Analytics', type: 'link' },
      { path: 'work-activity', title: 'Work Activity', type: 'link' },
      { path: 'total-asset-registered', title: 'Total Asset Registered', type: 'link' },
      { path: 'asset-condition-score', title: 'Asset Condition Score', type: 'link' },
      { path: 'total-asset-maintenance', title: 'Total Asset Maintenance', type: 'link' },
    ]
  },
  {
    path: '/ams/utility',
    title: 'Utility',
    type: 'sub',
    icontype: 'fas fa-tools text-blue',
    collapse: 'utility',
    isCollapsed: true,
    children: [
      { path: 'user', title: 'User', type: 'link' },
      { path: 'user-privileges', title: 'User Privileges', type: 'link' },
      { path: 'audit-trail', title: 'Audit Trail', type: 'link' }
    ]
  }
];

//Inventory
export const IROUTES: RouteInfo[] = [
  {
    path: '/inv/inventory-dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'fas fa-desktop text-blue'
  },
  {
    path: '/inv/inventory',
    title: 'Inventory Management',
    type: 'sub',
    icontype: 'fas fa-dolly-flatbed text-blue',
    isCollapsed: true,
    children: [
      { path: 'stock-count', title: 'Stock Count', type: 'link' },
      { path: 'inbound', title: 'Stock Inbound', type: 'link' },
      { path: 'outbound', title: 'Stock Outbound', type: 'link' },
      { path: 'store-keeper', title: 'Storekeeper', type: 'link' },
      { path: 'store-codes', title: 'Store Codes', type: 'link' }
    ]
  },
  {
    path: '/inv/big-data',
    title: 'Big Data',
    type: 'sub',
    icontype: 'far fa-chart-bar text-blue',
    isCollapsed: true,
    children: [
      { path: 'tableau', title: 'Tableau', type: 'link' },
      { path: 'analytics', title: 'Analytics', type: 'link' },
    ]
  },
  {
    path: '/inv/utility',
    title: 'Utility',
    type: 'sub',
    icontype: 'fas fa-tools text-blue',
    collapse: 'utility',
    isCollapsed: true,
    children: [
      { path: 'user', title: 'User', type: 'link' },
      { path: 'user-privileges', title: 'User Privileges', type: 'link' },
      { path: 'audit-trail', title: 'Audit Trail', type: 'link' }
    ]
  }
]

/*
{
  path: '',
  title: '',
  type: 'link',
  icontype: ''
}
*/