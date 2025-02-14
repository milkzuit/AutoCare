import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProductService } from './product.service';

interface Purchase {
  userId: number;
  totalAmount: number;
}

@Component({
  selector: 'app-user-spend-chart',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css'],
})
export class DummyComponent implements OnInit {
  productForm: FormGroup;
  categories = [
    'Periodic Services',
    'AC Service and Repair',
    'Batteries',
    'Tyres and Wheel Care',
    'Denting and Painting',
    'Detailing Services',
    'Car Spa and Cleaning',
    'Car Inspections',
    'Windshields and Lights',
    'Suspension and Fitments',
    'Clutch and Body Parts',
    'Insurance Claims',
    'SOS Service',
  ];
  isSubmitting = false;
  submitMessage = '';

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      category: ['', Validators.required],
      serviceHeading: ['', Validators.required],
      serviceName: ['', Validators.required],
      tag: [''],
      timeTag: ['', Validators.required],
      img: ['', Validators.required],
      serviceInfo: this.fb.array([]),
      serviceList: this.fb.array([]),
      price: ['', [Validators.required, Validators.min(0)]],
      originalPrice: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    // Add initial empty fields for serviceInfo and serviceList
    this.addServiceInfo();
    this.addServiceList();
  }

  get serviceInfo() {
    return this.productForm.get('serviceInfo') as FormArray;
  }

  get serviceList() {
    return this.productForm.get('serviceList') as FormArray;
  }

  addServiceInfo() {
    this.serviceInfo.push(this.fb.control('', Validators.required));
  }

  removeServiceInfo(index: number) {
    this.serviceInfo.removeAt(index);
  }

  addServiceList() {
    this.serviceList.push(this.fb.control('', Validators.required));
  }

  removeServiceList(index: number) {
    this.serviceList.removeAt(index);
  }

  async onSubmit() {
    if (this.productForm.valid) {
      this.isSubmitting = true;
      this.submitMessage = '';

      try {
        // Convert price and originalPrice to BigInt
        const formValue = {
          ...this.productForm.value,
          price: BigInt(this.productForm.value.price),
          originalPrice: BigInt(this.productForm.value.originalPrice),
        };

        await this.productService.createProduct(formValue).toPromise();
        this.submitMessage = 'Product added successfully!';
        this.productForm.reset();
        this.resetArrays();
      } catch (error) {
        this.submitMessage = 'Error adding product. Please try again.';
        console.error('Error:', error);
      } finally {
        this.isSubmitting = false;
      }
    } else {
      this.submitMessage = 'Please fill all required fields correctly.';
    }
  }

  private resetArrays() {
    while (this.serviceInfo.length) {
      this.serviceInfo.removeAt(0);
    }
    while (this.serviceList.length) {
      this.serviceList.removeAt(0);
    }
    this.addServiceInfo();
    this.addServiceList();
  }
}
