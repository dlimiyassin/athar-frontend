import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { LoginDto } from '../../../zBase/security/model/loginDto.model';
import { AuthService } from '../../../zBase/security/service/auth.service';
import { UserService } from '../../../zBase/security/service/user.service';
import { StringUtil } from '../../../zBase/utils/StringUtil';

@Component({
    selector: 'app-login-page',
    standalone: true,
    imports: [
        ToastModule,
        FormsModule,
        PasswordModule,
        CheckboxModule,
        ButtonModule,
        RippleModule,
        InputTextModule,
        RouterLink,
        NgIf,
        NgClass
    ],
    styles: [`
        .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #0fbbe2;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `],
    template: `
        <p-toast />

        <div class="w-full bg-surface-50 dark:bg-surface-950 flex items-start justify-center">

            <!-- MAIN GRID -->
            <div class="grid grid-cols-1 lg:grid-cols-2 w-full max-w-7xl mx-auto items-center">

                <!-- LEFT IMAGE (PRO, RESPONSIVE) -->
                <div  class="hidden lg:flex items-center justify-center h-full mr-20 relative overflow-hidden rounded-l-3xl">

                    <img
                        src="/assets/landing/signin.png"
                        alt="Sign in illustration"
                        class="w-10/12 max-w-lg drop-shadow-xl"
                    />

                </div>

                <!-- RIGHT: LOGIN CARD -->
                <div class="flex items-center w-full justify-center px-4 pt-20 ">

                    <div class="flex flex-col items-center justify-center w-full">

                        <div
                        class="w-full"
                            style="border-radius: 56px;
                                   padding: 0.2rem;
                                   background: linear-gradient(180deg, #059669 10%, rgba(33,150,243,0) 30%)">

                            <div
                                class="w-full bg-white dark:bg-surface-900 p-16 sm:px-20"
                                style="border-radius: 53px">

                                <!-- HEADER -->
                                <div class="text-center mb-4">
                                    <div class="text-surface-900 text-2xl font-extrabold mb-2">
                                        Welcome to ATHAR!
                                    </div>
                                    <span class="text-muted-color font-medium">
                                        Sign in to continue
                                    </span>
                                </div>

                                <div class="w-full max-w-md">

                                    <!-- Email -->
                                    <label class="block text-sm font-medium mb-2">Email</label>
                                    <input
                                        pInputText
                                        type="email"
                                        placeholder="Email address"
                                        class="w-full mb-4"
                                        [(ngModel)]="loginDto.email"
                                        (keyup.enter)="login()"
                                    />

                                    <!-- Password -->
                                    <label class="block text-sm font-medium mb-2">Password</label>

                                    <div class="relative mb-3">
                                        <input
                                            pInputText
                                            class="w-full pr-10"
                                            [type]="showPassword ? 'text' : 'password'"
                                            placeholder="Password"
                                            [(ngModel)]="loginDto.password"
                                            (keyup.enter)="login()"
                                        />

                                        <button
                                            type="button"
                                            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                            (click)="togglePasswordVisibility()">
                                            <i
                                                class="pi"
                                                [ngClass]="showPassword ? 'pi-eye-slash' : 'pi-eye'">
                                            </i>
                                        </button>
                                    </div>

                                    <!-- Remember / Forgot -->
                                    <div class="flex items-center justify-between mb-6">
                                        <div class="flex items-center">
                                            <p-checkbox [(ngModel)]="checked" binary class="mr-2"></p-checkbox>
                                            <span class="text-sm">Remember me</span>
                                        </div>

                                        <a
                                            routerLink="/auth/forgetPassword"
                                            class="text-sm font-medium text-primary">
                                            Forgot password?
                                        </a>
                                    </div>

                                    <!-- LOGIN -->
                                    <p-button
                                        styleClass="w-full"
                                        [disabled]="authService.isLoading"
                                        (onClick)="login()">

                                        <ng-template pTemplate="content">
                                            <ng-container *ngIf="authService.isLoading; else loginText">
                                                <div class="spinner mr-2"></div>
                                            </ng-container>
                                            <ng-template #loginText>Sign In</ng-template>
                                        </ng-template>

                                    </p-button>

                                    <!-- REGISTER -->
                                    <p class="mt-6 text-center text-sm text-gray-500">
                                        You do not have an account?
                                        <a
                                            routerLink="/auth/register"
                                            class="font-bold text-primary">
                                            Sign Up
                                        </a>
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class LoginPage {

    checked = false;
    validLoginEmail = true;
    validLoginPassword = true;
    errorMessages: string[] = [];
    showPassword = false;

    constructor(
        public authService: AuthService,
        private userService: UserService,
        private router: Router,
        private messageService: MessageService
    ) {}

    togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
    }

    login(): void {
        this.authService.isLoading = true;
        this.validateForm();

        if (this.errorMessages.length === 0) {
            localStorage.clear();
            this.authService.login(this.loginDto).subscribe({
                next: (resp) => {
                    this.authService.handleAfterLogin(resp);
                    this.authService.isLoading = false;
                },
                error: (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: error.error.message
                    });
                    this.authService.isLoading = false;
                }
            });
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please correct the errors on the form'
            });
            this.authService.isLoading = false;
        }
    }

    validateForm(): void {
        this.errorMessages = [];
        this.validateEmail();
        this.validatePassword();
    }

    validateEmail(): void {
        this.validLoginEmail = !StringUtil.isEmpty(this.loginDto.email);
        if (!this.validLoginEmail) {
            this.errorMessages.push('Email is required');
        }
    }

    validatePassword(): void {
        this.validLoginPassword = !StringUtil.isEmpty(this.loginDto.password);
        if (!this.validLoginPassword) {
            this.errorMessages.push('Password is required');
        }
    }

    get loginDto(): LoginDto {
        return this.userService.loginDto;
    }

    set loginDto(value: LoginDto) {
        this.userService.loginDto = value;
    }
}
