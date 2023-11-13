import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit {

  items: MenuItem[] | undefined;

  ngOnInit() {
      this.items = [
          {
              label: 'Home',
              icon: 'pi pi-home',
              routerLink:"/"
          },
          {
              label: 'Perfil',
              icon: 'pi pi-user',
              routerLink:"user"
          },
          {
              label: 'Seguidores',
              icon: 'pi pi-heart'
          }
      ];
  }
}
