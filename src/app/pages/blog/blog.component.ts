import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent {
  news: any[] = [];
  apiUrl: string =
    'https://newsapi.org/v2/everything?q=car&apiKey=3472d5e6cd7f4cc090794e0e2764c757';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchNews();
  }

  fetchNews(): void {
    this.http.get(this.apiUrl).subscribe((response: any) => {
      this.news = response.articles.filter(
        (article: any) =>
          article.title &&
          (article.title.toLowerCase().includes('service') ||
            article.title.toLowerCase().includes('model'))
      );
    });
  }
}
