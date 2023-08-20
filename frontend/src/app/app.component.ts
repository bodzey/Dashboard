import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ICategory } from './models/category';
import { IPost } from './models/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private http: HttpClient) {
    this.loadPosts();
    this.loadCategories();
  }
  posts: IPost[] = [];
  categories: ICategory[] = [];

  loadPosts() {
    this.http
      .get('http://localhost:5000/api/Post/getAllPosts')
      .subscribe((posts: any) => {
        this.posts = posts.Payload;
        console.log(posts.Payload);
      });
  }
  loadCategories() {
    this.http
      .get('http://localhost:5000/api/Category/allCategories')
      .subscribe((categories: any) => {
        this.categories = categories.Payload;
        console.log(categories.Payload);
      });
  }
}
