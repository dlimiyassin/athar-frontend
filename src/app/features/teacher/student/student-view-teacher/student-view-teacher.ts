import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ActivatedRoute } from '@angular/router';

import { StudentDto } from '../../../../core/models/student.dto';
import { UserDto } from '../../../../zBase/security/model/userDto.model';
import { AcademicProfileDto } from '../../../../core/models/academic-profile.dto';
import { DiplomaDto } from '../../../../core/models/diploma.dto';
import { StudyLevel } from '../../../../core/enums/study-level.enum';
import { FieldOfStudy } from '../../../../core/enums/field-of-study.enum';
import { University } from '../../../../core/enums/university.enum';
import { School } from '../../../../core/enums/school.enum';
import { StudentService } from '../../../../core/services/student.service';

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    SelectModule,
    TableModule,
    ToastModule
  ],
  templateUrl: './student-view-teacher.html',
  styleUrls: ['./student-view-teacher.css']
})
export class StudentViewTeacher implements OnInit {

  studentForm!: FormGroup;
  student: StudentDto = new StudentDto();

  // Dropdown options
  genderOptions = [
    { label: 'Male', value: 'MALE' },
    { label: 'Female', value: 'FEMALE' }
  ];
  studyLevels = Object.entries(StudyLevel).map(([key, value]) => ({ label: value, value: key }));
  studyFields = Object.entries(FieldOfStudy).map(([key, value]) => ({ label: value, value: key }));
  universities = Object.entries(University).map(([key, value]) => ({ label: value, value: key }));
  schools = Object.entries(School).map(([key, value]) => ({ label: value, value: key }));

  diplomaForm: DiplomaDto = this.createEmptyDiploma();
  loading = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Initialize form
    this.studentForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      gender: ['MALE']
    });

    this.loadStudent();
  }

  loadStudent(): void {
    this.loading = true;
    const userId = this.route.snapshot.paramMap.get('id')!;
    this.studentService.findByUserId(userId).subscribe({
      next: (data) => {
        this.student = data;

        // Patch user info to form
        if (this.student.user) {
          this.studentForm.patchValue({
            firstName: this.student.user.firstName || '',
            lastName: this.student.user.lastName || '',
            email: this.student.user.email || '',
            gender: this.student.academicProfile?.gender || 'MALE'
          });
        }

        // Ensure currentDiploma and diplomas exist
        if (!this.student.academicProfile) {
          this.student.academicProfile = {
            gender: 'MALE',
            currentDiploma: this.createEmptyDiploma(),
            diplomas: [],
            customAttributes: {}
          };
        } else {
          this.student.academicProfile.currentDiploma ||= this.createEmptyDiploma();
          this.student.academicProfile.diplomas ||= [];
        }

        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  createEmptyDiploma(): DiplomaDto {
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

  addDiploma(): void {
    this.student.academicProfile.diplomas.push({ ...this.diplomaForm });
    this.diplomaForm = this.createEmptyDiploma();
  }

  removeDiploma(index: number): void {
    this.student.academicProfile.diplomas.splice(index, 1);
  }

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



excludeBacLevels(level: { label: string; value: string; }[]): any[]|null|undefined {
  return level.filter(option => option.value !== 'BAC');
}

  onSubmit(): void {
    if (!this.student.user) {
      this.student.user = new UserDto();
    }

    const formValue = this.studentForm.value;

    // Update UserDto safely
    this.student.user.firstName = formValue.firstName || '';
    this.student.user.lastName = formValue.lastName || '';
    this.student.user.email = formValue.email || '';

    // Update gender in academicProfile
    this.student.academicProfile.gender = formValue.gender || 'MALE';

    this.isLoading = true;

    this.studentService.edit(this.student).subscribe({
      next: (data) => {
        this.student = data;
        this.isLoading = false;
        alert('Student updated successfully!');
      },
      error: () => {
        this.isLoading = false;
        alert('Error updating student.');
      }
    });
  }

}
