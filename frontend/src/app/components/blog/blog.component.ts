import { Component, Input, ViewChild } from '@angular/core';
import { Config, ConfigService } from './blog.service';
import { IPost } from '../../models/post';
import { HttpClient } from '@angular/common/http';
import { ICategory } from 'src/app/models/category';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  providers: [ConfigService],
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent {
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
