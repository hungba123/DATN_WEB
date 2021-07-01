import { Component, OnInit ,Injector, ViewChild} from '@angular/core';
import { BaseComponent } from 'src/app/lib/base-component';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
import { environment } from 'src/environments/environment';
declare var CKEDITOR: any;
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})

export class NewsComponent extends BaseComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  // public Editor = ClassicEditor;
  constructor(private ijnector:Injector) {
    super(ijnector)
   }
  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
   item:any;
   tieude:any="";
   tomtat:any="";
   hinhanh:any;
   loaitintuc:any;
   insert:any = true;
   ckeditorContent:any;
   itemloai:any;
   pageindex: any = 1;
   pagesize: any = 5;
   ser:any="";
   public editorConfig = {
    simpleUpload: {
      // The URL that the images are uploaded to.
      uploadUrl: environment.postSaveRteImage,
    
      // Headers sent along with the XMLHttpRequest to the upload server.
      headers: {
        'X-CSRF-TOKEN': 'CSFR-Token',
        Authorization: 'Bearer <JSON Web Token>'
      }
    }
  }
  ngOnInit(): void {
    CKEDITOR.on('instanceCreated', function (event, data) {
      var editor = event.editor,
      element = editor.element;
      editor.name = "content";
   });
    this._route.params.subscribe(params=>{   
      this._api.get("api/tintuc/get_tintuc_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search=").subscribe(res=>{
        this.item = res;
        console.log(this.item);
      });
      this._api.get("api/loaitintuc/get_loaitintuc_all").subscribe(res=>{
        this.itemloai = res;
        console.log(this.itemloai);
        this.loaitintuc = this.itemloai[0].id;
      });
    })
  }
  // next(){
  //   this.pageindex = this.pageindex -1;
  //   if(this.pageindex < 1)
  //     this.pageindex = 1;
  //   this._api.get("api/tintuc/get_tintuc_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search=").subscribe(res=>{
  //     this.item = res;
  //   });
  // }
  // pre(){
  //   var a = (this.item.total / this.pagesize).toFixed();
  //   this.pageindex = this.pageindex + 1;
  //   if(this.pageindex > a)
  //     this.pageindex = a;
  //   this._api.get("api/tintuc/get_tintuc_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search=").subscribe(res=>{
  //     this.item = res;
  //   });
  // }
  search_(){
    this.pageindex = 1;
    this._api.get("api/tintuc/get_tintuc_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search="+this.ser).subscribe(res=>{
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
    this._api.get("api/tintuc/get_tintuc_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search="+this.ser).subscribe(res=>{
      this.item = res;
    });
  }
  preup_(search){
    this.ser = search;
  }
  create(){
    this.insert = true;
    this.tieude = "";
    this.tomtat = "";
    this.hinhanh = "";
    this.loaitintuc = this.itemloai[0].id;
    CKEDITOR.instances.content.setData("");
  }
  delete_(matt){
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
        this._api.delete("api/tintuc/delete_tintuc/"+matt).subscribe(res=>{
          if(res){           
            swalWithBootstrapButtons.fire(
              'Đã xóa!',
              'Tệp của bạn đã bị xóa.',
              'success'
            );
            this._api.get("api/tintuc/get_tintuc_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search="+this.ser).subscribe(res=>{
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
  edit(matt){
    this.insert = false;
    this._api.get("api/tintuc/get_tintuc_id/"+matt).subscribe(res=>{
      this.itemsinger = res;
      this.tieude = this.itemsinger.tieude;
      this.tomtat = this.itemsinger.tomtat;
      this.hinhanh = "";
      this.loaitintuc = this.itemsinger.idloai;
      CKEDITOR.instances.content.setData(this.itemsinger.noidung);
    });
  }
  onimg(event){
    this.hinhanh = event.target;
  }
  pagination(tong){
    let a:number[]= [];
    var total = Math.ceil(tong/this.pagesize);
    for(var i = 1; i <= total; i++){
      a.push(i);
    }
    return a;
  }
  itemsinger:any;
  exec(td,tt,ltt){
    this.getEncodeFromImage(this.hinhanh).subscribe(res=>{
      var formdata = {
        tieude : td,
        tomtat : tt,
        hinhanh : res,
        idloai : parseInt(ltt),
        noidung : CKEDITOR.instances.content.getData(),
        luotxem: 0
      }
      console.log(formdata);
      if(this.insert){
        this._api.post("api/tintuc/create_tintuc",formdata).subscribe(res=>{
          if(res){           
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Thêm thành công',
              showConfirmButton: false,
              timer: 1500
            });         
            this._api.get("api/tintuc/get_tintuc_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search="+this.ser).subscribe(res=>{
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
      }
      else{
        this._api.put("api/tintuc/edit_tintuc/"+this.itemsinger.id,formdata).subscribe(res=>{
          if(res){           
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Sửa thành công',
              showConfirmButton: false,
              timer: 1500
            });
            this._api.get("api/tintuc/get_tintuc_pagesize?pagesize="+this.pagesize+"&&pageindex="+this.pageindex+"&&search="+this.ser).subscribe(res=>{
              this.item = res;
            });
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
    });   
  }
}
