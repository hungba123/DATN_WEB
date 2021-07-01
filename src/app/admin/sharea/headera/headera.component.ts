import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-headera',
  templateUrl: './headera.component.html',
  styleUrls: ['./headera.component.css']
})
export class HeaderaComponent implements OnInit {

  constructor(private _rou:Router) { }

  ngOnInit(): void {
  }
  logout(){
    Swal.fire({
      title: 'Bạn chắc chắn?',
      text: "Bạn muốn thoát khỏi website!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đúng, thoát nó!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('user');
        this._rou.navigate(['/admin/dangnhap']);
      }
    })
  }
}
