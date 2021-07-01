import { Component, OnInit, Injector} from '@angular/core';
import { BaseComponent } from 'src/app/lib/base-component';
import Swal from 'sweetalert2';
declare var CKEDITOR: any;
declare var $:any;
@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent extends BaseComponent implements OnInit {
  item:any;
  itemsinger:any;
  them:any=true;
  tendt:any;
  loainc:any;
  ten: any;
  sohieu:any;
  namsanxuat:any;
  tap: any;
  so: any;
  trang: any;
  soif: any;
  minhchung: any;
  thoigianbd: any;
  thoigiankt: any;
  itemlinhvuc: any;
  itemloainhiemvu: any;
  itemhoatdong: any;
  chon_ :any = 1;
  pagesize:any = 5;
  pageindex:any = 1;
  constructor(private injector:Injector) {
    super(injector)
  }
  ser:any = "";

  ckeditorContent:any;
  ngOnInit(): void {
    CKEDITOR.on('instanceCreated', function (event, data) {
      var editor = event.editor,
      element = editor.element;
      editor.name = "content"
   });
   this._route.params.subscribe(params=>{   
    this._api.get("api/detai/get_detai_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search="+this.ser).subscribe(res=>{
      this.item = res;
    });
    this._api.get("api/linhvuc/get_linhvuc_all").subscribe(res=>{
      this.itemlinhvuc = res;
    });
    this._api.get("api/loainhiemvu/get_loainhiemvu_all").subscribe(res=>{
      this.itemloainhiemvu = res;
    });
    this._api.get("api/hoatdongnckh/get_hoatdongnckh_all").subscribe(res=>{
      this.itemhoatdong = res;
      console.log(this.itemhoatdong);
    });
  })
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
    this._api.get("api/detai/get_detai_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search="+this.ser).subscribe(res=>{
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
  chuuyen_ds_tt(tt){
    this._api.get("api/detai/get_detai_pagesize_tinhtrang?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search="+this.ser+"&&tinhtrang="+tt).subscribe(res=>{
      this.item = res;
      console.log(this.item);
    })
  }
  filepdf:any;
  changemc(event){
    this.filepdf = event.target;
  }
  loaddata(){
    this._api.get("api/detai/get_detai_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search="+this.ser).subscribe(res=>{
      this.item = res;
      console.log(this.item);
    })
  }
  chuuyen_ds_all(){
    this.pageindex = 1;
    this.loaddata();
  }
  splittenhdnckh(tenhdnckh){
    var a =  tenhdnckh.split(' ');
    var b = "";
    for(var i = 0;i < 11; i++){
      b = b + " " + a[i];
    }
    return b+"...";
  }
  resultbv(capbv){
    switch(capbv){
      case 1: 
        return "Đề tài cấp bộ";
      case 2:
        return "Đề tài cấp trường";
      case 3:
        return "Đề tài cấp nhà nước";
    }
  }
  chuyenduyet_(id,tt){
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
      confirmButtonText: 'Có',
      cancelButtonText: 'Không, hủy bỏ!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this._api.delete(`api/detai/chuyen_trang_thai?id=${id}&trangthai=${tt}&time=`).subscribe(res=>{
          if(res){           
            swalWithBootstrapButtons.fire(
              'Chuyển thành công',
              'Đề tài đã chuyển sang đã duyệt',
              'success'
            );
            this.loaddata();
          }
          else{
            swalWithBootstrapButtons.fire(
              'Chuyển thất bại',
              'Đề tài chưa chuyển sang đã duyệt',
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
          'Đề tài chưa chuyển sang đã duyệt :)',
          'error'
        );
      }
    })
  }
}
