import { Component, Input } from '@angular/core';
import { ICategory } from 'src/app/models/category';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() categories: ICategory[];

  showPostsByCategory(categoryName: string) {
    console.log(categoryName);
  }
}
