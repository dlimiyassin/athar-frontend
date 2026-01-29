import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { StudentService } from '../../../../core/services/student.service';
import { LayoutService } from '../../../layout/service/layout.service';

import { StudentDto } from '../../../../core/models/student.dto';
import { UserDto } from '../../../../zBase/security/model/userDto.model';
import { DiplomaDto } from '../../../../core/models/diploma.dto';

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
    DatePickerModule
  ],
  templateUrl: './student-view-teacher.html',
  styleUrl: './student-view-teacher.css'
})
export class StudentViewTeacher implements OnInit {

  private fb = inject(FormBuilder);
  private studentService = inject(StudentService);
  private route = inject(ActivatedRoute);
  private layoutService = inject(LayoutService);
  private academicFieldsConfigService = inject(AcademicFieldsConfigService);

  studentForm!: FormGroup;
  student: StudentDto = new StudentDto();
  academicFields: AcademicProfileFieldDto[] = [];
  fieldType = FieldType;

  loading = true;
  isLoading = false;

  // -------------------------
  // Select options (PrimeNG v20)
  // -------------------------

  genderOptions = [
    { label: 'Male', value: 'MALE' },
    { label: 'Female', value: 'FEMALE' }
  ];

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

  // -------------------------
  // Lifecycle
  // -------------------------

  ngOnInit(): void {
    //this.layoutService.onMenuToggle();
    this.initForm();
    this.loadStudent();
    this.academicFieldsConfigService.findAll().subscribe(fields => {
      this.academicFields = fields;
    });
  }

  // -------------------------
  // Form
  // -------------------------

  private initForm(): void {
    this.studentForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      gender: ['MALE']
    });
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

        this.ensureAcademicProfile();

        // Patch form (read/update section)
        this.studentForm.patchValue({
          firstName: data.user?.firstName ?? '',
          lastName: data.user?.lastName ?? '',
          email: data.user?.email ?? '',
          gender: data.academicProfile?.gender ?? 'MALE'
        });

        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  // -------------------------
  // Helpers
  // -------------------------

  private ensureAcademicProfile(): void {
    if (!this.student.user) {
      this.student.user = new UserDto();
    }

    if (!this.student.academicProfile) {
      this.student.academicProfile = {
        gender: 'MALE',
        currentDiploma: this.createEmptyDiploma(),
        diplomas: [],
        customAttributes: {}
      };
    } else {
      this.student.academicProfile.currentDiploma ??=
        this.createEmptyDiploma();
      this.student.academicProfile.diplomas ??= [];
    }
  }

  private createEmptyDiploma(): DiplomaDto {
    return {
      title: '',
      studyLevel: null,
      studyField: null,
      year: null,
      grade: null,
      school: null,
      university: null
    };
  }

  // -------------------------
  // Filtering helpers (BAC logic)
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

    const formValue = this.studentForm.value;

    // Update User
    this.student.user.firstName = formValue.firstName;
    this.student.user.lastName = formValue.lastName;
    this.student.user.email = formValue.email;

    // Update Academic Profile
    this.student.academicProfile.gender = formValue.gender;

    this.isLoading = true;

    this.studentService.edit(this.student).subscribe({
      next: (updated) => {
        this.student = updated;
        this.isLoading = false;
      },
      error: () => (this.isLoading = false)
    });
  }
}
