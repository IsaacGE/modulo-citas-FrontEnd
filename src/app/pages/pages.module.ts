import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilePondModule, registerPlugin } from 'ngx-filepond';

import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
registerPlugin(FilePondPluginFileValidateType);

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { PAGES_ROUTES } from './pages.routes';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management/user-management.component';
import { ShowUserManagementComponent } from './user-management/show-user-management/show-user-management.component';
import { UpdateUserManagementComponent } from './user-management/update-user-management/update-user-management.component';
import { CitasComponent } from './citas/citas.component';






@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        AccountSettingsComponent,
        UserManagementComponent,
        ShowUserManagementComponent,
        UpdateUserManagementComponent,
        CitasComponent
    ],
    exports: [
        DashboardComponent,
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        CommonModule,
        Ng2SearchPipeModule,
        NgxPaginationModule,
        FilePondModule
    ]
})

export class PagesModule { }
