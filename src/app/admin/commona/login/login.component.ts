import { Component, OnInit, Injector} from '@angular/core';
import { BaseComponent } from 'src/app/lib/base-component';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../lib/authentication.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService, private injector: Injector) {
    super(injector);
    if (this.authenticationService.userValue) {
      this.router.navigate(['/admin/dangnhap']);
    }
   }
  error = '';
  returnUrl: string;
  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/';
  }
  dangnhap(tk, mk){
    const md5 = new Md5();
    var a = md5.appendStr(mk).end();
    this._api.get("api/user/get_user_login_bool?username="+tk+"&&password="+a.toString()).subscribe(res=>{
      if(res.ketqua){
        this.authenticationService
        .login(tk, a.toString())
        .pipe(first())
        .subscribe(
          (data) => {
            this.router.navigate([this.returnUrl]);
          },
          (error) => {
            this.error = error; 
            alert(this.error);
          }
        );
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
    })
   
  }
}
