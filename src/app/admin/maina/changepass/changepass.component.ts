import { Component, OnInit, Injector} from '@angular/core';
import { BaseComponent } from 'src/app/lib/base-component';
import Swal from 'sweetalert2';
import {Md5} from 'ts-md5/dist/md5';
declare var $:any;
@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent extends BaseComponent implements OnInit {

  constructor(private injector:Injector) { 
    super(injector)
  }
  matkm:any="";
  nlmatk:any="";
  matkc:any="";
  arr:boolean[] = [];
  ngOnInit(): void {
  }
  haveint(a){
    for(var i =0; i<a.length;i++){
      if(Number.isInteger(eval(a[i]))){
        return true;
      }
    }
    return false;
  }
  haveupper(a){
    return a.match(/[A-Z]+/) ? true : false;
  }
  havelowser(a){
    return a.match(/[a-z]+$/) ? true : false;
  }
  havepre(a){
    // return a.match(/^[^a-zA-Z0-9]+$/) ? true : false;
    var specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
       for(var i = 0; i < specialChars.length;i++){
          if(a.indexOf(specialChars[i]) > -1){
            return true;
          }
      }
      return false;
  }
  onsubmit: any = true;
  changemkm_(mkm){
    this.matkm = mkm;
    if(mkm.length<6){
      $("#displaylevel").html("");
      $("#alertmkm").text("Không để mật khẩu mới trống và độ dài lớn hơn 5 ký tự");
      this.onsubmit = false;
    }
    else{
      this.onsubmit = true;
      $("#alertmkm").text("");
      this.arr = [this.haveint(mkm),this.havelowser(mkm),this.haveupper(mkm),this.havepre(mkm)];
      var dem = 0;
      for(var i = 0;i<this.arr.length;i++){
        if(this.arr[i]==true){
          dem++;
        }
      }
      if(dem==4){
        $("#displaylevel").html(`Mức độ bảo mật <div class="progress">
        <div class="progress-bar bg-danger" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
      </div>`);
      }
      if(dem==3){
        $("#displaylevel").html(`Mức độ bảo mật <div class="progress">
        <div class="progress-bar bg-warning" role="progressbar" style="width: 75%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
      </div>`);
      }
      if(dem==2){
          $("#displaylevel").html(`Mức độ bảo mật <div class="progress">
          <div class="progress-bar bg-info" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
        </div>`);
      }
      if(dem==1){
          $("#displaylevel").html(`Mức độ bảo mật <div class="progress">
        <div class="progress-bar bg-success" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
      </div>`);
      }
      if(dem==0){
          $("#displaylevel").html(`Mức độ bảo mật <div class="progress">
        <div class="progress-bar bg-success" role="progressbar" style="width: 0%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
      </div>`);
      }
    }
  }
  changenlmk_(nlmk, matkm){
    if(nlmk.length<6){
      $("#alertnlmk").text("Không để mật khẩu mới trống và độ dài lớn hơn 5 ký tự");
      this.onsubmit = false;
    }
    else{
      this.onsubmit = true;
      $("#alertnlmk").text("");
      this.onsubmit = true;
      if(nlmk == matkm){
        $("#alertnlmk").text("Nhập lại mật khẩu hợp lệ");
      }
      else{
        $("#alertnlmk").text("Nhập mật khẩu lại chưa chính xác");
      }
    }
  }
  changenc_(mkc){
    if(mkc.length<6){
      $("#alertmkc").text("Không để mật khẩu mới trống và độ dài lớn hơn 5 ký tự");
      this.onsubmit = false;
    }
    else{
      this.onsubmit = true;
      $("#alertmkc").text("");
      this.onsubmit = true;
    }
  }
  lammoi(){
    this.matkm ="";
    this.nlmatk ="";
    this.matkc ="";
    $("#displaylevel").html("");
    $("#alertnlmk").text("");
    $("#alertmkc").text("");
    $("#alertmkm").text("");
  }
  doimatkhau(matkm, nlmatk, matkc){
    const md5 = new Md5();
    const _md5 = new Md5();
    // var a = md5.appendStr(matkc).end();
    if(matkm != matkc){
      var a = md5.appendStr(matkc).end();
      var b = _md5.appendStr(matkm).end();
      var use = JSON.parse(localStorage.getItem('user')); 
      var formdata = {
        taikhoan: use.taikhoan,
        matkhau: b,
        matkhaucu: a
      }
      console.log(formdata);
      this._api.post("api/user/edit_user_matkhau",formdata).subscribe(res=>{
        if(res.ketqua){
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.thongbao,
            showConfirmButton: false,
            timer: 1500
          });
        }
        else{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: res.thongbao,
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    }
    else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: "Mật khẩu cũ với mới trùng nhau",
        showConfirmButton: false,
        timer: 1500
      });
    }
    
  }
  on_display_pass(stt){
    alert(stt);
    if(stt==1){
      if($("#mkm_eye i").attr("class")=="fa fa-eye-slash"){
        $("#exampleInputmkm").attr("type","password");
        $("#mkm_eye").html('<i class="fa fa-eye" style="position: absolute; top: 10px; right: 10px; font-size: 20px;" aria-hidden="true"></i>');
      }
      else{
        $("#exampleInputmkm").attr("type","text");
        $("#mkm_eye").html('<i class="fa fa-eye-slash" style="position: absolute; top: 10px; right: 10px; font-size: 20px;" aria-hidden="true"></i>');
      }
    }
    if(stt==2){
      if($("#nlkm_eye i").attr("class")=="fa fa-eye-slash"){
        $("#exampleInputnlmk").attr("type","password");
      $("#nlkm_eye").html('<i class="fa fa-eye" style="position: absolute; top: 10px; right: 10px; font-size: 20px;" aria-hidden="true"></i>');
      }
      else{
        $("#exampleInputnlmk").attr("type","text");
        $("#nlkm_eye").html('<i class="fa fa-eye-slash" style="position: absolute; top: 10px; right: 10px; font-size: 20px;" aria-hidden="true"></i>');
      }   
    }
    if(stt==3){
      if($("#mkc_eye i").attr("class")=="fa fa-eye-slash"){
        $("#exampleInputmkc").attr("type","password");
        $("#mkc_eye").html('<i class="fa fa-eye" style="position: absolute; top: 10px; right: 10px; font-size: 20px;" aria-hidden="true"></i>');
      }
      else{
        $("#exampleInputmkc").attr("type","text");
        $("#mkc_eye").html('<i class="fa fa-eye-slash" style="position: absolute; top: 10px; right: 10px; font-size: 20px;" aria-hidden="true"></i>');
      }
    }
  }
}
