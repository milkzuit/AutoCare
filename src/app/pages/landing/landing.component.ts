import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent implements AfterViewInit {
  ngAfterViewInit() {
    this.loadScript('assets/js/main.js');
  }

  images = [
    {
      src: 'assets/images/brands/b.png',
      title: 'SMOOTH ENGINE',
      subtitle: 'Keep Your Engine Running Smoothly',
    },
    {
      src: 'assets/images/brands/c.png',
      title: 'SAFE STOPS',
      subtitle: 'Safety First with Reliable Brakes',
    },
    {
      src: 'assets/images/brands/d.png',
      title: 'TIRE CARE',
      subtitle: 'Maximize Tire Lifespan and Performance',
    },
    {
      src: 'assets/images/brands/e.png',
      title: 'POWER UP',
      subtitle: 'Don’t Let a Dead Battery Stop You',
    },
    {
      src: 'assets/images/brands/g.png',
      title: 'ENGINE HEALTH',
      subtitle: 'Get to the Heart of the Problem',
    },
    {
      src: 'assets/images/brands/i.png',
      title: 'CLIMATE CONTROL',
      subtitle: 'Stay Comfortable All Year Long With Flawless AC',
    },
    {
      src: 'assets/images/brands/j.png',
      title: 'GEAR SMOOTH',
      subtitle: 'Smooth Shifting for Optimal Performance',
    },
    {
      src: 'assets/images/brands/k.png',
      title: 'RIDE COMFORT',
      subtitle: 'Drive with Comfort and Control',
    },
    {
      src: 'assets/images/brands/l.png',
      title: 'FLUID CARE',
      subtitle: 'Maintain All Key Systems',
    },
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

  quoteForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private quoteService: DataService,
    private http: HttpClient
  ) {
    this.quoteForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
    });
  }

  // Forms
  // - get quote
  onSubmit() {
    if (this.quoteForm.valid) {
      this.quoteService.submitQuote(this.quoteForm.value).subscribe({
        next: (response: any) => {
          this.successMessage = 'Request sent successfully!';
          this.errorMessage = '';
          this.quoteForm.reset(); // Clear form after successful submission
        },
        error: (error: any) => {
          this.errorMessage = 'Failed to send request. Please try again.';
          this.successMessage = '';
          console.error('eeeeeeeeeeer', error);
        },
      });
    } else {
      this.errorMessage = 'Please fill all required fields correctly.';
      this.successMessage = '';
    }
  }

  // - news letter
  name: string = '';
  email: string = '';

  submitNewsLetter() {
    const formData = {
      name: this.name,
      email: this.email,
    };

    this.http
      .post('http://localhost:8080/api/newsLetterModels', formData)
      .subscribe({
        next: (response) => {
          console.log('Success!', response);
          alert('Subscribed successfully!');
        },
        error: (error) => {
          console.error('Error!', error);
          alert('Something went wrong!');
        },
      });
  }
}
