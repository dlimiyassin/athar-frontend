import { Component } from '@angular/core';
import { StudentService } from '../../../core/services/student.service';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.html',
  styleUrl: './complete-profile.css',
})
export class CompleteProfile {

  currentStep: number = 2;

  constructor(
        private studentService: StudentService
  ) {}

  ngOnInit(): void {
      
    this.currentStep = this.studentService._currentStep.getValue();
    this.studentService.currentStep$.subscribe(value => {
        this.currentStep = value;
    });
  }

  goToNextStep(){
    if(this.currentStep < 3 ){
      this.studentService.setCurrentStep(this.currentStep+1);
    }
  }

  goToPrevouisStep(){
    if(this.currentStep > 2 ){
      this.studentService.setCurrentStep(this.currentStep-1);
    }
  }


}
