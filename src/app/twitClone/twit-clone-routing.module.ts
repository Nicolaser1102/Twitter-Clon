import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';

const routes: Routes = [{

  path:'',
  component: LayoutPageComponent,
  children:[
  {
      path:'home',
      component: HomePageComponent
  },
  {
    path:'user',
    component: UserPageComponent
  },
  {
    path:'**',
    redirectTo: 'home'
  }
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TwitCloneRoutingModule { }
