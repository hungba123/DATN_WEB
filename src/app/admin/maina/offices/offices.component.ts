import { Component, OnInit, Injector, ViewChild} from '@angular/core';
import { BaseComponent } from 'src/app/lib/base-component';
import Swal from 'sweetalert2';
import {Md5} from 'ts-md5/dist/md5';
declare var $:any;
@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.css']
})
export class OfficesComponent extends BaseComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  ser:any="";
  item:any;
  itemrole:any;
  pagesize:any = 5;
  pageindex:any = 1;
  hinhanh:any;
  itemuser:any;
  constructor(private injector: Injector) {
    super(injector)
   }
  ngOnInit(): void {
    this._api.get("api/user/get_user_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search=").subscribe(res=>{
      this.item = res;
      console.log(this.item);
    });
    this._api.get("api/role/get_role_all").subscribe(res=>{
      this.itemrole = res;
      console.log(this.itemrole);
    });
    this._api.get("api/nhanvien/get_nhanvien_all").subscribe(res=>{
      this.itemuser = res;
    });
  }
  preup_(search){
    this.ser = search;
  }
  search_(){
    this.pageindex = 1;
    this._api.get("api/user/get_user_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search="+this.ser).subscribe(res=>{
      this.item = res;
    });
  }
  onpagination_(i){
    var a = (this.item.total / this.pagesize).toFixed();
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
    this._api.get("api/user/get_user_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search="+this.ser).subscribe(res=>{
      this.item = res;
    });
  }
  pagination(tong){
    let a:number[]= [];
    var total = (tong/this.pagesize).toFixed();
    for(var i = 1; i <= parseInt(total); i++){
      a.push(i);
    }
    return a;
  }
  onimg(event){
    this.hinhanh = event.target;
  }
  use_id:any;
  change_user_assc(id){
    this.use_id = id;
  }
  Access_User(seus){
    this._api.get("api/user/change_user/"+this.use_id+"/"+seus).subscribe(res=>{
      if(res==true){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Cấp tài khoản thành công',
          showConfirmButton: false,
          timer: 1500
        });
        this._api.get("api/user/get_user_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search=").subscribe(res=>{
          this.item = res;
        });
      }
      else{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Cập nhật tài khoản thất bại',
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }
  taikhoan:any;
  matkhau:any;
  create(){
    this.taikhoan = "";
    this.matkhau = "";
  }
  exec(tk,mk,role){
    const md5 = new Md5();
    this.getEncodeFromImage(this.hinhanh).subscribe(res=>{
      var formdata = {
        taikhoan : tk,
        matkhau : md5.appendStr(mk).end(),
        hinhanh : res,
        idrole : parseInt(role),
      }
      console.log(formdata);
        this._api.post("api/user/create_user",formdata).subscribe(res=>{
          if(res){           
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Thêm thành công',
              showConfirmButton: false,
              timer: 1500
            });         
            this._api.get("api/user/get_user_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search="+this.ser).subscribe(res=>{
              this.item = res;
            });
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
    });   
  }
  change_status_us(id){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Bạn có chắc không?',
      text: "Khoá người dùng không thực hiện được các chức năng, và ngược lại!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có!',
      cancelButtonText: 'Không, hủy bỏ!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._api.get("api/user/change_status/"+id).subscribe(res=>{
          if(res.ketqua){
            swalWithBootstrapButtons.fire(
              'Chuyển đổi trạng thái thành công!',
              res.thongbao,
              'success'
            );
            this._api.get("api/user/get_user_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search="+this.ser).subscribe(res=>{
              this.item = res;
            });
          }
          else{
            swalWithBootstrapButtons.fire(
              'Chuyển đổi trạng thái thất bại!',
              res.thongbao,
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
          'Barn ghi của bạn an toàn :)',
          'error'
        );
      }
    })
  }
  delete_us(id){
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
        this._api.delete("api/user/delete_user/"+id).subscribe(res=>{
          if(res){           
            swalWithBootstrapButtons.fire(
              'Đã xóa!',
              'Tệp của bạn đã bị xóa.',
              'success'
            );
            this._api.get("api/user/get_user_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search="+this.ser).subscribe(res=>{
              this.item = res;
            });
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
