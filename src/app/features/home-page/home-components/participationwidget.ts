import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';

@Component({
    selector: 'participation-widget',
    standalone: true,
    imports: [DividerModule, ButtonModule, RippleModule],
    template: `
        <div id="participation" class="py-6 px-6 lg:px-20 mt-8 mx-0 lg:mx-20">
            <!-- Section Header -->
            <div class="col-span-12 text-center mt-20 mb-6">
                <div class="text-surface-900 dark:text-surface-0 font-extrabold mb-2 text-4xl">
                    Engage Every Academic Role
                </div>
                <span class="text-muted-color text-2xl">
                    A unified platform for feedback and improvement
                </span>
            </div>

            <!-- Cards -->
            <div class="grid grid-cols-12 gap-4 justify-between mt-20 md:mt-0">

                <!-- STUDENTS -->
                <div class="col-span-12 lg:col-span-4 p-0 md:p-4">
                    <div
                        class="p-4 bg-white flex flex-col border-surface-200 dark:border-surface-600 participation-card cursor-pointer
                               border-2 hover:border-primary duration-300 transition-all"
                        style="border-radius: 10px"
                    >
                        <div class="text-surface-900 dark:text-surface-0 text-center my-8 text-3xl">
                            Students
                        </div>

                        <img
                            src="/assets/landing/6.png"
                            class="w-10/12 mx-auto"
                            alt="Students"
                        />

                        <div class="my-8 flex flex-col items-center gap-4">
                            <button
                                pButton
                                pRipple
                                label="Participate"
                                class="p-button-rounded border-0 font-light bg-blue-500 text-white"
                            ></button>
                        </div>

                        <p-divider class="w-full bg-surface-200"></p-divider>

                        <ul class="my-8 list-none p-0 flex text-surface-900 dark:text-surface-0 flex-col px-8">
                            <li class="py-2">
                                <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                <span class="text-xl leading-normal">Answer surveys step-by-step</span>
                            </li>
                            <li class="py-2">
                                <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                <span class="text-xl leading-normal">One question at a time</span>
                            </li>
                            <li class="py-2">
                                <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                <span class="text-xl leading-normal">Anonymous and secure</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- TEACHERS -->
                <div class="col-span-12 lg:col-span-4 p-0 md:p-4 mt-6 md:mt-0">
                    <div
                        class="p-4 bg-white flex flex-col border-surface-200 dark:border-surface-600 participation-card cursor-pointer
                               border-2 hover:border-primary duration-300 transition-all"
                        style="border-radius: 10px"
                    >
                        <div class="text-surface-900 dark:text-surface-0 text-center my-8 text-3xl">
                            Teachers
                        </div>

                        <img
                            src="/assets/landing/5.png"
                            class="w-10/12 mx-auto"
                            alt="Teachers"
                        />

                        <div class="my-8 flex flex-col items-center gap-4">
                            <button
                                pButton
                                pRipple
                                label="Create Surveys"
                                class="p-button-rounded border-0 font-light bg-blue-500 text-white"
                            ></button>
                        </div>

                        <p-divider class="w-full bg-surface-200"></p-divider>

                        <ul class="my-8 list-none p-0 flex text-surface-900 dark:text-surface-0 flex-col px-8">
                            <li class="py-2">
                                <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                <span class="text-xl leading-normal">Design structured surveys</span>
                            </li>
                            <li class="py-2">
                                <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                <span class="text-xl leading-normal">Collect student feedback</span>
                            </li>
                            <li class="py-2">
                                <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                <span class="text-xl leading-normal">Improve teaching quality</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- INSTITUTIONS -->
                <div class="col-span-12 lg:col-span-4 p-0 md:p-4 mt-6 md:mt-0">
                    <div
                        class="p-4 bg-white flex flex-col border-surface-200 dark:border-surface-600 participation-card cursor-pointer
                               border-2 hover:border-primary duration-300 transition-all"
                        style="border-radius: 10px"
                    >
                        <div class="text-surface-900 dark:text-surface-0 text-center my-8 text-3xl">
                            Institutions
                        </div>

                        <img
                            src="/assets/landing/4.png"
                            class="w-10/12 mx-auto"
                            alt="Institutions"
                        />

                        <div class="my-8 flex flex-col items-center gap-4">
                            <button
                                pButton
                                pRipple
                                label="View Insights"
                                class="p-button-rounded border-0 font-light bg-blue-500 text-white"
                            ></button>
                        </div>

                        <p-divider class="w-full bg-surface-200"></p-divider>

                        <ul class="my-8 list-none p-0 flex text-surface-900 dark:text-surface-0 flex-col px-8">
                            <li class="py-2">
                                <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                <span class="text-xl leading-normal">Global academic overview</span>
                            </li>
                            <li class="py-2">
                                <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                <span class="text-xl leading-normal">Decision-support dashboards</span>
                            </li>
                            <li class="py-2">
                                <i class="pi pi-fw pi-check text-xl text-cyan-500 mr-2"></i>
                                <span class="text-xl leading-normal">Continuous quality assurance</span>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    `
})
export class ParticipationWidget {}
