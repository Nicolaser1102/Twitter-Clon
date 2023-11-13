import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateGuard, canMatchGuard } from './auth/guards/auth.guard';

const routes: Routes = [{
  path:'twitClon',
  loadChildren: () => import('./twitClone/twit-clone.module').then(m=>m.TwitCloneModule),
  canActivate: [canActivateGuard], //Anclamos la función del canActive
  canMatch: [canMatchGuard], //Anclamos la función del canMatch
},
{
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
},
{
  path: '',
  redirectTo: 'twitClon',
  pathMatch: 'full',
},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
