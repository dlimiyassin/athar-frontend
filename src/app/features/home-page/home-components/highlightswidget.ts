import { Component } from '@angular/core';

@Component({
    selector: 'highlights-widget',
    standalone: true,
    template: `
        <div id="highlights" class="py-6 px-6 lg:px-20 mx-0 my-12 lg:mx-20">
            <div class="col-span-12 text-center mt-20 mb-6">
                <div class="text-surface-900 font-normal mb-2 text-4xl">
                    Designed for Education
                </div>
                <span class="text-muted-color text-2xl">
                    From classrooms to institutions
                </span>
                
            </div>

            <div class="grid grid-cols-12 gap-4 mt-20 pb-2 md:pb-20">
                <div class="flex justify-center col-span-12 lg:col-span-6 bg-purple-100 p-0 order-1 lg:order-0" style="border-radius: 8px">
                    <img src="/assets/landing/3.png" class="w-8/12 py-6" alt="mockup mobile" />
                </div>

                <div class="col-span-12 lg:col-span-6 my-auto flex flex-col lg:items-end text-center lg:text-right gap-4">
                    <div class="flex items-center justify-center bg-purple-200 self-center lg:self-end" style="width: 4.2rem; height: 4.2rem; border-radius: 10px">
                        <i class="pi pi-fw pi-mobile text-4xl! text-purple-700"></i>
                    </div>
                    <div class="leading-none text-surface-900 text-3xl font-normal">
                        Actionable Insights for Teachers
                    </div>
                    <span class="text-surface-700 text-2xl leading-normal">
                        Teachers receive structured results that help identify strengths,
                        gaps, and opportunities for improvement.
                    </span>

                </div>
            </div>

            <div class="grid grid-cols-12 gap-4 my-20 pt-2 md:pt-20">
                <div class="col-span-12 lg:col-span-6 my-auto flex flex-col text-center lg:text-left lg:items-start gap-4">
                    <div class="flex items-center justify-center bg-yellow-200 self-center lg:self-start" style="width: 4.2rem; height: 4.2rem; border-radius: 10px">
                        <i class="pi pi-fw pi-desktop text-3xl! text-yellow-700"></i>
                    </div>
                    <div class="leading-none text-surface-900 text-3xl font-normal">
                        Student-Centered Feedback
                    </div>
                    <span class="text-surface-700 text-2xl leading-normal">
                        Students answer surveys step-by-step, with clear questions and no overload,
                        ensuring higher completion rates and honest feedback.
                    </span>
                    
                </div>

                <div class="flex justify-center order-1 sm:order-2 col-span-12 lg:col-span-6 bg-yellow-100 p-0" style="border-radius: 8px">
                    <img src="/assets/landing/2.png" class="w-8/12 py-6" alt="mockup" />
                </div>
            </div>
        </div>
    `
})
export class HighlightsWidget {}
