import { Component, Input, ViewChild } from '@angular/core';
import { IPost } from 'src/app/models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
})
export class PostComponent {
  @Input() post: IPost;

  @ViewChild('p') p: any;
  @ViewChild('button') button: any;

  showDescription(description: string) {
    this.p.nativeElement.innerText = description;
    this.button.nativeElement.style.display = 'none';
  }
}
