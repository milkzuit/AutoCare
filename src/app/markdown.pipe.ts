import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  async transform(value: string): Promise<SafeHtml> {
    if (!value) return '';

    try {
      // Ensure that you await the result if it's a promise
      const html = await marked(value);  // Await if it returns a Promise
      return this.sanitizer.bypassSecurityTrustHtml(html);
    } catch (error) {
      console.error('Error converting markdown:', error);
      return '';  // Return an empty string in case of error
    }
  }
}
