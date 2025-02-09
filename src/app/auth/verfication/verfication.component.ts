import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormArray,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verification',
  templateUrl: './verfication.component.html',
  styleUrls: ['./verfication.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class VerficationComponent implements OnInit, OnDestroy {
  verificationForm: FormGroup;
  email: string = '';
  isCodeSent: boolean = false;
  showResendTimer: boolean = false;
  resendTimer: number = 30;
  private timerInterval: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.verificationForm = this.fb.group({
      code: this.fb.array([
        ['', [Validators.required, Validators.pattern('[0-9]')]],
        ['', [Validators.required, Validators.pattern('[0-9]')]],
        ['', [Validators.required, Validators.pattern('[0-9]')]],
        ['', [Validators.required, Validators.pattern('[0-9]')]],
      ]),
    });
  }

  get codeArray(): FormArray {
    return this.verificationForm.get('code') as FormArray;
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'] || localStorage.getItem('email') || '';
      if (this.email) {
        this.sendVerificationCode();
      }
    });
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  startResendTimer() {
    this.showResendTimer = true;
    this.resendTimer = 30;

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.timerInterval = setInterval(() => {
      if (this.resendTimer > 0) {
        this.resendTimer--;
      } else {
        this.showResendTimer = false;
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  sendVerificationCode() {
    this.http
      .post<any>('http://localhost:8080/api/send-verification', {
        email: this.email,
      })
      .subscribe({
        next: (response) => {
          this.isCodeSent = true;
          alert('Verification code sent to your email!');
          this.startResendTimer();
        },
        error: (error) => {
          alert('Failed to send verification code. Please try again.');
        },
      });
  }

  verifyCode(): void {
    const enteredCode = this.verificationForm.value.code.join('');
    if (enteredCode.length !== 4) {
      alert('Please enter all 4 digits');
      return;
    }

    this.http
      .post<any>('http://localhost:8080/api/verify-code', {
        email: this.email,
        code: enteredCode,
      })
      .subscribe({
        next: (response) => {
          // alert('Code verified successfully!');
          // Success example
          Swal.fire({
            icon: 'success',
            title: 'Verified!',
            text: 'Your email has been successfully verified.',
            confirmButtonColor: '#ffd700', // Matches your yellow theme
            background: '#112240', // Matches your dark theme
            color: '#ccd6f6', // For text color
          });
          this.router.navigate(['/reset-password'], {
            queryParams: { email: this.email, token: response.token },
          });
        },
        error: (error) => {
          // alert('Invalid verification code. Please try again.');
          // Error example
          Swal.fire({
            icon: 'error',
            title: 'Verification Failed',
            text: 'Please check your code and try again.',
            confirmButtonColor: '#ffd700',
            background: '#112240',
            color: '#ccd6f6',
          });
          // Clear inputs on error
          this.verificationForm.reset();
          const firstInput = document.querySelector(
            '.code-input'
          ) as HTMLInputElement;
          firstInput?.focus();
        },
      });
  }

  resendCode(): void {
    if (!this.showResendTimer) {
      this.sendVerificationCode();
    }
  }

  handlePaste(event: ClipboardEvent): void {
    event.preventDefault();
    const clipboardData = event.clipboardData?.getData('text');

    if (clipboardData) {
      const numbers = clipboardData.replace(/\D/g, '').slice(0, 4);
      const codeArray = this.verificationForm.get('code') as FormArray;

      for (let i = 0; i < numbers.length && i < 4; i++) {
        codeArray.at(i).setValue(numbers[i]);
      }

      const nextEmptyIndex = codeArray.controls.findIndex(
        (control) => !control.value
      );
      const inputToFocus = document.querySelectorAll('.code-input')[
        nextEmptyIndex !== -1 ? nextEmptyIndex : 3
      ] as HTMLInputElement;
      inputToFocus?.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    if (
      event.key === 'Backspace' &&
      index > 0 &&
      !this.verificationForm.value.code[index]
    ) {
      event.preventDefault();
      const codeArray = this.verificationForm.get('code') as FormArray;
      codeArray.at(index - 1).setValue('');
      const prevInput = document.querySelectorAll('.code-input')[
        index - 1
      ] as HTMLInputElement;
      prevInput?.focus();
    }
  }

  onInputChange(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    const lastChar = value.slice(-1);

    if (lastChar && !/^\d+$/.test(lastChar)) {
      input.value = this.verificationForm.value.code[index];
      return;
    }

    const codeArray = this.verificationForm.get('code') as FormArray;
    codeArray.at(index).setValue(lastChar);
    input.value = lastChar;

    if (lastChar && index < codeArray.length - 1) {
      const nextInput = document.querySelectorAll('.code-input')[
        index + 1
      ] as HTMLInputElement;
      nextInput?.focus();
    }
  }
}
