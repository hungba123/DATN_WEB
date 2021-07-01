import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes , RouterModule, Router} from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { ShareModule } from '../share/share.module';
import { ListNewComponent } from './list-new/list-new.component';
import { DetailNewComponent } from './detail-new/detail-new.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SearchComponent } from './search/search.component';
// import {  ErroruComponent } from '../common/erroru/erroru.component';
const appRouter : Routes=[
  {
    path: '',
    component: MainComponent,
    children:[
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'trangchu',
        component: HomeComponent
      },
      {
        path: 'lienhe',
        component: ContactComponent
      },
      {
        path: 'tongquat',
        component: AboutComponent
      },
      {
        path: 'chitiet/:id',
        component: DetailNewComponent
      },
      {
        path: 'danhsach:/id',
        component: ListNewComponent
      },
      {
        path: 'timkiem/:key',
        component:SearchComponent
      },
      // {
      //   path:'error',
      //   component: ErroruComponent
      // }
    ]  
  }
]
@NgModule({
  declarations: [
    HomeComponent,
    MainComponent,
    ListNewComponent,
    DetailNewComponent,
    AboutComponent,
    ContactComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(appRouter),
    ShareModule
  ]
})
export class MainModule { }
