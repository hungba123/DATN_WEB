import { Component, OnInit, Injector} from '@angular/core';
import { BaseComponent } from 'src/app/lib/base-component';

@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.css']
})
export class StatisticalComponent extends BaseComponent implements OnInit {

  constructor(private inj: Injector) { 
    super(inj)
  }
  user_:any;
  resport_user:any;
  ds_resport_user:any;
  ds_thongke_header:any;
  ds_thongke_search:any;
  ds_thongke_total:any;
  ds_thongke_detai_giahan:any;
  pageindex:any = 1;
  pagesize:any = 5;
  ngOnInit(): void {
    var date = 
    this.user_ = JSON.parse(localStorage.getItem('user'));
    this._route.params.subscribe(params=>{
      if(this.user_.role !=3){
        this._api.get("api/user/get_report_user").subscribe(res=>{
          this.resport_user = res;
          this.ds_resport_user = res.dsuser;
        })
        this._api.get("api/thongke/thongke_admin").subscribe(res=>{
          this.ds_thongke_header = res;
        })
        this._api.get("api/thongke/thongke_admin_luotxem_loaitt").subscribe(res=>{
          this.ds_thongke_search = res; 
        })
        this._api.get("api/thongke/thongke_detai_trongnam_hh").subscribe(res=>{
          this.ds_thongke_total = res;
        })
        this._api.get("api/thongke/thongke_detai_giahan?pageindex="+this.pageindex+"&&pagesize="+this.pagesize).subscribe(res=>{
          this.ds_thongke_detai_giahan = res;
        })
      }
    })
  }

}
