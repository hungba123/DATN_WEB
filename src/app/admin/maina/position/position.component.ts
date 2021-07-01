import { Component, OnInit, Injector, ViewChild} from '@angular/core';
import { BaseComponent } from 'src/app/lib/base-component';
import Swal from 'sweetalert2';
declare var $ : any;
@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent extends BaseComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  item:any;
  them:any = true;
  itemsinger:any;
  tenchucvu:any;
  dieukien:any;
  dinhmuc:any;
  ghichu:any;
  pageindex: any = 1;
  pagesize: any = 5;
  ser:any="";
  constructor(private injector:Injector) { 
    super(injector)
  }
  ngOnInit(): void {
    this._route.params.subscribe(params=>{   
      this._api.get("api/chucvu/get_chucvu_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search=").subscribe(res=>{
        this.item = res;
        console.log(this.item);
      });
    })
  }
  search_(){
    this._api.get("api/chucvu/get_chucvu_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search="+this.ser).subscribe(res=>{
      this.item = res;
      console.log(this.item);
    });
  }
  onpagination_(i){
    var a = Math.ceil(this.item.total / this.pagesize);
    if(i<1){
      this.pageindex = 1;
    }
    else{
      if(i>a){
        this.pageindex = a;
      }
      else{
        this.pageindex = i;
      }
    }  
    this._api.get("api/chucvu/get_chucvu_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search="+this.ser).subscribe(res=>{
      this.item = res;
    });
  }
  pagination(tong){
    let a:number[]= [];
    var total = Math.ceil(tong/this.pagesize);
    for(var i = 1; i <= total; i++){
      a.push(i);
    }
    return a;
  }
  preup_(search){
    this.ser = search;
  }
  create(){
    this.them = true;
    this.tenchucvu = "";
    this.dieukien = "";
    this.dinhmuc = "";
    this.ghichu = "";
  }
  loaddata(){
    this._api.get("api/chucvu/get_chucvu_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search="+this.ser).subscribe(res=>{
      this.item = res;
      console.log(this.item);
    })
  }
  edit(id){
    this.them = false;
    this._api.get("api/chucvu/get_chucvu_id/"+id).subscribe(res=>{
      this.itemsinger = res;
      this.tenchucvu = this.itemsinger.tenchucvu;
      this.dieukien = this.itemsinger.dieukien;
      this.dinhmuc = this.itemsinger.dinhmuc;
      this.ghichu = this.itemsinger.ghichu;
      console.log(this.itemsinger);
    });
  }
  exec(cv,dk,dm,gc){
    var Formdata = {
      tenchucvu: cv,
      dieukien: dk,
      dinhmuc: parseInt(dm),
      ghichu: gc
    }
    if(this.them){
      this._api.post("api/chucvu/create_chucvu",Formdata).subscribe(res=>{
        if(res){           
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Thêm thành công',
            showConfirmButton: false,
            timer: 1500
          });         
          this.loaddata();
          this.closebutton.nativeElement.click();
        }
        else{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Thêm thất bại',
            showConfirmButton: false,
            timer: 1500
          })
        }
      });
    }
    else{
      this._api.put("api/chucvu/edit_chucvu/"+this.itemsinger.id,Formdata).subscribe(res=>{
        if(res){           
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Sửa thành công',
            showConfirmButton: false,
            timer: 1500
          });
          this.loaddata();
          this.closebutton.nativeElement.click();
        }
        else{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Sửa thất bại',
            showConfirmButton: false,
            timer: 1500
          })
        }
      });
    }
  }
  delete_(id){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Bạn có chắc không?',
      text: "Bạn sẽ không thể hoàn nguyên điều này!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có, xóa nó!',
      cancelButtonText: 'Không, hủy bỏ!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._api.delete("api/chucvu/delete_chucvu/"+id).subscribe(res=>{
          if(res){           
            swalWithBootstrapButtons.fire(
              'Đã xóa!',
              'Tệp của bạn đã bị xóa.',
              'success'
            );
            this._api.get("api/chucvu/get_chucvu_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search=").subscribe(res=>{
              if(res.total%5==0){
                this.pageindex = this.pageindex -1;
                this._api.get("api/chucvu/get_chucvu_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search=").subscribe(res=>{
                  this.item = res;
                })
              }
              else{
                this.item = res;
              }
            })
          }
          else{
            swalWithBootstrapButtons.fire(
              'Thất bại!',
              'Tệp của bạn chưa xóa.',
              'error'
            );
          }
        });
        
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Đã hủy',
          'Tệp của bạn an toàn :)',
          'error'
        );
      }
    })
  }
}
