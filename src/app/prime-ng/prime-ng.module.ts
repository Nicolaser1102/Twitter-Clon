import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { ToolbarModule } from 'primeng/toolbar';
import {CardModule} from 'primeng/card';
import {FieldsetModule}from 'primeng/fieldset';
import {PanelModule} from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { MenuModule } from 'primeng/menu';

import { SidebarModule } from 'primeng/sidebar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DividerModule } from 'primeng/divider';
import { SplitterModule } from 'primeng/splitter';
import { ImageModule } from 'primeng/image';
import { AvatarModule } from 'primeng/avatar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { MessagesModule } from 'primeng/messages';

import { ToastModule } from 'primeng/toast';







@NgModule({
  exports: [
    MenuModule,
    ButtonModule,
    CardModule,
    FieldsetModule,
    MenubarModule,
    PanelModule,
    ToolbarModule,
    TableModule,
    MenuModule  ,
    SidebarModule,
    InputTextareaModule,
    DividerModule,
    SplitterModule,
    ImageModule,
    AvatarModule,
    SelectButtonModule,
    ToggleButtonModule,
    MessagesModule,
    ToastModule


  ]
})
export class PrimeNgModule { }
