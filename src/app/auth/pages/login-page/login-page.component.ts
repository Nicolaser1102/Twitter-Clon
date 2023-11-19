import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/twitClone/interfaces/user.interface';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ],
  providers: [MessageService]
})
export class LoginPageComponent {

  constructor(private authService:AuthService,
              private router:Router,

              private messageService: MessageService
    ){}

    get todayDate():Date{
    const date: Date = new Date;
    return date;
  }

  get userToPost():User{
    const user= this.myForm.value as User;
    return user;
  }

  public myLoginForm: FormGroup = new FormGroup({
    email: new FormControl('',[ Validators.required, Validators.minLength(3)]),
    password: new FormControl('',[ Validators.required, Validators.minLength(3)]),
  });

  isValidField(field:string){
    return this.myLoginForm.controls[field].errors
    && this.myLoginForm.controls[field].touched;
  }


    public myForm: FormGroup = new FormGroup({
      //nombre: Instancia de la clase (Valor por defecto , validaciones sincronas, validaciones Asíncronas)
      // name: new FormControl('', [], []),
      id: new FormControl(''),
      username: new FormControl(''),
      nickname:     new FormControl(''),
      description:     new FormControl(''),
      creationAccountDate: new FormControl(this.todayDate),
      n_followers:     new FormControl(0),
      n_followed: new FormControl(0),
      profilePicture:      new FormControl(''),
      coverPicture:  new FormControl(0),
      twits: new FormControl([]),
      followers: new FormControl([]),
    });

onLogin():void{

  if(this.myLoginForm.invalid) {
    this.myForm.markAllAsTouched();
    return;
  }
  this.authService.login(this.myLoginForm.get('email')!.value, this.myLoginForm.get('password')!.value)
  .subscribe( user => {
    this.router.navigateByUrl('/')
} );

}

onSubmit():void{
  if(this.myForm.invalid) return;

  this.authService.addUser(this.userToPost)
  .subscribe( user => {
      this.messageService.add({key: 'new-user-confirmation', severity:'success', summary:'Registrado', detail:'Te has registrado con éxito'});
  });


}



}
