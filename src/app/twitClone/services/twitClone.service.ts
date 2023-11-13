import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Twit } from '../interfaces/twit.interface';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { AuthService } from '../../auth/services/auth-service.service';



@Injectable({
  providedIn: 'root'
})
export class TwitClonService implements OnInit{

  private baseUrl = 'http://localhost:3000';



  private filterTwits: BehaviorSubject<Twit[]> = new BehaviorSubject<Twit[]>([]);
  private concatenatedTwits: BehaviorSubject<Twit[]> = new BehaviorSubject<Twit[]>([]);

  private arrayFilterTwits: Twit[] = [];
  private currentListFollowers: User[] = [];

  constructor(private http: HttpClient,
              private authService:AuthService) {}

  ngOnInit(): void { }


  getTwits(): Observable<Twit[]>{
    return this.http.get<Twit[]>(`${this.baseUrl}/twits`);
  }

  getTUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  getTUserByTwit(twit: Twit): Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/users/${twit.id_user}`);
  }

  getTUserById(user: Twit): Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/users/${user.id}`);
  }



  filterTwitsByUserId(userID: string, AllTwits: Twit[]):Observable<Twit[]> {
    this.arrayFilterTwits = [];
    AllTwits.forEach(twit => {
      if(twit.id_user == userID && twit){
        this.arrayFilterTwits.push(twit)
      }
    });
    return this.filterTwits = new BehaviorSubject<Twit[]>(this.arrayFilterTwits);
  }



  //Funciones crud
  addTwit(twit:Twit): Observable<Twit>{
    return this.http.post<Twit>(`${this.baseUrl}/twits`, twit);
  }


  updateListFollowersUser(user:User, newFollower: User): Observable<User>{

    this.currentListFollowers  = this.authService.currentUser!.followers;
    this.currentListFollowers.push(newFollower);

    console.log('Este es el id',user.id);

    if(!user.id)throw Error('User id is required');
    return this.http.patch<User>(`${this.baseUrl}/users/${user.id}`, { followers:this.currentListFollowers});
  }


}
