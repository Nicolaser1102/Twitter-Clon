import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Pipe({
  name: 'userProfileImage'
})
export class UserProfileImagePipe implements PipeTransform {

  transform(user:User): string {

    if (!user.profilePicture){
      return 'assets/no-image.png';
    }
    else {
      return user.profilePicture; //https:///google.com/flash.jpg
      }

  }

}
