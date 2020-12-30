import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { ApprovalComponent } from './approval/approval.component';
import { DatabaseComponent } from './database/database.component';
import { ProcessingComponent } from './processing/processing.component';
import { RejectedComponent } from './rejected/rejected.component';
import { RegisteredComponent } from './registered/registered.component';
import { NewComponent } from './new/new.component';
import { ProcessedComponent } from './processed/processed.component';
import { BadgeNoComponent } from './badge-no/badge-no.component';


export const AssetManagementRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'registration',
                component: RegistrationComponent
            },
            {
                path: 'processing',
                component: ProcessingComponent
            },
            {
                path: 'approval',
                component: ApprovalComponent
            },
            {
                path: 'rejected',
                component: RejectedComponent
            },
            {
                path: 'registered',
                component: RegisteredComponent
            },
            {
                path: 'database',
                component: RegisteredComponent
            },
            {
                path: "badge-no",
                component: BadgeNoComponent
            },
            {
                path: 'register',
                children: [
                    {
                        path: 'new',
                        component: NewComponent
                    },
                    {
                        path: 'processed',
                        component: ProcessedComponent
                    },
                ]
            },
            {
                path: 'asset-database',
                children: [
                    {
                        path: 'processing',
                        component: ProcessingComponent
                    },
                    {
                        path: 'registered',
                        component: RegisteredComponent
                    },
                    {
                        path: 'rejected',
                        component: RejectedComponent
                    },
                ]
            }
        ]
    }
]