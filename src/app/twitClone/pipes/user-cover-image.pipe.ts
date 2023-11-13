import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Pipe({
  name: 'userCoverImage'
})
export class UserCoverImagePipe implements PipeTransform {

  transform(user:User): string {

    if (!user.coverPicture){
      return 'https://f4.bcbits.com/img/a1306246190_10.jpg';
    }
    else {
      return user.coverPicture; //https:///google.com/flash.jpg
      }

  }

}
