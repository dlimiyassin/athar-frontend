import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { UserStatus } from '../../../../core/enums/UserStatus';
import { TeacherService } from '../../../../core/services/teacher.service';
import { UserDto } from '../../../../zBase/security/model/userDto.model';
@Component({
  selector: 'app-create-teacher',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    SelectModule,
    TagModule,
    ProgressSpinnerModule,
    ToastModule
  ],
  templateUrl: './create-teacher.html',
  styleUrl: './create-teacher.css',
})
export class CreateTeacher implements OnInit {


  private teacherService = inject(TeacherService);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);

  form!: FormGroup;
  submitting = false;
  loading = false;

  statusOptions = Object.keys(UserStatus).map(key => ({
    label: UserStatus[key as keyof typeof UserStatus],
    value: key
  }));

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: [''],
      status: ['', Validators.required],
      enabled: [true]
    });
  }

  create(): void {
    if (this.form.invalid) return;

    this.submitting = true;
    const newTeacher: UserDto = this.form.value;

    this.teacherService.save(newTeacher).subscribe({
      next: (res) => {
        this.submitting = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'The teacher has been successfully created.'
        });
        this.form.reset({ enabled: true }); // optional: reset form after creation
      },
      error: () => {
        this.submitting = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'An error occurred while creating the teacher.'
        });
      }
    });
  }
}
