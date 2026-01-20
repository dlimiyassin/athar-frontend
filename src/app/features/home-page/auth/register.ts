import { RegisterDto } from './../../../zBase/security/model/registerDto.model';
import { CommonModule, NgIf, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { UserService } from '../../../zBase/security/service/user.service';
import { AuthService } from '../../../zBase/security/service/auth.service';
import { StringUtil } from '../../../zBase/utils/StringUtil';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    RouterLink,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    ToastModule,
    RippleModule,
    NgClass
  ],
  template: `
    <p-toast />

    <div class="py-10 flex bg-surface-50 dark:bg-surface-950">

      <!-- Left image section -->
      <div class="hidden lg:flex w-1/2 items-center justify-center">
        <img
          src="/assets/landing/signup.png"
          alt="Sign up illustration"
          class="max-w-md w-full object-contain"
        />
      </div>

      <!-- Right form section -->
      <div class="flex w-full lg:w-1/2 items-center justify-center px-4">
        <div class="w-full max-w-lg">

          <div class="bg-white dark:bg-surface-900 rounded-3xl shadow-xl px-8 py-6">

            <!-- Header -->
            <div class="text-center mb-6">
              <h1 class="text-2xl font-semibold text-surface-900 dark:text-surface-0">
                Create your account
              </h1>
              <p class="text-sm text-muted-color mt-1">
                Join the platform in a few seconds
              </p>
            </div>

            <!-- Form -->
            <div class="space-y-4">

              <!-- First Name -->
              <div>
                <label class="block text-sm font-medium mb-1">First Name</label>
                <input
                  pInputText
                  type="text"
                  class="w-full"
                  placeholder="First name"
                  [(ngModel)]="registerDto.firstName"
                />
              </div>

              <!-- Last Name -->
              <div>
                <label class="block text-sm font-medium mb-1">Last Name</label>
                <input
                  pInputText
                  type="text"
                  class="w-full"
                  placeholder="Last name"
                  [(ngModel)]="registerDto.lastName"
                />
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-medium mb-1">Email</label>
                <input
                  pInputText
                  type="email"
                  class="w-full"
                  placeholder="Email address"
                  [(ngModel)]="registerDto.email"
                />
              </div>

              <!-- Phone -->
              <div>
                <label class="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  pInputText
                  type="tel"
                  class="w-full"
                  placeholder="+212..."
                  [(ngModel)]="registerDto.phoneNumber"
                />
              </div>

              <!-- Password -->
              <div>
                <label class="block text-sm font-medium mb-1">Password</label>
                <div class="relative">
                  <input
                    pInputText
                    class="w-full pr-10"
                    [type]="showPassword ? 'text' : 'password'"
                    placeholder="Password"
                    [(ngModel)]="registerDto.password"
                  />
                  <button
                    type="button"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    (click)="togglePasswordVisibility()"
                  >
                    <i
                      class="pi"
                      [ngClass]="showPassword ? 'pi-eye-slash' : 'pi-eye'"
                    ></i>
                  </button>
                </div>
              </div>

              <!-- Submit -->
              <p-button
                styleClass="w-full mt-4"
                [loading]="authService.isLoading"
                (onClick)="register()"
                label="Create Account"
              ></p-button>

              <!-- Footer -->
              <p class="text-center text-sm text-gray-500 pt-6">
                Already have an account?
                <a
                  routerLink="/auth/login"
                  class="font-semibold text-emerald-600 hover:underline ml-1"
                >
                  Sign in
                </a>
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  `
})

export class RegisterPage {


  showPassword = false;
  validFirstName = true;
  validLastName = true;
  validEmail = true;
  validPassword = true;
  validPhoneNumber = true;

  errorMessages: string[] = [];

  constructor(
    private router: Router,
    private messageService: MessageService,
    public authService: AuthService,
    private userService: UserService
  ) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

 

  
  register() {
    console.log("register called");
    
    this.authService.isLoading = true;
    this.validateForm();
    console.log(this.errorMessages);
    
    if (this.errorMessages.length === 0) {
        localStorage.clear();
        this.authService.register(this.registerDto).subscribe({
          next: (rep) => {
                this.authService.isLoading = false;
                this.messageService.add({
                  severity: 'success',
                  summary: 'Account created',
                  detail: 'You can now sign in and complete you profile'
                });
            
                //this.router.navigate(['/auth/login']);
                
               },
          error: (err) => {
            console.log('we are good');
                this.authService.isLoading = false;
                this.messageService.add({
                      severity: 'error',
                      summary: 'Error',
                      detail: err.error.message
                });
              }
            })
      } else {
                this.authService.isLoading = false;
                if(this.errorMessages.length > 0) {
                  this.errorMessages.forEach(err => {
                        this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: err
                    });
                    })
                }
              }
      }
  

validateForm() {
  this.errorMessages = [];

  this.validateFirstName();
  this.validateLastName();
  this.validateEmail();
  this.validatePassword();
  this.validatePhoneNumber();

  return this.validFirstName &&
         this.validLastName &&
         this.validEmail &&
         this.validPassword &&
         this.validPhoneNumber;
}


validateFirstName() {
  if (StringUtil.isEmpty(this.registerDto.firstName)) {
    this.validFirstName = false;
    this.errorMessages.push("First name is required");
  } else {
    this.validFirstName = true;
  }
}

validateLastName() {
  if (StringUtil.isEmpty(this.registerDto.lastName)) {
    this.validLastName = false;
    this.errorMessages.push("Last name is required");
  } else {
    this.validLastName = true;
  }
}

validateEmail() {
  if (StringUtil.isEmpty(this.registerDto.email)) {
    this.validEmail = false;
    this.errorMessages.push("Email is required");
  } else if (!this.isValidEmail(this.registerDto.email)) {
    this.validEmail = false;
    this.errorMessages.push("Email format is invalid");
  } else {
    this.validEmail = true;
  }
}

private isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

validatePassword() {
  if (StringUtil.isEmpty(this.registerDto.password)) {
    this.validPassword = false;
    this.errorMessages.push("Password is required");
  } else if (this.registerDto.password.length < 8) {
    this.validPassword = false;
    this.errorMessages.push("Password must be at least 8 characters");
  } else {
    this.validPassword = true;
  }
}


validatePhoneNumber() {
  if (StringUtil.isEmpty(this.registerDto.phoneNumber)) {
    this.validPhoneNumber = false;
    this.errorMessages.push("Phone number is required");
  } else if (!this.isValidPhoneNumber(this.registerDto.phoneNumber)) {
    this.validPhoneNumber = false;
    this.errorMessages.push("Phone number format is invalid");
  } else {
    this.validPhoneNumber = true;
  }
}

private isValidPhoneNumber(phone: string): boolean {
  // Adjust regex to your country format if needed
  const phoneRegex = /^[0-9]{10,15}$/;
  return phoneRegex.test(phone);
}


      get registerDto(): RegisterDto {
        return this.userService.registerDto;
    }

    set registerDto(value: RegisterDto) {
        this.userService.registerDto = value;
    }
}
