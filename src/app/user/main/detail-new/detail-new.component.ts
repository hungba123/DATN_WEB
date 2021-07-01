import { Component, OnInit, Injector} from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { BaseComponent } from 'src/app/lib/base-component';
@Component({
  selector: 'app-detail-new',
  templateUrl: './detail-new.component.html',
  styleUrls: ['./detail-new.component.css']
})
export class DetailNewComponent extends BaseComponent implements OnInit {

  constructor(private authService: SocialAuthService, private injector: Injector) { 
    super(injector)
  }

  ngOnInit(): void {
  }
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(data=>{
      console.log(data);
    });
  }
}
