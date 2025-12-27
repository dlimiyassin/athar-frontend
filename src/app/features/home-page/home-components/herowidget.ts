import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { Router, RouterLink } from "@angular/router";

@Component({
    selector: 'hero-widget',
    standalone: true,
    imports: [ButtonModule, RippleModule, RouterLink],
    template: `
        <section
            id="hero"
            class="relative overflow-hidden px-6 lg:px-16 pt-8 pb-32"
            style="background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)),
                   radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(238, 239, 175) 0%, rgb(195, 227, 250) 100%);
                   clip-path: ellipse(150% 87% at 93% 13%)"
        >
            <!-- Background -->
            <div
                class="absolute inset-0 -z-10"
                style="
                    background:
                        radial-gradient(1200px circle at 10% 10%, #f5f7ff 0%, transparent 40%),
                        radial-gradient(1200px circle at 90% 20%, #eef6ff 0%, transparent 45%),
                        linear-gradient(180deg, #ffffff 0%, #f9fafb 100%);
                "
            ></div>

            <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                
                <!-- Text -->
                <div class="animate-fade-slide">
                    <h1
                        class="text-gray-900 tracking-tight"
                        style="font-size: clamp(2.5rem, 6vw, 4.2rem); font-weight: 600;"
                    >
                        Feedback that improves
                        <br />
                        <span class="font-light text-gray-600">
                            learning and teaching.
                        </span>
                    </h1>

                    <p
                        class="mt-8 text-gray-600 max-w-xl"
                        style="font-size: 1.35rem; line-height: 1.6;"
                    >
                        A modern academic survey platform designed to help
                        institutions understand students, empower teachers,
                        and make better educational decisions.
                    </p>

                    <div class="mt-10 flex items-center gap-4">
                        <button
                            pButton
                            pRipple
                            label="Get started"
                            routerLink="/auth/login"
                            class="px-6 py-3 text-lg font-medium rounded-full"
                        ></button>

                        <button
                            pButton
                            pRipple
                            label="Learn more"
                            (click)="router.navigate([''], { fragment: 'activities' })"
                            class="p-button-text text-lg font-medium text-gray-700"
                        ></button>
                    </div>
                </div>

                <!-- Image -->
                <div class="relative flex justify-center lg:justify-end animate-float">
                    <img
                        src="/assets/landing/1.png"
                        alt="Academic Survey Platform"
                        class="w-[90%] lg:w-130 drop-shadow-xl"
                    />
                </div>
            </div>
        </section>
    `,
    styles: [`
        @keyframes fadeSlide {
            from {
                opacity: 0;
                transform: translateY(24px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes float {
            0% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
            100% {
                transform: translateY(0);
            }
        }

        .animate-fade-slide {
            animation: fadeSlide 0.9s ease-out forwards;
        }

        .animate-float {
            animation: float 6s ease-in-out infinite;
        }
    `]
})
export class HeroWidget {
    constructor(
        public router: Router
    ) {}
}
