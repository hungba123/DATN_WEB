import { Component, OnInit, Injector, ViewChild} from '@angular/core';
import { BaseComponent } from 'src/app/lib/base-component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-researchactivities',
  templateUrl: './researchactivities.component.html',
  styleUrls: ['./researchactivities.component.css']
})
export class ResearchactivitiesComponent extends BaseComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  item:any;
  them:any = true;
  itemsinger:any;
  tenhoatdong:any;
  dinhmuc:any;
  dinhmuckp:any;
  ghichu:any;
  pageindex: any = 1;
  pagesize: any = 5;
  ser:any="";
  selec: any;
  itemloai:any;
  constructor(private injector: Injector) {
    super(injector)
   }

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      this._api.get("api/hoatdongnckh/get_hoatdongnckh_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search=").subscribe(res=>{
        this.item = res;
      })
    })
  }
  search_(){
    this._api.get("api/hoatdongnckh/get_hoatdongnckh_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search="+this.ser).subscribe(res=>{
      this.item = res;
    });
  }
  onpagination_(i){
    var a = Math.ceil(this.item.total / this.pagesize);
    if(i<=0){
      this.pageindex = 1;
    }
    else{
      if(i>=a){
        this.pageindex = a;
      }
      else{
        this.pageindex = i;
      }
    }  
    this._api.get("api/hoatdongnckh/get_hoatdongnckh_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search="+this.ser).subscribe(res=>{
      this.item = res;
      console.log(res);
    });
  }
  pagination(tong){
    let a:number[]= [];
    var total = 	Math.ceil(tong/this.pagesize);
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
    this._api.get("api/hoatdongnckh/get_hoatdongnckh_id/"+id).subscribe(res=>{
      this.itemsinger = res;
      this.tenhoatdong = this.itemsinger.tenhdnckh;
      this.dinhmuc = this.itemsinger.dinhmuc;
      this.dinhmuckp =this.itemsinger.dmhtkinhphi;
      this.ghichu = this.itemsinger.ghichu;
      this.selec = this.itemsinger.idloaihd;
      console.log(this.itemsinger);
    });
  }
  create(){
    this.them = true;
    this.tenhoatdong = "";
    this.dinhmuc = "";
    this.dinhmuckp ="";
    this.ghichu = "";
  }
  loaddata(){
    this._api.get("api/hoatdongnckh/get_hoatdongnckh_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search="+this.ser).subscribe(res=>{
      this.item = res;
    })
  }
  exec(thd,dm,dmkp,gc, loai){
    var Formdata = {
      tenhdnckh: thd,
      dinhmuc: dm,
      dmhtkinhphi: dmkp,
      ghichu: gc,
      idloaihd: loai
    }
    if(this.them){
      this._api.post("api/hoatdongnckh/create_hoatdongnckh",Formdata).subscribe(res=>{
        if(res){           
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Thêm thành công',
            showConfirmButton: false,
            timer: 1500
          });         
          this._api.get("api/hoatdongnckh/get_hoatdongnckh_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search="+this.ser).subscribe(res=>{
            if((res.total-1)%5==0){
              this.pageindex = this.pageindex + 1;
              this._api.get("api/hoatdongnckh/get_hoatdongnckh_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search="+this.ser).subscribe(res=>{
                this.item = res;
              })             
            }
            else{
              this.item = res;
            }
          })
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
      this._api.put("api/hoatdongnckh/edit_hoatdongnckh/"+this.itemsinger.id,Formdata).subscribe(res=>{
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
        this._api.delete("api/hoatdongnckh/delete_hoatdongnckh/"+id).subscribe(res=>{
          if(res){           
            swalWithBootstrapButtons.fire(
              'Đã xóa!',
              'Tệp của bạn đã bị xóa.',
              'success'
            );
            this._api.get("api/hoatdongnckh/get_hoatdongnckh_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search="+this.ser).subscribe(res=>{
              
              if(res.total%5==0){
                this.pageindex = this.pageindex - 1;
                this._api.get("api/hoatdongnckh/get_hoatdongnckh_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search="+this.ser).subscribe(res=>{
                  this.item = res;
                });
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
