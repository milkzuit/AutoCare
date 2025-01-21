import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements AfterViewInit{
  ngAfterViewInit() {
    this.loadScript('assets/js/main.js');
  }

  loadScript(scriptUrl: string): void {
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => {
      console.log('Script loaded successfully!');
    };
    script.onerror = (error) => {
      console.error('Error loading script:', error);
    };
    document.body.appendChild(script);
  }
}
