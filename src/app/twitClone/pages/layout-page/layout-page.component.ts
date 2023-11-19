import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth-service.service';
import { switchMap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { TwitClonService } from '../../services/twitClone.service';
import {  Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ],
  providers: [MessageService]
})
export class LayoutPageComponent implements OnInit{

  public switch:boolean = true;
  public suggestions: User[] =  [];

  public user?: User;

  public alreadyFollowList: User[] = [];
  formGroup!: FormGroup;


  constructor(private authService:AuthService,
              private twitCloneService: TwitClonService,
              private router: Router,
              private messageService: MessageService,){
  }

  ngOnInit(): void {
    this.user =  this.authService.currentUser;

    this.alreadyFollowList = this.user!.followers;

      //False es para que se muestre que ya esta siguiendo
      //True es para que se muestre la opción de seguir
    this.formGroup = new FormGroup({
      notFollowed: new FormControl<boolean>(true),
      alreadyFollowed: new FormControl<boolean>(false)
    });

    this.authService.getUsers().pipe(
      switchMap((users) => this.authService.getFollowingSuggestions(this.user!, users ))
    ).subscribe(suggestions=> {
      this.suggestions = suggestions
    });
  }


  followSuggestion(suggestion:User):void{
    this.twitCloneService.updateListFollowersUser(this.user!,suggestion).subscribe((userUpdated) => {

      this.messageService.add({ key: 'tl', severity: 'success', summary: 'Siguiendo', detail: `a ${suggestion.username}` });
      this.authService.updateCurrentUser(userUpdated)

      this.router.navigate(['/twitClon/user'])
      this.alreadyFollowList =  userUpdated.followers;
    })
  }


  verificarUser(user:User):boolean{
  //False es para que se muestre que ya esta siguiendo
  //True es para que se muestre la opción de seguir
  this.formGroup = new FormGroup({
  notFollowed: new FormControl<boolean>(true),
  alreadyFollowed: new FormControl<boolean>(false)
  });

    this.switch = true;

    this.alreadyFollowList!.forEach(
          follower => {
            if(follower.id === user.id){
              this.switch = false;
           }
          }
        )
        return this.switch;
  }

  onLogOut():void{
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }



  }


