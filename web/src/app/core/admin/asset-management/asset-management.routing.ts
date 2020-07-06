import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { ApprovalComponent } from './approval/approval.component';
import { DatabaseComponent } from './database/database.component';

export const AssetManagementRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'registration',
                component: RegistrationComponent
            },
            {
                path: 'approval',
                component: ApprovalComponent
            },
            {
                path: 'database',
                component: DatabaseComponent
            }
        ]
    }
]