import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { UserStatus } from '../../../../core/enums/UserStatus';
import { TeacherService } from '../../../../core/services/teacher.service';
import { UserDto } from '../../../../zBase/security/model/userDto.model';

@Component({
  selector: 'app-view-teacher',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    SelectModule,
    TagModule,
    ProgressSpinnerModule
  ],
  templateUrl: './view-teacher.html',
  styleUrl: './view-teacher.css',
})
export class ViewTeacher implements OnInit {

  private route = inject(ActivatedRoute);
  private teacherService = inject(TeacherService);
  private fb = inject(FormBuilder);

  teacherId!: string;
  loading = true;
  submitting = false;

  teacher!: UserDto;
  form!: FormGroup;

statusOptions = Object.keys(UserStatus).map(key => ({
  label: UserStatus[key as keyof typeof UserStatus],
  value: key
}));


  ngOnInit(): void {
    this.teacherId = this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.loadTeacher();
  }

  private initForm(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [{ value: '', disabled: true }],
      phoneNumber: [''],
      status: ['', Validators.required],
      enabled: [true]
    });
  }

  private loadTeacher(): void {
    this.teacherService.findById(this.teacherId).subscribe({
      next: (data) => {
        this.teacher = data;
        console.log(this.statusOptions);
        const matchedStatus = this.statusOptions
        .find(v => v.value === data.status);

        console.log(data.status);
        console.log(matchedStatus);
        
        this.form.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          status: matchedStatus?.value ?? null,
          enabled: data.enabled
        });
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  update(): void {
    if (this.form.invalid) return;

    this.submitting = true;

    const updatedTeacher: UserDto = {
      ...this.teacher,
      ...this.form.getRawValue()
    };

    this.teacherService.update(updatedTeacher).subscribe({
      next: (res) => {
        this.teacher = res;
        this.submitting = false;
      },
      error: () => {
        this.submitting = false;
      }
    });
  }
}
