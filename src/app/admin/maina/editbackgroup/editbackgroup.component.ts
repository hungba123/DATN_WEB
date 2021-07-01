import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from 'src/app/lib/base-component';
@Component({
  selector: 'app-editbackgroup',
  templateUrl: './editbackgroup.component.html',
  styleUrls: ['./editbackgroup.component.css']
})
export class EditbackgroupComponent extends BaseComponent implements OnInit {

  item:any;
  itemct:any;
  itembd:any;
  itemll:any;
  itemchutri:any;
  itemxuatban:any;
  itembcxuatban:any;
  itemtt:any;
  id:any;
  time:any;
  constructor(private injector: Injector) { 
    super(injector)
  }

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      this.id = params["id"];
      this._api.get("api/nhanvien/get_nhanvien_id/"+this.id).subscribe(res=>{
        this.item = res;
      })
      this._api.get("api/boiduong/get_boiduong_idnv/"+this.id).subscribe(res=>{
        this.itembd = res;
        console.log(res);
      })
      this._api.get("api/congtac/get_congtac_idnv/"+this.id).subscribe(res=>{
        this.itemct = res;
        console.log(res);
      })
      this._api.get("api/lylich/get_lylich_id/"+this.id).subscribe(res=>{
        this.itemll = res;
      })
      this._api.get("api/detai/get_detai_nckh/"+this.id).subscribe(res=>{
        this.itemchutri = res;
      })
      this._api.get("api/detai/get_detai_nckh2/"+this.id).subscribe(res=>{
        this.itemxuatban = res;
      })
      this._api.get("api/detai/get_detai_nckh6/"+this.id).subscribe(res=>{
        this.itembcxuatban = res;
      })
      this._api.get("api/detai/get_detai_nckh5/"+this.id).subscribe(res=>{
        this.itemtt = res;
      })
      this.time = new Date();
    })
  }
  displaycbv(Capbv){
    if(Capbv==1){
      return "Xuất sắc";
    }
    if(Capbv==2){
      return "Giỏi";
    }
    if(Capbv==3){
      return "Khá";
    }
    if(Capbv==4){
      return "Trung bình";
    }
    if(Capbv==5){
      return "Kém";
    }
  }
  displaykq(Capbv){
    if(Capbv==1){
      return "Bộ";
    }
    if(Capbv==2){
      return "Trường";
    }
    if(Capbv==3){
      return "Nhà nước";
    }
  }
}
