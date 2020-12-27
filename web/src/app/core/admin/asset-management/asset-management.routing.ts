import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { ApprovalComponent } from './approval/approval.component';
import { DatabaseComponent } from './database/database.component';
import { ProcessingComponent } from './processing/processing.component';
import { RejectedComponent } from './rejected/rejected.component';
import { RegisteredComponent } from './registered/registered.component';

export const AssetManagementRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'registration',
                component: RegistrationComponent
            },
            {
                path: 'database',
                children: [
                    {
                        path: 'processing',
                        component: ProcessingComponent
                    },
                    {
                        path: 'rejected',
                        component: RejectedComponent
                    },
                    {
                        path: 'registered',
                        component: RegisteredComponent
                    },
                ]
            }
        ]
    }
]