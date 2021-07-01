import { Component, OnInit, Injector} from '@angular/core';
import {Router} from '@angular/router';
import { BaseComponent } from 'src/app/lib/base-component';

@Component({
  selector: 'app-navbara',
  templateUrl: './navbara.component.html',
  styleUrls: ['./navbara.component.css']
})
export class NavbaraComponent extends BaseComponent implements OnInit {

  constructor(private injector: Injector, private _rou:Router) {
    super(injector);
   }
  item:any;
  ngOnInit(): void {
    this.item = JSON.parse(localStorage.getItem('user'))
  }
  logout(){
    localStorage.removeItem('user');
    this._rou.navigated['/admin/dangnhap'];
  }
}
