import { Component, Input, ViewChild } from '@angular/core';
import { IPost } from 'src/app/models/post';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
})
export class ArticleComponent {
  @Input() post: IPost;

  @ViewChild('p') p: any;
  @ViewChild('button') button: any;

  showDescription(description: string) {
    this.p.nativeElement.innerText = description;
    this.button.nativeElement.style.display = 'none';
  }
}
