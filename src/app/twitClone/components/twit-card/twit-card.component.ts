import { Component, Input, OnInit } from '@angular/core';
import { Twit } from '../../interfaces/twit.interface';
import { TwitClonService } from '../../services/twitClone.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'twitClone-twit-card',
  templateUrl: './twit-card.component.html',
  styles: [
  ]
})
export class TwitCardComponent implements OnInit{

  constructor(private twitClonService:TwitClonService){
  }

  @Input()
  public twit!:Twit;

  @Input()
  public user?:User;



  ngOnInit(): void {


    this.twitClonService.getTUserByTwit(this.twit).subscribe(
      user =>{
        this.user = user;
      }
    )
  }

  value: any;

    justifyOptions: any[] = [
        { icon: 'pi pi-heart', justify: 'Left' },
        { icon: 'pi pi-comment', justify: 'Right' },
        { icon: 'pi pi-bookmark', justify: 'Center' },
        { icon: 'pi pi-arrow-right-arrow-left', justify: 'Justify' }
    ];
}
