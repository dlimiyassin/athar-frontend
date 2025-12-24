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
import { StudentDto } from '../../../core/models/student.dto';

import { StudentService } from '../../../core/services/student.service';
import { AcademicFieldsConfigService } from '../../../core/services/academic-fields-config.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Toast } from "primeng/toast";

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
    Toast
],
  templateUrl: './complete-profile.html'
})
export class CompleteProfile implements OnInit {

  isLoading = false;
  currentStep = 2;

  errorMessages: string[] = [];

  studentDto: StudentDto = new StudentDto();

  academicProfile: AcademicProfileDto = {
    currentDiploma: this.createEmptyDiploma(),
    diplomes: [],
    customAttributes: {}
  };

  diplomaForm: DiplomeDto = this.createEmptyDiploma();

  academicFields: AcademicProfileFieldDto[] = [];

  universites = Object.values(Universite).map(v => ({
    label: v.replaceAll('_', ' '),
    value: v
  }));

  niveaux = Object.values(NiveauEtude);
  fieldType = FieldType;

  constructor(
    private studentService: StudentService,
    private academicFieldsConfigService: AcademicFieldsConfigService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.currentStep = this.studentService._currentStep.getValue();
    this.studentService.currentStep$.subscribe(step => this.currentStep = step);

    this.studentDto.id = null;
    this.studentDto.user = null;

    this.academicFieldsConfigService.findAll().subscribe(fields => {
      this.academicFields = fields;
    });
  }

  /* ----------------------- */
  /* FACTORIES */
  /* ----------------------- */

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

  /* ----------------------- */
  /* NAVIGATION */
  /* ----------------------- */

  goToNextStep(): void {
    this.errorMessages = [];

    if (this.currentStep === 2 && !this.validateStep2()) {
      if(this.errorMessages.length > 0) {
                  this.errorMessages.forEach(err => {
                        this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: err
                    });
                    })
                }
      return;
    }

    if (this.currentStep === 3) {
      if (!this.validateStep3()) {
        if(this.errorMessages.length > 0) {
                  this.errorMessages.forEach(err => {
                        this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: err
                    });
                    })
                }
        return;
      }
      this.saveStudentProfile();
      return;
    }

    this.studentService.setCurrentStep(this.currentStep + 1);
  }

  goToPreviousStep(): void {
    if (this.currentStep > 2) {
      this.studentService.setCurrentStep(this.currentStep - 1);
    }
  }

  /* ----------------------- */
  /* DIPLOMAS */
  /* ----------------------- */

  addDiploma(): void {
    if (!this.validateDiploma(this.diplomaForm, false)) {
      console.error(this.errorMessages);
      return;
    }

    this.academicProfile.diplomes.push({ ...this.diplomaForm });
    this.diplomaForm = this.createEmptyDiploma();
  }

  removeDiploma(index: number): void {
    this.academicProfile.diplomes.splice(index, 1);
  }

  /* ----------------------- */
  /* VALIDATIONS */
  /* ----------------------- */

  validateStep2(): boolean {
    return this.validateDiploma(this.academicProfile.currentDiploma, true);
  }

  validateStep3(): boolean {
    this.errorMessages = [];

    for (const field of this.academicFields) {
      const value = this.academicProfile.customAttributes[field.name];

      if (field.required && (value === null || value === undefined || value === '')) {
        this.errorMessages.push(`${field.label} is required`);
      }
    }

    return this.errorMessages.length === 0;
  }

  validateDiploma(d: DiplomeDto, strict: boolean): boolean {
    this.errorMessages = [];

    if (!d.universite) this.errorMessages.push('University is required');
    if (!d.ecole) this.errorMessages.push('School is required');
    if (!d.niveauEtude) this.errorMessages.push('Level is required');
    if (!d.filiere) this.errorMessages.push('Field of study is required');
    if (!d.intitule) this.errorMessages.push('Diploma title is required');

    if (strict) {
      if (!d.year || d.year < 1950 || d.year > new Date().getFullYear()) {
        this.errorMessages.push('Year is invalid');
      }
    }

    if (d.note !== null && (d.note < 0 || d.note > 20)) {
      this.errorMessages.push('Grade must be between 0 and 20');
    }

    return this.errorMessages.length === 0;
  }

  /* ----------------------- */
  /* SAVE */
  /* ----------------------- */

  saveStudentProfile(): void {
    this.isLoading = true;
    this.studentDto.academicProfile = this.academicProfile;

    this.studentService.completeProfile(this.studentDto).subscribe({
      next: () => {
        this.isLoading = false;
        this.studentService.setProfileSetup(false);
        this.router.navigate(['app/student/view']);
      },
      error: err => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}
