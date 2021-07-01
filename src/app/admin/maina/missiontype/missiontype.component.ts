import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from 'src/app/lib/base-component';
import Swal from 'sweetalert2';
declare var $ : any;
@Component({
  selector: 'app-missiontype',
  templateUrl: './missiontype.component.html',
  styleUrls: ['./missiontype.component.css']
})
export class MissiontypeComponent extends BaseComponent implements OnInit {

  constructor(private injector:Injector) {
    super(injector)
   }
   tenloainv:any;
   ghichu:any;
   c:any;
   pageindex: any = 1;
   pagesize: any = 5;
   ser:any;
  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      this._api.get("api/loainhiemvu/get_loainhiemvu_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search=").subscribe(res=>{
        this.item = res;
        console.log(this.item);
      })
    })
  }
  them:any;
  itemsinger:any;
  item:any;
  search_(){
    this._api.get("api/loainhiemvu/get_loainhiemvu_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search="+this.ser).subscribe(res=>{
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
    this._api.get("api/loainhiemvu/get_loainhiemvu_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search=").subscribe(res=>{
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
  edit(id){
    this.them = false;
    this._api.get("api/loainhiemvu/get_loainhiemvu_id/"+id).subscribe(res=>{
      this.itemsinger = res;
      this.tenloainv = this.itemsinger.tenloainv;
      this.ghichu = this.itemsinger.ghichu;
      this.c = this.itemsinger.c;
    });
  }
  create(){
    this.them = true;
    this.tenloainv = "";
    this.ghichu ="";
    this.c ="";
  }
  loaddata(){
    this._api.get("api/loainhiemvu/get_loainhiemvu_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search=").subscribe(res=>{
      this.item = res;
      console.log(this.item);
    })
  }
  exec(dv,tl,gc){
    var Formdata = {
      tenloainv: dv,
      ghichu: gc,
      c: parseInt(tl)
    }
    if(this.them){
      this._api.post("api/loainhiemvu/create_loainhiemvu",Formdata).subscribe(res=>{
        if(res){           
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Thêm thành công',
            showConfirmButton: false,
            timer: 1500
          });         
          this.loaddata();
          $("#exampleModal").modal('hide');
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
      this._api.put("api/loainhiemvu/edit_loainhiemvu/"+this.itemsinger.id,Formdata).subscribe(res=>{
        if(res){           
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Sửa thành công',
            showConfirmButton: false,
            timer: 1500
          });
          this.loaddata();
          $("#closeModel").click();
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
        this._api.delete("api/loainhiemvu/delete_loainhiemvu/"+id).subscribe(res=>{
          if(res){           
            swalWithBootstrapButtons.fire(
              'Đã xóa!',
              'Tệp của bạn đã bị xóa.',
              'success'
            );
            this.loaddata();
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
