import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
// tenants
import { TenantsComponent } from '@app/tenants/tenants.component';
import { CreateTenantDialogComponent } from './tenants/create-tenant/create-tenant-dialog.component';
import { EditTenantDialogComponent } from './tenants/edit-tenant/edit-tenant-dialog.component';
// roles
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleDialogComponent } from './roles/create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './roles/edit-role/edit-role-dialog.component';
// users
import { UsersComponent } from '@app/users/users.component';
import { CreateUserDialogComponent } from '@app/users/create-user/create-user-dialog.component';
import { EditUserDialogComponent } from '@app/users/edit-user/edit-user-dialog.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ResetPasswordDialogComponent } from './users/reset-password/reset-password.component';
// layout
import { HeaderComponent } from './layout/header.component';
import { HeaderLeftNavbarComponent } from './layout/header-left-navbar.component';
import { HeaderLanguageMenuComponent } from './layout/header-language-menu.component';
import { HeaderUserMenuComponent } from './layout/header-user-menu.component';
import { FooterComponent } from './layout/footer.component';
import { SidebarComponent } from './layout/sidebar.component';
import { SidebarLogoComponent } from './layout/sidebar-logo.component';
import { SidebarUserPanelComponent } from './layout/sidebar-user-panel.component';
import { SidebarMenuComponent } from './layout/sidebar-menu.component';


import { DataService } from '@shared/services/data.service';

//product groups
import { ProductGroupComponent } from './product-group/product-group.component';
import { ProductGroupServiceProxy } from './product-group/shared/services/product-group.service';
import { CreateProductGroupDialogComponent} from './product-group/create-product-group/create-product-group-dialog.component';
import { EditProductGroupDialogComponent } from './product-group/edit-product-group/edit-product-group-dialog.component';

//brands
import { BrandComponent } from './brand/brand.component';
import { BrandServiceProxy } from './brand/shared/services/brand.service';
import { CreateBrandDialogComponent} from './brand/create-brand/create-brand-dialog.component';
import { EditBrandDialogComponent } from './brand/edit-brand/edit-brand-dialog.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

//models
import { ModelServiceProxy} from './model/shared/services/model.service'
import { CreateModelDialogComponent} from './model/create-model/create-model-dialog.component';
import { EditModelDialogComponent} from './model/edit-model/edit-model-dialog.component';
import { ModelComponent } from './model/model.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    // tenants
    TenantsComponent,
    CreateTenantDialogComponent,
    EditTenantDialogComponent,
    // roles
    RolesComponent,
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    // users
    UsersComponent,
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ChangePasswordComponent,
    ResetPasswordDialogComponent,
    // layout
    HeaderComponent,
    HeaderLeftNavbarComponent,
    HeaderLanguageMenuComponent,
    HeaderUserMenuComponent,
    FooterComponent,
    SidebarComponent,
    SidebarLogoComponent,
    SidebarUserPanelComponent,
    SidebarMenuComponent,
    //product group
    ProductGroupComponent,
    CreateProductGroupDialogComponent,
    EditProductGroupDialogComponent,
    //brands
    BrandComponent,
    CreateBrandDialogComponent,
    EditBrandDialogComponent,
    //models
    ModelComponent,
    CreateModelDialogComponent,
    EditModelDialogComponent
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ModalModule.forChild(),
    BsDropdownModule,
    CollapseModule,
    TabsModule,
    AppRoutingModule,
    ServiceProxyModule,
    SharedModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    DataService,
    ProductGroupServiceProxy,
    BrandServiceProxy,
    ModelServiceProxy
  ],
  entryComponents: [
    // tenants
    CreateTenantDialogComponent,
    EditTenantDialogComponent,
    // roles
    CreateRoleDialogComponent,
    EditRoleDialogComponent,
    // users
    CreateUserDialogComponent,
    EditUserDialogComponent,
    ResetPasswordDialogComponent,
    //product groups
    CreateProductGroupDialogComponent,
    EditProductGroupDialogComponent,
    //brands
    CreateBrandDialogComponent,
    EditBrandDialogComponent,
    //models
    CreateModelDialogComponent,
    EditModelDialogComponent
  ],
})
export class AppModule { }
