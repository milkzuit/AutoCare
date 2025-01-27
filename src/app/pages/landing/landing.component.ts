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

  images = [
    { src: 'assets/images/brands/b.png', title: 'Service 1', subtitle: 'Description 1' },
    { src: 'assets/images/brands/c.png', title: 'Service 2', subtitle: 'Description 2' },
    { src: 'assets/images/brands/d.png', title: 'Service 3', subtitle: 'Description 3' },
    { src: 'assets/images/brands/e.png', title: 'Service 4', subtitle: 'Description 4' },
    { src: 'assets/images/brands/g.png', title: 'Service 6', subtitle: 'Description 6' },
    { src: 'assets/images/brands/i.png', title: 'Service 8', subtitle: 'Description 8' },
    { src: 'assets/images/brands/j.png', title: 'Service 9', subtitle: 'Description 9' },
    { src: 'assets/images/brands/k.png', title: 'Service 10', subtitle: 'Description 10' },
    { src: 'assets/images/brands/l.png', title: 'Service 11', subtitle: 'Description 11' },

  ];

  currentImageIndex: number = 0;

  ngOnInit(): void {
    setInterval(() => {
      this.nextImage();
    }, 4000); // Change image every 4 seconds
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
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
