import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'shared-annexes-menu',
  templateUrl: './annexes-menu.component.html',
  styles: [
  ]
})
export class AnnexesMenuComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
      this.items = [
          {
              label: '',
              icon: 'pi pi-image',
          },
          {
              label: '',
              icon: 'pi pi-camera',
          },
          {
              label: '',
              icon: 'pi pi-paperclip',
          },
          {
              label: '',
              icon: 'pi pi-fw pi-calendar',
          }
      ];
  }
}
