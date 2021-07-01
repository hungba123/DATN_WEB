import { Component, OnInit ,Injector, ViewChild} from '@angular/core';
import { BaseComponent } from 'src/app/lib/base-component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent extends BaseComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  constructor(private injector: Injector) {
    super(injector)
  }
  item:any;
  them:any = true;
  itemsinger:any;
  pageindex: any = 1;
  pagesize: any = 5;
  ser:any="";
  txthoten:any;
  txtbidanh:any;
  txthinhanh:any;
  txtgioitinh:any = 1;
  txtngaysinh: any;
  txtnoisinh:any;
  txtcmnd: any;
  txtncapcmnd: any;
  txtdantoc: any;
  txttongiao:any;
  txtquoctich: any;
  txttthonnhan: any;
  txtquequan: any;
  txtdcttru: any;
  txtnoiohnay: any;
  txtdienthoai: any;
  txtemail: any;
  txttdhocvan:any;
  txttddtcn:any;
  txtngdaotao: any;
  txtcngdaotao:any;
  txtnoidaotao: any;
  txthtdaotao:any;
  txtmantn: any;
  txttinhtrang: any = 1;
  txttrinhdonn: any;
  txttinhoc: any;
  itempb: any;
  itemcv: any;
  selecpb:any;
  seleccv: any;
  datetime: any;
  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      this._api.get("api/nhanvien/get_nhanvien_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search=").subscribe(res=>{
        this.item = res;
      })
      this._api.get("api/phongban/get_phongban_all").subscribe(res=>{
        this.itempb = res;
      })
      this._api.get("api/chucvu/get_chucvu_all").subscribe(res=>{
        this.itemcv = res;
      })
      var dt = new Date();
      this.datetime = dt.getFullYear()+"/"+dt.getMonth()+"/"+dt.getDay();
    })
  }
  changeimg(event){
    this.txthinhanh = event.target;
  }
  cat_(tenchucvu){
    var a = tenchucvu.split(' ');
    var b = "";
    for(var i =0;i< 10; i++){
      b = b+" " + a[i];
    }
    return b +" ...";
  }
  search_(){
    this._api.get("api/nhanvien/get_nhanvien_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search="+this.ser).subscribe(res=>{
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
    this._api.get("api/nhanvien/get_nhanvien_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search="+this.ser).subscribe(res=>{
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
    this._api.get("api/nhanvien/get_nhanvien_id/"+id).subscribe(res=>{
      this.itemsinger = res;
      this.txthoten = this.itemsinger.hoten;
      this.txtbidanh = this.itemsinger.bidanh;
      this.txtgioitinh = this.itemsinger.gioitinh;
      this.txtngaysinh = Date.parse(this.itemsinger.ngaysinh);
      this.txtnoisinh = this.itemsinger.noisinh;
      this.txtcmnd = this.itemsinger.cmnd;
      this.txtncapcmnd = this.itemsinger.ncapcmnd;
      this.txtdantoc = this.itemsinger.dantoc;
      this.txttongiao = this.itemsinger.tongiao;
      this.txtquoctich = this.itemsinger.quoctich;
      this.txttinhtrang = this.itemsinger.tthonnhan;
      this.txtquequan = this.itemsinger.quequan;
      this.txtdcttru = this.itemsinger.dcttru;
      this.txtnoiohnay = this.itemsinger.noiohnay;
      this.txtdienthoai = this.itemsinger.dienthoai;
      this.selecpb = this.itemsinger.idpban;
      this.seleccv = this.itemsinger.idchucvu;
      this.txtemail = this.itemsinger.email;
      this.txttdhocvan = this.itemsinger.tdhocvan;
      this.txttddtcn = this.itemsinger.tdcaonhat;
      this.txtngdaotao = this.itemsinger.ngadaotao;
      this.txtcngdaotao = this.itemsinger.cngdaotao;
      this.txtnoidaotao = this.itemsinger.noidaotao;
      this.txthtdaotao = this.itemsinger.htdaotao;
      this.txttrinhdonn = this.itemsinger.trinhdonn;
      this.txttinhoc = this.itemsinger.tinhoc;
      console.log(this.txtngaysinh);
    });
  }
  create(){
    this.them = true;
    this.txthoten = "";
      this.txtbidanh = "";
      this.txtgioitinh = 1;
      this.txtngaysinh = "";
      this.txtnoisinh = "";
      this.txtcmnd = "";
      this.txtncapcmnd = "";
      this.txtdantoc = "";
      this.txttongiao = "";
      this.txtquoctich = "";
      this.txttinhtrang = 1;
      this.txtquequan = "";
      this.txtdcttru = "";
      this.txtnoiohnay = "";
      this.txtdienthoai = "";
      this.txtemail = "";
      this.txttdhocvan = "";
      this.txtngdaotao = "";
      this.txtcngdaotao = "";
      this.txtnoidaotao = "";
      this.txthtdaotao = "";
      this.txttrinhdonn = "";
      this.txttinhoc = "";
  }
  loaddata(){
    this._api.get("api/nhanvien/get_nhanvien_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search="+this.ser).subscribe(res=>{
      this.item = res;
    })
  }
  displaygt(gt){
    if(gt==1){
      return "Nam";
    }
    return "Nữ";
  }
  changegt(gt){
    this.txtgioitinh = gt;
  }
  changetthn(tthn){
    this.txttinhtrang = tthn;
  }
  exec(ht,bd,ngays,nois,cmnd,noiccmnd,dt,tg,qt,qq,dctt,noht, dient, email, pb, cv, tdhv,tdcn,cndt,ndt,htdt,tdnn,th){
    this.getEncodeFromImage(this.txthinhanh).subscribe(res=>{
      var Formdata = {
        hoten: ht,
        bidanh: bd,
        hinhanh: res,
        gioitinh: parseInt(this.txtgioitinh),
        ngaysinh: ngays,
        noisinh: nois,
        cmnd: cmnd,
        ncapcmnd: noiccmnd,
        dantoc: dt,
        tongiao: tg,
        quoctich: qt,
        tthonnhan: parseInt(this.txttinhtrang),
        quequan: qq,
        dcttru: dctt,
        noiohnay: noht,
        dienthoai: dient,
        email: email,
        idpban: parseInt(pb),
        idchucvu: parseInt(cv),
        tdhocvan: tdhv,
        tdcaonhat: tdcn,
        cngdaotao: cndt,
        noidaotao: ndt,
        htdaotao: htdt,
        trinhdonn: tdnn,
        tinhoc: th
      }
      console.log(ngays);
      alert(this.them);
      if(this.them==true){
        this._api.post("api/nhanvien/create_nhanvien",Formdata).subscribe(res=>{
          if(res){           
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Thêm thành công',
              showConfirmButton: false,
              timer: 1500
            });         
            this._api.get("api/nhanvien/get_nhanvien_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search="+this.ser).subscribe(res=>{
              if((res.total-1)%5==0){
                this.pageindex = this.pageindex + 1;
                this._api.get("api/nhanvien/get_nhanvien_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search="+this.ser).subscribe(res=>{
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
        this._api.put("api/nhanvien/edit_nhanvien/"+this.itemsinger.id,Formdata).subscribe(res=>{
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
    })
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
        this._api.delete("api/nhanvien/delete_nhanvien/"+id).subscribe(res=>{
          if(res){           
            swalWithBootstrapButtons.fire(
              'Đã xóa!',
              'Tệp của bạn đã bị xóa.',
              'success'
            );
            this._api.get("api/nhanvien/get_nhanvien_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search="+this.ser).subscribe(res=>{
              
              if(res.total%5==0){
                this.pageindex = this.pageindex - 1;
                this._api.get("api/nhanvien/get_nhanvien_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search="+this.ser).subscribe(res=>{
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
