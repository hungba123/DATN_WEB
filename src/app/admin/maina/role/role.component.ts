import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from 'src/app/lib/base-component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent extends BaseComponent implements OnInit {

  constructor(private injector:Injector) {
      super(injector)
   }
   item:any;
  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      this._api.get("api/role/get_role_all").subscribe(res=>{
        this.item = res;
      })
    })
  }

}
