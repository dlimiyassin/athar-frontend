import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'hero-widget',
    standalone: true,
    imports: [ButtonModule, RippleModule],
    template: `
        <div
            id="hero"
            class="flex flex-col pt-2 px-6 lg:px-4 overflow-hidden"
            style="background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, rgb(238, 239, 175) 0%, rgb(195, 227, 250) 100%); clip-path: ellipse(150% 87% at 93% 13%)"
        >
            <div class="mx-6 md:mx-20 mt-0 md:mt-6">
                <p style="font-size: xx-large;" class="font-extrabold text-gray-900 leading-tight dark:text-gray-700"><span class="font-medium block">Assess, understand, and </span>improve learning</p>
                <p class="font-normal text-3xl leading-normal md:mt-4 text-gray-700 dark:text-gray-700">Intelligent quizzes, AI-based analysis, and precise recommendations to support teachers and students.</p>
            </div>
            <div class="flex justify-center md:justify-end">
                <img src="/assets/landing/1.png" alt="Hero Image" class="w-9/12 md:w-auto" />
            </div>
        </div>
    `
})
export class HeroWidget {}
