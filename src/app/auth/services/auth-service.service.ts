import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { User } from 'src/app/twitClone/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user?:User;
  private filterUsers: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private followingSuuggestions: User[] = [];
  private baseUrl:string = 'http://localhost:3000';
  private idUserLogued:string = "3";


  constructor(private http: HttpClient) { }

get currentUser(): User | undefined{
  if(!this.user) return undefined;
  return structuredClone(this.user);
}

get followingSuggestions(): User[] | undefined{
  if(!this.followingSuuggestions) return undefined;
  return structuredClone(this.followingSuuggestions);
}


login( email:string, password:string): Observable<User>{


  this.getUsers().subscribe( users =>{

    users.forEach( user => {
      if (user.email == email && user.password == password ){
        this.idUserLogued = user.id
        console.log("Pasé por aquí y mi valor es:", this.idUserLogued)
      }
    })
  })


  return this.http.get<User>(`${this.baseUrl}/users/${this.idUserLogued}`)
  .pipe(
    tap(user => this.user = user),
    tap( user => {
      //Guardar el usuario en el local storage
      localStorage.setItem('token', user.id.toString())
    }),
  )
}

checkAuthentication():Observable<boolean>  {

  if(!localStorage.getItem('token')) return of(false)

  const token = localStorage.getItem('token');

  return this.http.get<User>(`${this.baseUrl}/users/${this.idUserLogued}`)
  .pipe(
    tap(user => this.user = user),
    //Con el map tranforma el observable user a un observable booleano según si tiene data o no (verdadero o falso)
    map(user => !!user),
    catchError(err => of(false))
  );

}

getUsers(): Observable<User[]>{
  return this.http.get<User[]>(`${this.baseUrl}/users`);
}


getFollowingSuggestions(currentUser:User, AllSuggestions: User[]):Observable<User[]>{
      this.followingSuuggestions = [];
      AllSuggestions.forEach(user => {
          if(user.id != currentUser.id){
            this.followingSuuggestions.push(user)
          }
        });
        return this.filterUsers = new BehaviorSubject<User[]>(this.followingSuuggestions);
}


updateCurrentUser(updatedUser: User) {
  this.user = updatedUser;
}

//Funciones CRUD

addUser(user:User): Observable<User>{
  return this.http.post<User>(`${this.baseUrl}/users`, user);
}



logout():void{
  localStorage.clear();
  this.user = undefined;
}


}
