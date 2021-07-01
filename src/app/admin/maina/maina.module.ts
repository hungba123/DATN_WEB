import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticalComponent } from './statistical/statistical.component';
import {RouterModule, Routes} from '@angular/router';
import { MainaComponent } from '../maina/maina.component';
import { UnitComponent } from './unit/unit.component';
import { FieldComponent } from './field/field.component';
import { ShareaModule } from '../sharea/sharea.module';
import { TypenewsComponent } from './typenews/typenews.component';
import { NewsComponent } from './news/news.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';
import { PositionComponent } from './position/position.component';
import { BackgroupComponent } from './backgroup/backgroup.component';
import { MissiontypeComponent } from './missiontype/missiontype.component';
import { TopicComponent } from './topic/topic.component';
import { ResearchactivitiesComponent } from './researchactivities/researchactivities.component';
import { DetailstopicComponent } from './detailstopic/detailstopic.component';
import { ErrorComponent } from '../commona/error/error.component';
import { AccessComponent } from '../commona/access/access.component';
import { LoginComponent } from '../commona/login/login.component';
import { AuthGuard } from '../../lib/auth.guard';
import { RoleGuard } from '../../lib/auth.guard';
import { OfficesComponent } from './offices/offices.component';
import { ChangepassComponent } from './changepass/changepass.component';
import { RoleComponent } from './role/role.component';
import { DepartmentComponent } from './department/department.component';
import { PropetyComponent } from './propety/propety.component';
import { StaffComponent } from './staff/staff.component';
import { EditbackgroupComponent } from './editbackgroup/editbackgroup.component';
import { EdituserComponent } from './edituser/edituser.component';
import { ErroraccesComponent } from './erroracces/erroracces.component';
import { MytopicComponent } from './mytopic/mytopic.component';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ReactiveFormsModule} from '@angular/forms';
import { NgSelect2Module } from 'ng-select2';
const mainaroutes:Routes = [
  {
    path: '',
    component: MainaComponent,
    children: [
      {
        path:'',
        component: StatisticalComponent
      },
      {
        path:'donvi',
        component: UnitComponent
      },
      {
        path: 'linhvuc',
        component:FieldComponent
      },
      {
        path: 'loaitintuc',
        component:TypenewsComponent
      },
      {
        path: 'tintuc',
        component:NewsComponent
      },
      {
        path:'thongke',
        component: StatisticalComponent,
      },
      {
        path:'detai',
        component: TopicComponent
      },
      {
        path:'chitietdetai/:id',
        component: DetailstopicComponent
      },
      {
        path:'error',
        component: ErrorComponent
      },
      {
        path: 'truycap',
        component: AccessComponent
      }, 
      {
        path: 'nguoidung',
        component: OfficesComponent
      },
      {
        path: 'doimk',
        component: ChangepassComponent
      },
      {
        path: 'hoatdongnghiencuu',
        component: ResearchactivitiesComponent
      },
      {
        path: 'chucvu',
        component: PositionComponent
      },
      {
        path: 'loainhiemvu',
        component: MissiontypeComponent
      },
      {
        path: 'phongban',
        component: DepartmentComponent
      },
      {
        path: 'sohuutritue',
        component: PropetyComponent
      },
      {
        path: 'nhom',
        component: RoleComponent
      },
      {
        path: 'nhanvien',
        component: StaffComponent,
        canActivate: [RoleGuard],
        data: {
          roles: [2]
        }
      },
      {
        path: 'lylich/:id',
        component: BackgroupComponent
      },
      {
        path: 'sualylich/:id',
        component: EditbackgroupComponent
      },{
        path: 'suataikhoan/:id',
        component: EdituserComponent
      },
      {
        path: 'loitruycap',
        component: ErroraccesComponent
      },
      {
        path: 'detaicuatui',
        component: MytopicComponent
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'dangnhap',
    component: LoginComponent
  }
]

@NgModule({
  declarations: [
    StatisticalComponent,
    MainaComponent, 
    UnitComponent, 
    FieldComponent, 
    TypenewsComponent, 
    NewsComponent, 
    PositionComponent, 
    BackgroupComponent, 
    MissiontypeComponent, 
    TopicComponent, 
    ResearchactivitiesComponent, 
    DetailstopicComponent, 
    LoginComponent, 
    AccessComponent, 
    OfficesComponent, 
    ChangepassComponent, 
    RoleComponent, 
    DepartmentComponent, 
    PropetyComponent, 
    StaffComponent, 
    EditbackgroupComponent,
    ErroraccesComponent,
    EdituserComponent,
    MytopicComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(mainaroutes),
    ShareaModule,
    RouterModule,
    CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelect2Module
  ]
})
export class MainaModule { }
