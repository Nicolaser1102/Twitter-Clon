import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { MenuComponent } from './components/menu/menu.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { AnnexesMenuComponent } from './components/annexes-menu/annexes-menu.component';



@NgModule({
  declarations: [
    MenuComponent,
    SearchBoxComponent,
    AnnexesMenuComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports: [
    MenuComponent,
    SearchBoxComponent,
    AnnexesMenuComponent
  ]
})
export class SharedModule { }
