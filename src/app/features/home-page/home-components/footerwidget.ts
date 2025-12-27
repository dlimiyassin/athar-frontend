import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'footer-widget',
    standalone: true,
    imports: [RouterModule],
    template: `
        <div class="py-12 px-12 mx-0 mt-20 lg:mx-20 border-t">
            <div class="grid grid-cols-12 gap-4">

                <!-- Logo / Brand -->
                <div class="col-span-12 md:col-span-2">
                    <a
                        (click)="router.navigate(['/pages/landing'], { fragment: 'home' })"
                        class="flex flex-wrap items-center justify-center md:justify-start md:mb-0 mb-6 cursor-pointer"
                    >
                        <svg viewBox="0 0 54 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-14 mr-2">
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M27.3546 0C16.4574 0 7.62354 8.82857 7.62354 19.7194C7.62354 30.6102 16.4574 39.4388 27.3546 39.4388C38.2517 39.4388 47.0855 30.6102 47.0855 19.7194C47.0855 8.82857 38.2517 0 27.3546 0Z"
                                fill="var(--primary-color)"
                            />
                        </svg>
                        <h4 class="font-medium text-3xl text-surface-900 dark:text-surface-0">
                            ATHAR
                        </h4>
                    </a>
                    <p class="text-surface-600 dark:text-surface-300 text-sm mt-4 text-center md:text-left">
                        Insightful academic feedback and intelligent evaluation for modern education.
                    </p>
                </div>

                <!-- Links -->
                <div class="col-span-12 md:col-span-10">
                    <div class="grid grid-cols-12 gap-8 text-center md:text-left">

                        <!-- Platform -->
                        <div class="col-span-12 md:col-span-3">
                            <h4 class="font-medium text-2xl mb-6 text-surface-900 dark:text-surface-0">
                                Platform
                            </h4>
                            <a class="block mb-2 text-xl cursor-pointer text-surface-700 dark:text-surface-100">
                                About ATHAR
                            </a>
                            <a class="block mb-2 text-xl cursor-pointer text-surface-700 dark:text-surface-100">
                                How It Works
                            </a>
                            <a class="block mb-2 text-xl cursor-pointer text-surface-700 dark:text-surface-100">
                                Educational Impact
                            </a>
                            <a class="block text-xl cursor-pointer text-surface-700 dark:text-surface-100">
                                Roadmap
                            </a>
                        </div>

                        <!-- For Educators -->
                        <div class="col-span-12 md:col-span-3">
                            <h4 class="font-medium text-2xl mb-6 text-surface-900 dark:text-surface-0">
                                For Educators
                            </h4>
                            <a class="block mb-2 text-xl cursor-pointer text-surface-700 dark:text-surface-100">
                                Create Surveys
                            </a>
                            <a class="block mb-2 text-xl cursor-pointer text-surface-700 dark:text-surface-100">
                                Analyze Feedback
                            </a>
                            <a class="block text-xl cursor-pointer text-surface-700 dark:text-surface-100">
                                Student Insights
                            </a>
                        </div>

                        <!-- For Students -->
                        <div class="col-span-12 md:col-span-3">
                            <h4 class="font-medium text-2xl mb-6 text-surface-900 dark:text-surface-0">
                                For Students
                            </h4>
                            <a class="block mb-2 text-xl cursor-pointer text-surface-700 dark:text-surface-100">
                                Participate in Surveys
                            </a>
                            <a class="block mb-2 text-xl cursor-pointer text-surface-700 dark:text-surface-100">
                                Anonymous Feedback
                            </a>
                            <a class="block text-xl cursor-pointer text-surface-700 dark:text-surface-100">
                                Learning Improvement
                            </a>
                        </div>

                        <!-- Legal & Trust -->
                        <div class="col-span-12 md:col-span-3">
                            <h4 class="font-medium text-2xl mb-6 text-surface-900 dark:text-surface-0">
                                Trust & Legal
                            </h4>
                            <a class="block mb-2 text-xl cursor-pointer text-surface-700 dark:text-surface-100">
                                Privacy & Anonymity
                            </a>
                            <a class="block mb-2 text-xl cursor-pointer text-surface-700 dark:text-surface-100">
                                Data Protection
                            </a>
                            <a class="block text-xl cursor-pointer text-surface-700 dark:text-surface-100">
                                Terms of Use
                            </a>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    `
})
export class FooterWidget {
    constructor(public router: Router) {}
}
