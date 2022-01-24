import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { ForwardedReplie } from 'src/app/models/forwardedReplieModels/forwardedReplie';
import { ForwardedReplieService } from 'src/app/services/forwarded-replie.service';

@Component({
  selector: 'app-forwarded-replie-list',
  templateUrl: './forwarded-replie-list.component.html',
  styleUrls: ['./forwarded-replie-list.component.css']
})
export class ForwardedReplieListComponent implements OnInit {

  forwardedReplies: ForwardedReplie[] = [];
  isDataNull:boolean = true;
  constructor(private forwardedReplieService:ForwardedReplieService,
    private toastService:HotToastService) { }

  ngOnInit(): void {
    this.getAll();
  }

  async getAll(){
    (await this.forwardedReplieService.getAll()).subscribe((response)=>{
      this.forwardedReplies = response;
      this.isDataNull = false;
    })
  }

  async deleteForwardedReplie(forwardedReplie: ForwardedReplie){
    (await this.forwardedReplieService.delete(forwardedReplie)).subscribe(()=>{
        this.toastService.show("Silindi")
        this.getAll();
    })
  }

}
