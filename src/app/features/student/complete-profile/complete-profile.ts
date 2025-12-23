import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { DatePickerModule } from 'primeng/datepicker';
import { FieldType } from '../../../core/enums/field-type.enum';
import { NiveauEtude } from '../../../core/enums/niveau-etude.enum';
import { Universite } from '../../../core/enums/universite.enum';
import { AcademicProfileFieldDto } from '../../../core/models/academic-profile-field.dto';
import { AcademicProfileDto } from '../../../core/models/academic-profile.dto';
import { DiplomeDto } from '../../../core/models/diplome.dto';
import { StudentService } from '../../../core/services/student.service';
import { AcademicFieldsConfigService } from '../../../core/services/academic-fields-config.service';
import { Router } from '@angular/router';
import { StudentDto } from '../../../core/models/student.dto';


@Component({
  selector: 'app-complete-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    CheckboxModule,
    SelectModule,
    TableModule,
    DatePickerModule,
  ],
  templateUrl: './complete-profile.html'
})
export class CompleteProfile implements OnInit {

  isLoading: boolean = false;
  currentStep: number = 2;
  studentDto : StudentDto = new StudentDto();

  academicProfile: AcademicProfileDto = {
    currentDiploma: this.createEmptyDiploma(),
    diplomes: [],
    customAttributes: {}
  };

  diplomaForm: DiplomeDto = this.createEmptyDiploma();

  academicFields: AcademicProfileFieldDto[] = [
    {
      id: '1',
      name: 'yearsOfExperience',
      label: 'Years of Experience',
      type: FieldType.NUMBER,
      required: true
    },
    {
      id: '2',
      name: 'isEmployed',
      label: 'Currently Employed',
      type: FieldType.BOOLEAN,
      required: false
    },
    {
      id: '3',
      name: 'lastTrainingDate',
      label: 'Last Training Date',
      type: FieldType.DATE,
      required: false
    }
  ];

  universites = Object.values(Universite).map(v => ({
    label: v.replaceAll('_', ' ').toUpperCase(),
    value: v
  }));

  niveaux = Object.values(NiveauEtude);

  fieldType = FieldType;

  constructor(
    private studentService: StudentService, 
    private academicFieldsConfigService: AcademicFieldsConfigService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentStep = this.studentService._currentStep.getValue();
    this.studentService.currentStep$.subscribe(value => {
        this.currentStep = value;
    });

    // i assign these values in backned by security context
    this.studentDto.id = null;
    this.studentDto.user = null;
  }

  createEmptyDiploma(): DiplomeDto {
    return {
      universite: null,
      ecole: '',
      niveauEtude: null,
      filiere: '',
      intitule: '',
      year: null,
      note: null
    };
  }

  addDiploma(): void {
    this.academicProfile.diplomes.push({ ...this.diplomaForm });
    this.diplomaForm = this.createEmptyDiploma();
  }

  removeDiploma(index: number): void {
    this.academicProfile.diplomes.splice(index, 1);
  }

  goToNextStep(): void {
    if(this.currentStep < 3 ){
      this.studentService.setCurrentStep(this.currentStep+1);
    } else if (this.currentStep === 3) {
      this.saveStudentProfile();      
    }
  }

  goToPreviousStep(): void {
    if(this.currentStep > 2 ){
      this.studentService.setCurrentStep(this.currentStep-1);
    }
  }

  saveStudentProfile(): void {
    console.log('Student profile saved:', this.academicProfile);
    this.isLoading = true;
    this.studentService.setProfileSetup(true);
    this.studentDto.academicProfile = this.academicProfile;
    this.studentService.completeProfile(this.studentDto).subscribe({
      next: (response : StudentDto) => {
        console.log('Student profile saved successfully:', response);
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error saving student profile:', err);
        this.isLoading = false;
      }
    });
    this.router.navigate(['app/student/view']);
  }
}
