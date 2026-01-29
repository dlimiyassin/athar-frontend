import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { StudentService } from '../../../../core/services/student.service';

import { StudentDto } from '../../../../core/models/student.dto';

import { StudyLevel } from '../../../../core/enums/study-level.enum';
import { FieldOfStudy } from '../../../../core/enums/field-of-study.enum';
import { University } from '../../../../core/enums/university.enum';
import { School } from '../../../../core/enums/school.enum';
import { InputNumberModule } from 'primeng/inputnumber';
import { AcademicFieldsConfigService } from '../../../../core/services/academic-fields-config.service';
import { AcademicProfileFieldDto } from '../../../../core/models/academic-profile-field.dto';
import { FieldType } from '../../../../core/enums/field-type.enum';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { UserStatus } from '../../../../core/enums/UserStatus';
import { Gender } from '../../../../core/enums/gender';
import { MessageService } from 'primeng/api';
import { Toast } from "primeng/toast";
import { Divider } from "primeng/divider";
import { DiplomaDto } from '../../../../core/models/diploma.dto';

@Component({
  selector: 'app-student-view-teacher',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    SelectModule,
    FormsModule,
    ProgressSpinnerModule,
    InputNumberModule,
    InputTextModule,
    CheckboxModule,
    DatePickerModule,
    Toast,
    Divider
],
  templateUrl: './student-view-teacher.html',
  styleUrl: './student-view-teacher.css'
})
export class StudentViewTeacher implements OnInit {

student: StudentDto = {
  id: null,
  user: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    enabled: true,
    roleDtos: [],
    status: UserStatus.EN_ATTENTE,
    lastLogin: ''
  },
  academicProfile: {
    gender: null,
    currentDiploma: {
      university: null,
      school: null,
      studyLevel: null,
      studyField: null,
      title: '',
      year: new Date().getFullYear(),
      grade: null
    },
    diplomas: [],
    customAttributes: {}
  }
  };

  academicFields: AcademicProfileFieldDto[] = [];
  fieldType = FieldType;
  loading = true;
  isLoading = false;

  private studentService = inject(StudentService);
  private route = inject(ActivatedRoute);
  private academicFieldsConfigService = inject(AcademicFieldsConfigService);
  private messageService = inject(MessageService);
  
  statusOptions = Object.keys(UserStatus).map(key => ({
    label: UserStatus[key as keyof typeof UserStatus],
    value: key
  }));

  genderOptions = Object.keys(Gender).map(key => ({
    label: Gender[key as keyof typeof Gender],
    value: key
  }));


  studyLevels = Object.entries(StudyLevel).map(([key, value]) => ({
    label: value,
    value: key
  }));

  universities = Object.entries(University).map(([key, value]) => ({
    label: value,
    value: key
  }));

  studyFields = Object.entries(FieldOfStudy).map(([key, value]) => ({
    label: value,
    value: key
  }));

  schools = Object.entries(School).map(([key, value]) => ({
    label: value,
    value: key
  }));


  ngOnInit(): void {
    this.loadStudent();
    this.loadAcademicFields();
  }


  // -------------------------
  // Data loading
  // -------------------------

  private loadStudent(): void {
    const userId = this.route.snapshot.paramMap.get('id')!;
    this.loading = true;

    this.studentService.findByUserId(userId).subscribe({
      next: (data) => {
        this.student = data;      
        this.student.user!.status = data.user?.status || null;
        this.student.academicProfile.gender = data.academicProfile?.gender || null;
        this.student.academicProfile.customAttributes["birthdate"] = new Date(data.academicProfile?.customAttributes["birthdate"] || '');
        const customAttrs = this.student.academicProfile.customAttributes;

        if (customAttrs) {
          Object.keys(customAttrs).forEach((key) => {
            const value = customAttrs[key];
          
            if (typeof value === 'string' && !isNaN(Date.parse(value))) {
              customAttrs[key] = new Date(value);
            }
          });
        }
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

    
deleteDiploma(index: number): void {
  this.student.academicProfile.diplomas.splice(index, 1);
}


addPreviousDiploma(): void {
  const newDiploma: DiplomaDto = {
    university: null,
    school: null,
    studyLevel: null,
    studyField: null,
    title: '',
    year: null,
    grade: null
  };

  this.student.academicProfile.diplomas.unshift(newDiploma);
}


  loadAcademicFields(): void {
        this.academicFieldsConfigService.findAll().subscribe(fields => {
      this.academicFields = fields.sort(
                              (a, b) => (a.type === FieldType.BOOLEAN ? 1 : 0) - (b.type === FieldType.BOOLEAN ? 1 : 0)
                            );
    });
  }

  // -------------------------
  // Helpers
  // -------------------------

bacKeys = [
  FieldOfStudy.SCIENCES_MATH_A as string,
  FieldOfStudy.SCIENCES_MATH_B as string,
  FieldOfStudy.SCIENCES_PHYSIQUES as string,
  FieldOfStudy.SVT as string,
  FieldOfStudy.SCIENCES_ECO_SOCIALES as string,
  FieldOfStudy.LETTRES_SCIENCES_HUMAINES as string,
  FieldOfStudy.LANGUES as string,
  FieldOfStudy.SCIENCES_EXPERIMENTALES as string,
  FieldOfStudy.STMG as string,
  FieldOfStudy.BAC_PRO_COMMERCE as string,
  FieldOfStudy.BAC_PRO_TECHNIQUE as string
];

getBacOptions = (fields: { label: string; value: string }[]) =>
  fields.filter(f => this.bacKeys.includes(f.label));

getNonBacFieldsOfStudy = (fields: { label: string; value: string }[]) =>
  fields.filter(f => !this.bacKeys.includes(f.label));


  excludeBacLevels(
    levels: { label: string; value: string }[]
  ) {
    return levels.filter(l => l.value !== 'BAC');
  }

  // -------------------------
  // Submit
  // -------------------------

  onSubmit(): void {
    if (!this.student || !this.student.user) return;

    this.isLoading = true;
    this.studentService.edit(this.student).subscribe({
      next: (updated) => {
        this.loadStudent()
        this.isLoading = false;
        this.messageService.add({severity:'success', summary:'Success', detail:'The student\'s information has been successfully updated.'});
      },
      error: () => {this.isLoading = false; this.messageService.add({severity:'error', summary:'Error', detail:'An error occurred while updating the student\'s information.'});}
    });
  }
}
