import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TwitCloneRoutingModule } from './twit-clone-routing.module';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared/shared.module';
import { TwitCardComponent } from './components/twit-card/twit-card.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { UserInformationComponent } from './components/user-information/user-information.component';
import { UserProfileImagePipe } from './pipes/user-profile-image.pipe';
import { UserCoverImagePipe } from './pipes/user-cover-image.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomePageComponent,
    UserPageComponent,
    TwitCardComponent,
    LayoutPageComponent,
    UserInformationComponent,
    UserProfileImagePipe,
    UserCoverImagePipe
  ],
  imports: [
    CommonModule,
    TwitCloneRoutingModule,
    PrimeNgModule,
    SharedModule,

    ReactiveFormsModule,
    FormsModule
  ]
})
export class TwitCloneModule { }
