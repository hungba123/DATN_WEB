import { Component, OnInit, Injector} from '@angular/core';
import { BaseComponent } from 'src/app/lib/base-component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent implements OnInit {

  constructor(private injector:Injector) {
    super(injector)
  }
  itemslider: any;
  item_singer_new:any;
  itemNCKH: any;
  item_NCKH_new:any;
  item_TD:any;
  item_TB:any;
  item_TB_new:any;
  ngOnInit(): void {
    this._route.params.subscribe(params=>{   
      this._api.get("api/tintuc/get_tintuc_idloai_new").subscribe(res=>{
        this.itemslider = res;
      });
      this._api.get("api/tintuc/get_tintuc_idloai_singer_new").subscribe(res=>{
        this.item_singer_new = res;
      });
      this._api.get("api/tintuc/get_tintuc_idloai_pagesize?id="+4+"&&pagesize="+3).subscribe(res=>{
        this.itemNCKH = res;
      });
      this._api.get("api/tintuc/get_tintuc_idloai_singer?id="+4).subscribe(res=>{
        this.item_NCKH_new = res;
      });
      this._api.get("api/tintuc/get_tintuc_idloai_pagesize?id="+2+"&&pagesize="+8).subscribe(res=>{
        this.item_TD = res;
        console.log(this.item_TD);
      });
      this._api.get("api/tintuc/get_tintuc_idloai_pagesize?id="+1004+"&&pagesize="+3).subscribe(res=>{
        this.item_TB = res;
        console.log(this.item_TB);
      });
      this._api.get("api/tintuc/get_tintuc_idloai_singer?id="+1004).subscribe(res=>{
        this.item_TB_new = res;
      });
    })
  }

}
