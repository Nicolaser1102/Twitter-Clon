import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'twitClone-user-information',
  templateUrl: './user-information.component.html',
  styles: [
    ` .circular--landscape { display: inline-block; position: relative; width: 100%; height: 100%; overflow: hidden; border-radius: 50%; }
      .circular--landscape img { width: auto; height: 100%; margin-left: -50px; }
      .cover--img { width: 100%; height: 100%; margin-top: -50px;}
    `
  ]
})
export class UserInformationComponent implements OnInit{



  @Input()
  public user?:User;

  ngOnInit(): void {
    if (!this.user) throw Error('User property is required');
}

}
