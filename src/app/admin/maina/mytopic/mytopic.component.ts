import { Component, OnInit,  Injector} from '@angular/core';
import { BaseComponent } from 'src/app/lib/base-component';
import {FormBuilder, FormControl, FormGroup,Validators} from '@angular/forms';
import Swal from 'sweetalert2';
declare var CKEDITOR: any;
declare var $:any;
@Component({
  selector: 'app-mytopic',
  templateUrl: './mytopic.component.html',
  styleUrls: ['./mytopic.component.css']
})
export class MytopicComponent extends BaseComponent implements OnInit {
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
  ckeditorContent:any;
  form_topic: FormGroup;
  user:any;
  submitted = false;
  pagesize:any = 5;
  pageindex:any = 1;
  ser:any ="";
  constructor(private injector: Injector, private _bui:FormBuilder) {
    super(injector);
  }
  ngOnInit(): void {
    this.form_topic = this._bui.group({
      tendetai_: ["", Validators.required],
      sohieu_: [""],
      tap_: [""],
      so_: [""],
      trang_: [""],
      soif_: [""],
      ghichu_: [""],
      linhvuc_: ["", Validators.required],
      loainhiemvu_: ["", Validators.required],
      hdnckhoahoc_: ["", Validators.required],
      tgbatdau_: ["", Validators.required],
      tgketthuc_: ["", Validators.required],
      capbv_: ["", Validators.required]
    })
    this.user = JSON.parse(localStorage.getItem("user"));
    CKEDITOR.on('instanceCreated', function (event, data) {
      var editor = event.editor,
      element = editor.element;
      editor.name = "content"
   });
    this._route.params.subscribe(params=>{   
      this._api.get("api/detai/get_detai_idnv/"+this.user.idnv).subscribe(res=>{
        this.item = res;
        console.log(this.item);
      });
      this._api.get("api/linhvuc/get_linhvuc_all").subscribe(res=>{
        this.itemlinhvuc = res;
      });
      this._api.get("api/loainhiemvu/get_loainhiemvu_all").subscribe(res=>{
        this.itemloainhiemvu = res;
      });
      this._api.get("api/hoatdongnckh/get_hoatdongnckh_all").subscribe(res=>{
        this.itemhoatdong = res;
      });
    })
  }
  edit(id){
    this.them = false;
    this._api.get("api/detai/get_detai_id/"+id).subscribe(res=>{
      this.itemsinger = res;
    });
  }
  create(){
    this.them = true;
  }
  filepdf:any;
  changemc(event){
    this.filepdf = event.target;
  }
  loaddata(){
    this._api.get("api/detai/get_detai_idnv/"+this.user.idnv).subscribe(res=>{
      this.item = res;
      console.log(this.item);
    })
  }
  exec(e){
    this.submitted = true;
    e.preventDefault();
    // stop here if form is invalid
    if (this.form_topic.invalid) {
        return;
    }
    var Formdata = {
      idnv: this.user.idnv,
      tendetai : this.form_topic.value.tendetai_,
      sohieu:this.form_topic.value.sohieu_,
      tap: parseInt(this.form_topic.value.tap_),
      so: parseInt(this.form_topic.value.so_),
      trang: parseInt(this.form_topic.value.trang_),
      soif : parseInt(this.form_topic.value.soif_),
      minhchung: "",
      tinhtrang: 1,
      ghichu: CKEDITOR.instances.content.getData(),
      idlinhvuc: parseInt(this.form_topic.value.linhvuc_),
      idloainv: parseInt(this.form_topic.value.loainhiemvu_),
      idhdnckh: parseInt(this.form_topic.value.hdnckhoahoc_),
      thoigianbd: this.form_topic.value.tgbatdau_,
      thoigiankt: this.form_topic.value.tgketthuc_,
      capbv: parseInt(this.form_topic.value.capbv_)
    }
      if(this.them){
        this._api.post("api/detai/create_detai",Formdata).subscribe(res=>{
          if(res){           
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Thêm thành công',
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
              title: 'Thêm thất bại',
              showConfirmButton: false,
              timer: 1500
            })
          }
        });
      }
      else{ 
        this._api.put("api/detai/edit_detai/"+this.itemsinger.madonvi,Formdata).subscribe(res=>{
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
        this._api.delete("api/detai/delete_detai/"+id).subscribe(res=>{
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
  chuyenhuy_(id,tt){
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
  chuyenhoanthanh_(id,tt){
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
        this._api.delete(`api/detai/chuyen_trang_thai?id=${id}&trangthai=${tt}&time=`).subscribe(res=>{
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
}
