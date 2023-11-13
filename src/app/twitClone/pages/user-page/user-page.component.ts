import { Component, OnInit } from '@angular/core';
import { Twit } from '../../interfaces/twit.interface';
import { TwitClonService } from '../../services/twitClone.service';
import { User } from '../../interfaces/user.interface';
import { switchMap, pipe } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth-service.service';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styles: [
  ]
})
export class UserPageComponent implements OnInit{

    public twits: Twit[] =  [];
    public user?: User;

    //Inyección del servicio
    constructor(private twitClonService: TwitClonService,
                private authService:AuthService ){}


    ngOnInit(): void {
                  this.user =  this.authService.currentUser

                  this.twitClonService.getTwits().pipe(
                    switchMap((twits) => this.twitClonService.filterTwitsByUserId(this.user!.id, twits ))
                  ).subscribe(twits=> {
                    this.twits = twits
                  })
                      }







  }

