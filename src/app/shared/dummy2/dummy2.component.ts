import { Component } from '@angular/core';
import { NewsService } from '../../news.service';

@Component({
  selector: 'app-dummy2',
  templateUrl: './dummy2.component.html',
  styleUrl: './dummy2.component.css',
})
export class Dummy2Component {
  newsArticles: any[] = [];
  page = 1;
  pageSize = 5; // Number of articles to load at a time
  loading = false;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews(): void {
    this.loading = true;
    this.newsService.getNews(this.page, this.pageSize).subscribe((data) => {
      this.newsArticles = this.newsArticles.concat(data.articles);
      this.loading = false;
    });
  }

  onScroll(): void {
    this.page++;
    this.loadNews();
  }
}
