import { Component, OnInit, Injector} from '@angular/core';
import { BaseComponent } from 'src/app/lib/base-component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent extends BaseComponent implements OnInit {
  itempopular: any;
  constructor(private injector: Injector) {
    super(injector)
   }

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      this._api.get("api/tintuc/get_tintuc_popular").subscribe(res=>{
        this.itempopular = res;
        console.log(this.itempopular);
      })
    })
  }

}
