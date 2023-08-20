import { Component, Input } from '@angular/core';
import { IPost } from 'src/app/models/post';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Input() posts: IPost[];
}
