import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TeacherService } from '../../../../core/services/teacher.service';
import { UserDto } from '../../../../zBase/security/model/userDto.model';
import { Tag } from "primeng/tag";
import { Router } from '@angular/router';


@Component({
  selector: 'app-teacher-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    ToggleSwitchModule,
    Toast,
    Tag
],
  providers: [MessageService],
  templateUrl: './teacher-list.html',
  styleUrl: './teacher-list.css'
})
export class TeacherList implements OnInit {
  constructor(
    private teacherService: TeacherService,
    private messageService: MessageService,
    private router: Router
  ) {}

  teachers: UserDto[] = [];

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers(): void {
    this.teacherService.findAll().subscribe({
      next: teachers => this.teachers = teachers
    });
  }

  /* =========================
     VALIDATION
     ========================= */

  isRowInvalid(teacher: UserDto): boolean {
    return !teacher.firstName?.trim()
        || !teacher.lastName?.trim()
        || !teacher.email?.trim();
  }

  hasPendingNewRow(): boolean {
    return this.teachers.some(
      t => t.id == null && this.isRowInvalid(t)
    );
  }

  /* =========================
     CRUD
     ========================= */

  onCellEditComplete(teacher: UserDto): void {
    if (this.isRowInvalid(teacher)) {
      return;
    }

    this.teacherService.update(teacher).subscribe({
      next: () => {
        this.loadTeachers();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Teacher saved successfully.'
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not save teacher.'
        });
      }
    });
  }

  addNewRow(): void {
    if (this.hasPendingNewRow()) {
      return;
    }

    this.teachers = [
      {
        id: undefined as any,
        firstName: '',
        lastName: '',
        email: '',
        enabled: true
      } as UserDto,
      ...this.teachers
    ];
  }

  deleteRow(teacher: UserDto): void {
    if (!teacher.id) {
      this.teachers = this.teachers.filter(t => t !== teacher);
      return;
    }

    this.teacherService.delete(teacher.id as string).subscribe({
      next: () => {
        this.loadTeachers();
        this.messageService.add({
          severity: 'success',
          summary: 'Deleted',
          detail: 'Teacher deleted successfully.'
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not delete teacher.'
        });
      }
    });
  }


  viewRow(teacher: UserDto) {
    this.router.navigate(['app/admin/view/teacher-view/', teacher.id]);
  }

  addTeacher() {
    this.router.navigate(['app/admin/view/teacher-create']);
  }
}
