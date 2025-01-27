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
  // points = [
  //   { name: 'Car Washing Point', address: '123 Street, New York, USA', phone: '+012 345 6789' },
  //   { name: 'Car Washing Point', address: '456 Avenue, Los Angeles, USA', phone: '+012 345 6789' },
  //   { name: 'Car Washing Point', address: '789 Road, Chicago, USA', phone: '+012 345 6789' },
  //   // Add more points as needed (up to 25 or more)
  // ];
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
