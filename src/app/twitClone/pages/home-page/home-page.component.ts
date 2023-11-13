import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth-service.service';
import { TwitClonService } from '../../services/twitClone.service';

import { User } from '../../interfaces/user.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { Twit } from '../../interfaces/twit.interface';
import { forkJoin, switchMap, of, Observable } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styles: [
  ],
  providers: [MessageService]
})
export class HomePageComponent implements OnInit{

  //Propiedad que apunta a un formulario reactivo
  //Formulario

  twitForm!: FormGroup;

  public twitsRecuperados: Twit[] =  [];
  public list1?: Observable<Twit[]>;

  public twitsActualUser: Twit[] =  [];
  public list2?: Observable<Twit[]>;


  public twits?: Twit[];

  public user?: User;
  public userByTwit?: User;


  constructor(private authService: AuthService,
              private twitClonService:TwitClonService,
              private messageService: MessageService ){

  }

  get currentUser():User{
    return this.authService.currentUser!;
  }

  get todayDate():Date{
    const date: Date = new Date;
    return date;
  }

  get twitToPost():Twit{
    const twit= this.twitForm.value as Twit;
    return twit;
  }


    ngOnInit(): void {

      const currentUser = of(this.currentUser);

      currentUser.subscribe(
        user => {
          this.user = user


      this.twitForm = new FormGroup({
        id: new FormControl(''),
        id_user: new FormControl(this.user!.id),
        text: new FormControl(''),
        date: new FormControl(this.todayDate)
      });



      this.user!.followers.forEach(
        follower => {
          this.twitClonService.getTwits().pipe(
            switchMap((twits) => this.twitClonService.filterTwitsByUserId(follower.id, twits ))
          ).subscribe((twits)=> {

            twits.forEach(
              (twit) => {
                this.twitsRecuperados.push(twit)
              }
            )
            console.log('Twits recuperados:', this.twitsRecuperados)
            this.list1 = of(this.twitsRecuperados);
          });
        }
      );


      this.twitClonService.getTwits().pipe(
        switchMap((twits) => this.twitClonService.filterTwitsByUserId(user.id, twits ))
      ).subscribe(twits=> {

        this.twitsActualUser = twits ;
        console.log('twits que son del perfil actual', this.twitsActualUser)
        this.list2 = of(this.twitsRecuperados);

      let data1 = of(this.twitsRecuperados);
      let data2 = of(this.twitsActualUser);

      forkJoin([
        data1,data2]
      ).subscribe((results) => {
        let obj2 = [...results[1]];
        let obj1 = results[0].concat(obj2 as []);

        this.twits = obj1;
        console.log(this.twits,'Los twits a renderizar');
      });
      });





    }
    )





    }



    onSubmit():void{
      if(this.twitForm.invalid) return;

      this.twitClonService.addTwit(this.twitToPost)
      .subscribe( twit => {
          this.messageService.add({key: 'bc', severity:'success', summary:'Posteado', detail:'Tu twit fue exitosamente publicado'});
      });

      this.twitClonService.getTwits().subscribe(
        twits => {
          this.twits = twits
        }
      )

    }

}
