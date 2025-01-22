import { AfterViewInit, Component, EventEmitter, model, Output } from '@angular/core';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent{
 
  constructor() { }
// responsiveOptions: CarouselResponsiveOptions[]|undefined;
  // ngAfterViewInit() {
  //   this.loadScript('assets/js/main.js');
  // }

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
  getSeverity(): string {
    // logic to determine severity
    return 'success'; 
  }

 
    images = [
      { itemImageSrc: 'assets\\images\\landing\\carousel-1.jpg', thumbnailImageSrc: 'assets\\images\\landing\\carousel-1.jpg' },
      { itemImageSrc: 'assets\\images\\landing\\carousel-2.jpg', thumbnailImageSrc: 'assets\\images\\landing\\carousel-2.jpg' },
      { itemImageSrc: 'assets\\images\\landing\\carousel-3.jpg', thumbnailImageSrc: 'assets\\images\\landing\\carousel-3.jpg' }
    ];
  
    responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '600px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }


