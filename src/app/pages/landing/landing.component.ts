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

  services = [
    { imgSrc: 'assets/images/landing/1.png', title: 'Periodic Services' },
    { imgSrc: 'assets/images/landing/18.png', title: 'AC Service and Repair' },
    { imgSrc: 'assets/images/landing/19.png', title: 'Batteries' },
    { imgSrc: 'assets/images/landing/15.png', title: 'Tyres and Wheel Care' },
    { imgSrc: 'assets/images/landing/16.png', title: 'Denting and Painting' },
    { imgSrc: 'assets/images/landing/17.png', title: 'Detailing Services' },
    { imgSrc: 'assets/images/landing/10.png', title: 'Car Spa and Cleaning' },
    { imgSrc: 'assets/images/landing/13.png', title: 'Car Inspection' },
    {
      imgSrc: 'assets/images/landing/14.png',
      title: 'Wind Shields and Lights',
    },
    { imgSrc: 'assets/images/landing/9.png', title: 'Suspension and Fitments' },
    { imgSrc: 'assets/images/landing/11.png', title: 'Clutch and Body Parts' },
    { imgSrc: 'assets/images/landing/12.png', title: 'Insurance Claims' },
  ];

  steps = [
    {
      number: 1,
      title: 'Select The Perfect Car Service',
      text: "From AutoCare's broad portfolio Of services",
      imgSrc: 'assets/images/landing/2.png',
      imgAlt: 'Exterior Washing',
    },
    {
      number: 2,
      title: 'Schedule Free Door-Step Pickup',
      text: 'We offer free pick up and drop for all services booked',
      imgSrc: 'assets/images/landing/4.png',
      imgAlt: 'Interior Washing',
    },
    {
      number: 3,
      title: 'Track Your Car Service Real-Time',
      text: 'We will take care of everything from here..Be Worry Free',
      imgSrc: 'assets/images/landing/3.png',
      imgAlt: 'Vacuum Cleaning',
    },
    {
      number: 4,
      title: 'Earn While We Service Your Car',
      text: 'Spread the word! You get 40% off. Your friends get Rs.700',
      imgSrc: 'assets/images/landing/5.png',
      imgAlt: 'Engine Detailing',
    },
  ];

  locations = [
    {
      address: '123, Amman koil street, New York, USA',
      phone: '+012 345 6789',
    },
    {
      address: '4/90, Vivekanandra Theru, Dubai',
      phone: '+012 345 6789',
    },
    {
      address: 'Pisasupatti street, North Korea, NK',
      phone: '+012 345 6789',
    },
    {
      address: 'Valuuvar street, Valluvarkottam, England',
      phone: '+012 345 6789',
    },
    {
      address: '123 Street, New York, USA',
      phone: '+012 345 6789',
    },
    {
      address: '123 Street, New York, USA',
      phone: '+012 345 6789',
    },
    {
      address: '123 Street, New York, USA',
      phone: '+012 345 6789',
    },
    {
      address: '123 Street, New York, USA',
      phone: '+012 345 6789',
    },
    {
      address: '123 Street, New York, USA',
      phone: '+012 345 6789',
    },
  ];

  testimonials = [
    {
      imgSrc: '../assets/images/landing/testimonial-1.jpg',
      name: 'Akit Kishan',
      reviewSource: 'Google Review',
      text: 'Fantastic service, superb punctuality. Availed their service twice and truly most satisfying. The response of coordinator is prompt and she was greatly supportive. Thanks a lot..!!'
    },
    {
      imgSrc: '../assets/images/landing/testimonial-2.jpg',
      name: 'Manny',
      reviewSource: 'Facebook Review',
      text: 'This is my first time experience with Automechanica. But, I would say the service of Automechanica is much better in comparison to any authorized dealer in terms of quality, service and very reasonable charge. Even, I was surprised to get all updates through WhatsApp photos and videos. Really impressed with the service. I would recommend all my friends to go for Automechanica without a second thought.'
    },
    {
      imgSrc: '../assets/images/landing/testimonial-3.jpg',
      name: 'Eline',
      reviewSource: 'IG Influencer',
      text: 'Experience has been smooth every time I have opted for their services. Best part I think is the door step pickup service which everyone will appreciate. You are being notified about the progress of the work through WhatsApp pics which makes experience very transparent. Staff is helpful and courteous, mechanics are also experienced and skilled based on my experience. Overall I would highly recommend Auto Mechanica for general maintenance and denting and painting. The 2 services which I have availed from them yet.'
    },
    {
      imgSrc: '../assets/images/landing/testimonial-4.jpg',
      name: 'Jade',
      reviewSource: 'Google Review',
      text: 'It is so smooth to deal with AutoMechanica team that ensures best of experience. From picking-up the car from the doorstep to servicing/best of work, all repair work done to satisfaction to returning the car on the promised date. They keep you updated on the progress at their garage. I don\'t have to worry anymore for servicing/repairing/painting of any of my vehicles anymore. AutoMechanica is where I will go, they take away all my stress. Highly recommended! Thank you team!'
    }
  ];

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

  // # Forms
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
          console.error('error', error);
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
