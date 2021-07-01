import { Component, OnInit, Injector} from '@angular/core';
import { BaseComponent } from 'src/app/lib/base-component';
import { jsPDF } from "jspdf";
declare var $:any;
@Component({
  selector: 'app-backgroup',
  templateUrl: './backgroup.component.html',
  styleUrls: ['./backgroup.component.css']
})
export class BackgroupComponent extends BaseComponent implements OnInit {
  item:any;
  itemct:any;
  itembd:any;
  itemll:any;
  itemchutri:any;
  itemxuatban:any;
  itembcxuatban:any;
  itemtt:any;
  id:any;
  time:any;
  constructor(private injector: Injector) { 
    super(injector)
  }

  ngOnInit(): void {
    this._route.params.subscribe(params=>{
      this.id = params["id"];
      this._api.get("api/nhanvien/get_nhanvien_id/"+this.id).subscribe(res=>{
        this.item = res;
      })
      this._api.get("api/boiduong/get_boiduong_idnv/"+this.id).subscribe(res=>{
        this.itembd = res;
        console.log(res);
      })
      this._api.get("api/congtac/get_congtac_idnv/"+this.id).subscribe(res=>{
        this.itemct = res;
        console.log(res);
      })
      this._api.get("api/lylich/get_lylich_id/"+this.id).subscribe(res=>{
        this.itemll = res;
      })
      this._api.get("api/detai/get_detai_nckh/"+this.id).subscribe(res=>{
        this.itemchutri = res;
      })
      this._api.get("api/detai/get_detai_nckh2/"+this.id).subscribe(res=>{
        this.itemxuatban = res;
      })
      this._api.get("api/detai/get_detai_nckh6/"+this.id).subscribe(res=>{
        this.itembcxuatban = res;
      })
      this._api.get("api/detai/get_detai_nckh5/"+this.id).subscribe(res=>{
        this.itemtt = res;
      })
      this.time = new Date();
    })
  }
  displaycbv(Capbv){
    if(Capbv==1){
      return "Xuất sắc";
    }
    if(Capbv==2){
      return "Giỏi";
    }
    if(Capbv==3){
      return "Khá";
    }
    if(Capbv==4){
      return "Trung bình";
    }
    if(Capbv==5){
      return "Kém";
    }
  }
  displaykq(Capbv){
    if(Capbv==1){
      return "Bộ";
    }
    if(Capbv==2){
      return "Trường";
    }
    if(Capbv==3){
      return "Nhà nước";
    }
  }
  xuatword(){
    var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
            "xmlns:w='urn:schemas-microsoft-com:office:word' "+
            "xmlns='http://www.w3.org/TR/REC-html40'>"+
            "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
    var footer = "</body></html>";
    var sourceHTML = header+document.getElementById("_file").innerHTML+footer; 
    var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    var fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'lylich_'+this.id+'.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
  }
  displayGT(gt){
    if(gt == 1){
      return "Nam";
    }
    else{
      return "Nữ";
    }
  }
  xuatpdf(){
    var doc = new jsPDF();
    var elementHTML = $('#_file').html();
    doc.addFont("Roboto-Bold.ttf", "Roboto-Bold", "bold");
    doc.text("Xin chào Việt Nam",35,25);
    // doc.addImage(this.item.hinhanh, "png", 15, 40, 30, 40);
    doc.setFont("times", "normal");
    doc.text("hồ sơ lý lịch", 105, 80, null,"center"); 
    // Save the PDF
    doc.save('lylich_'+this.id+'.pdf');
  }
}
