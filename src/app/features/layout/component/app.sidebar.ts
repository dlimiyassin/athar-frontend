import { Component, ElementRef } from '@angular/core';
import { AppMenu } from './app.menu';
import { StudentService } from '../../../core/services/student.service';
import { AuthService } from '../../../zBase/security/service/auth.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    styles: `
    /* Marker */
.timeline-marker {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Completed text */
.completed {
    font-weight: 600;
    color: #22c55e;
}

/* Optional: inactive connector */
.layout-progress-sidebar .p-timeline-event:not(.p-timeline-event-active)
.p-timeline-event-connector {
    background-color: #e5e7eb;
}
.layout-progress-sidebar .p-timeline-event-connector {
    background-color: #e5e7eb;
}

.layout-progress-sidebar
.p-timeline-event.p-timeline-event-active 
.p-timeline-event
.p-timeline-event-connector {
    background-color: #10b981;
}

    `,
    imports: [AppMenu, CommonModule, TimelineModule, ButtonModule, CardModule],
    template: ` 
    @if (!isProfileIncompleted) 
        { 
            <div class="layout-sidebar"> 
                <app-menu></app-menu> 
            </div> 
        } @else { 
            <div class="layout-progress-sidebar">
            <p-timeline [value]="steps" align="left">

                <ng-template #marker let-step>
                    <span
                        class="timeline-marker"
                        [ngStyle]="{
                            backgroundColor: getColor(step),
                            color: 'white'
                        }">
                        <i [class]="getIcon(step)"></i>
                    </span>
                </ng-template>
                    
                <ng-template #content let-step>
                    <span class="text-xs"
                          [class.completed]="isCompleted(step)">
                        {{ step.label }}
                    </span>
                </ng-template>

            </p-timeline>

            </div>
            
        }


    `
})
export class AppSidebar {

    isProfileIncompleted = true;

    steps: TimelineStep[] = [];
    currentStep: number = 2;

    constructor(
        public el: ElementRef,
        private authService: AuthService,
        private studentService: StudentService
    ) {}

ngOnInit(): void {
    this.isProfileIncompleted = this.studentService._isProfileIncompleted.getValue();
    this.studentService.isProfileIncompleted$.subscribe(value => {
        this.isProfileIncompleted = value;
    });
    
    this.currentStep = this.studentService._currentStep.getValue();
    this.studentService.currentStep$.subscribe(value => {
        this.currentStep = value;
    });

    this.authService.loadInfos();
    this.steps = [
        { index: 1, label: 'Account Creation' },
        { index: 2, label: 'Academic Background' },
        { index: 3, label: 'Additional Information' }
    ];


}

getColor(step: TimelineStep): string {
    if (this.isCompleted(step)) {
        return '#10b981';
    }
    if (this.isActive(step)) {
        return '#10b981';
    }
    return '#cbd5e1';
}

getIcon(step: TimelineStep): string {
    if (this.isCompleted(step)) {
        return 'pi pi-check';
    }
    if (this.isActive(step)) {
        return 'pi pi-circle-fill';
    }
    return 'pi pi-circle';
}


isCompleted(step: TimelineStep): boolean {
    return step.index < this.currentStep;
}

isActive(step: TimelineStep): boolean {
    return step.index === this.currentStep;
}



}




interface TimelineStep {
    index: number;
    label: string;
}
