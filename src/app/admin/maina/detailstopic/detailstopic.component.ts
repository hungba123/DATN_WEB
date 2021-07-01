import { Component, OnInit, Injector, ViewChild} from '@angular/core';
import { BaseComponent } from 'src/app/lib/base-component';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
declare var $:any;
import Swal from 'sweetalert2';
@Component({
  selector: 'app-detailstopic',
  templateUrl: './detailstopic.component.html',
  styleUrls: ['./detailstopic.component.css']
})
export class DetailstopicComponent extends BaseComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  @ViewChild('close_nhomtg') close_nhomtg;
  @ViewChild('close_edit_hoso') close_edit_hoso;
  gc_shtt:any;
  txt_ht:any;
  gc_ht:any;
  txt_ths:any;
  gc_ths:any;
  itemsohuu:any;
  id: any;
  itemsinger:any;
  itemnhomtg:any;
  itemhoso: any;
  itemdetai:any;
  them:any;
  sel_shtt:any;
  sel_ht:any;
  user:any;
  nhomtg_singer: any;
  user_list: any;
  public exampleData: Array<Select2OptionData> = [];
  datanv: Array<Select2OptionData> = [];
  public options: Options;
  constructor(private injector: Injector) {
    super(injector)
  }
  ngOnInit(): void {
    this.options = {
      multiple: true,
      theme: 'classic',
      closeOnSelect: false,
      width: '470',
      tags: true
    };
    this._route.params.subscribe(params=>{ 
      this.id = params["id"];
      this._api.get("api/detai/get_detai_id/"+this.id).subscribe(res=>{
        this.itemdetai = res;
      });
      this._api.get("api/sohuudetai/get_sohuudetai_iddetai/"+this.id).subscribe(res=>{
        this.itemsohuu = res;
      });
      this._api.get("api/nhomtg/get_nhomtg_all/"+this.id).subscribe(res=>{
        this.itemnhomtg = res;
        // console.log(this.itemnhomtg);
      });
      this._api.get("api/hoso/get_hoso_iddetai/"+this.id).subscribe(res=>{
        this.itemhoso = res;
        // console.log(this.itemhoso);
      });
      this.goi_sohuutritue();
      this.user = JSON.parse(localStorage.getItem('user'));
      this._api.get('api/nhanvien/get_nhanvien_all_idnv/'+this.user.idnv).subscribe(res=>{
        this.user_list = res;
        res.forEach(element => {
          var a = {
            id: element.id,
            text: element.hoten
          }
          this.datanv.push(a);
        });
      })
    })
  }
  cat_tile(tensohuu){
    var a = tensohuu.split(' ');
    var b = "";
    for(var i =0;i<=10;i++){
      b = b +" "+ a[i];
    }
    return b +" ...";
  }
  delete_sohuu(id){
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
        this._api.delete("api/sohuudetai/delete_sohuudetai/"+id).subscribe(res=>{
          if(res){           
            swalWithBootstrapButtons.fire(
              'Đã xóa!',
              'Tệp của bạn đã bị xóa.',
              'success'
            );
            this._api.get("api/sohuudetai/get_sohuudetai_iddetai/"+this.id).subscribe(res=>{
              this.itemsohuu = res;
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
  ht_txt:any;
  cv_txt:any;
  id_nv_edit:any;
  id_sel:any="";
  select_true:any = false;
  change_hoten: any ="";
  edit_nhomtg(id){
    this._api.get("api/nhomtg/get_nhomtg_id/"+id).subscribe(res=>{
      this.nhomtg_singer = res;
      this.ht_txt = this.nhomtg_singer.hoten;
      this.cv_txt = this.nhomtg_singer.chucvu;
      this.id_nv_edit = this.nhomtg_singer.idnv;
      if(this.id_nv_edit >0){
        this.select_true = true;
        this.change_hoten = this.nhomtg_singer.hoten;
        this.id_sel = this.nhomtg_singer.idnv;
      }
      else{
        this.select_true = false;
      }
    });
  }
  change_htnv(id){
    this.id_sel = id;
    this.change_hoten ="";
  }
  edit_nhomtg_2(){
    var sel_id;
    var _hoten;
    if(this.select_true){
      sel_id = this.id_sel;
      _hoten = this.change_hoten;
    }
    else{
      sel_id = "";
      _hoten = this.ht_txt;
    }
    var formdata = {
      iddetai: parseInt(this.id),
      hoten: _hoten,
      idnv: parseInt(sel_id),
      chucvu: this.cv_txt
    }
    console.log(formdata);
    this._api.put("api/nhomtg/edit_nhomtg/"+this.nhomtg_singer.id,formdata).subscribe(res=>{
      if(res.ketqua){
        this._api.get("api/nhomtg/get_nhomtg_all/"+this.id).subscribe(res=>{
          this.itemnhomtg = res;
        });
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.thongbao,
          showConfirmButton: false,
          timer: 1500
        })
        this.close_nhomtg.nativeElement.click();
      }
      else{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: res.thongbao,
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
  delete_nhomtg(id){
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
        this._api.delete("api/nhomtg/delete_nhomtg/"+id).subscribe(res=>{
          if(res){           
            swalWithBootstrapButtons.fire(
              'Đã xóa!',
              'Tệp của bạn đã bị xóa.',
              'success'
            );
            this._api.get("api/nhomtg/get_nhomtg_all/"+this.id).subscribe(res=>{
              this.itemnhomtg = res;
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
  singer_hoso:any;
  edit_hoso(id){
    this._api.get("api/hoso/get_hoso_id/"+id).subscribe(res=>{
      this.singer_hoso = res;
    })
  }
  Save_hs(txt_hs){
    this.ChangeFileToBase64(this.path_img).then(data=>{
      var c = {
        iddetai : parseInt(this.id),
        ten: txt_hs,
        minhchung: this.path_img.name +";" +data
      }
      this._api.put("api/hoso/edit_hoso/"+this.singer_hoso.id,c).subscribe(res=>{
        if(res){
          this.close_edit_hoso.nativeElement.click();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: "Sửa hồ sơ thành công",
            showConfirmButton: false,
            timer: 1500
          })
          this._api.get("api/hoso/get_hoso_iddetai/"+this.id).subscribe(res=>{
            this.itemhoso = res;
          });
        }
        else{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: "Sửa hồ sơ thất bại",
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    })
  }
  delete_hoso(id){
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
        this._api.delete("api/hoso/delete_hoso/"+id).subscribe(res=>{
          if(res){           
            swalWithBootstrapButtons.fire(
              'Đã xóa!',
              'Tệp của bạn đã bị xóa.',
              'success'
            );
            this._api.get("api/hoso/get_hoso_iddetai/"+this.id).subscribe(res=>{
              this.itemhoso = res;
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
  goi_sohuutritue(){
    this._api.get("api/sohuu/get_sohuu_all").subscribe(res=>{
      if(this.sel_shtt==null){
        res.forEach(element => {
          var a = {
            id: element.id,
            text: element.tensohuu.split(' ').length > 10 ? this.cat_tile(element.tensohuu) : element.tensohuu
          }
          this.exampleData.push(a);
        });
      }
      else{
        res.forEach(element => {
          var co = 0;
          this.sel_shtt.forEach(item => {
            if(item==element.id){
              co = 1;
            }
          });
          if(co == 0){
            var a = {
              id: element.id,
              text: element.tensohuu.split(' ').length > 10 ? this.cat_tile(element.tensohuu) : element.tensohuu
            }
            this.exampleData.push(a);
          }
        });
        
      }
    })
  }
  path_img:any;
  upload_img(event){
    this.path_img = event.target.files[0];
  }
  ng_Submit(){
    if(this.them==1){
      var a = [];
      this.sel_shtt.forEach(element => {
        var d = {
          iddetai : parseInt(this.id),
          idsohuu : parseInt(element),
          ghichu: this.gc_shtt
        }
        a.push(d);
      });
      this._api.post("api/sohuudetai/create_sohuudetai",a).subscribe(res=>{
        if(res.ketqua){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.thongbao,
            showConfirmButton: false,
            timer: 1500
          })
          this._api.get("api/sohuudetai/get_sohuudetai_iddetai/"+this.id).subscribe(res=>{
            this.itemsohuu = res;
          });
          this.closebutton.nativeElement.click();
        }
        else{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: res.thongbao,
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    }
    if(this.them==2){
      var b = [];
      this.sel_ht.forEach(element => {
        var e = {
          iddetai : parseInt(this.id),
          idnv : parseInt(element),
          chucvu: this.gc_ht
        }
        b.push(e);
      });
      if(this.txt_ht!=null){
        b.push({
          iddetai : parseInt(this.id),
          hoten : this.txt_ht,
          chucvu: this.gc_ht
        })
      }
      this._api.post("api/nhomtg/create_nhomtg",b).subscribe(res=>{
        if(res.ketqua){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.thongbao,
            showConfirmButton: false,
            timer: 1500
          })
          this._api.get("api/nhomtg/get_nhomtg_all/"+this.id).subscribe(res=>{
            this.itemnhomtg = res;
            // console.log(this.itemnhomtg);
          });
          this.closebutton.nativeElement.click();
        }
        else{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: res.thongbao,
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    }
    if(this.them==3){
      this.ChangeFileToBase64(this.path_img).then(res=>{
        var c = {
          iddetai : parseInt(this.id),
          ten: this.txt_ths,
          minhchung: this.path_img.name +";" +res
        }
        console.log(c);
        this._api.post("api/hoso/create_hoso",c).subscribe(res=>{
          if(res){
            this._api.get("api/hoso/get_hoso_iddetai/"+this.id).subscribe(res=>{
              this.itemhoso = res;
              // console.log(this.itemhoso);
            });
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Thêm hồ sơ thành công',
              showConfirmButton: false,
              timer: 1500
            })
            this.closebutton.nativeElement.click();
          }
          else{
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Thêm hồ sơ thất bại',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
      })
    }
  }
  download_file(hs){
    $.fileDownload("../../../../assets/file/"+hs, {
      preparingMessageHtml: "Chúng tôi đang chuẩn bị báo cáo của bạn, vui lòng đợi ...",
      failMessageHtml: "Đã xảy ra sự cố khi tạo báo cáo của bạn, vui lòng thử lại."
    });
  }
  resultkqbv(kqbv){
    var kq="";
    switch(kqbv){
      case 1:
        kq = "Xuất sắc";
        break;
      case 2:
        kq = "Giỏi";
        break;
      case 3:
        kq = "Khá";
        break;
      case 4:
        kq = "Trung bình";
        break;
      case 5:
        kq = "Kém";
        break;
    }
    return kq;
  }
  insert(i){
    this.them = i;
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
