import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';

import { StudentService } from '../../../../core/services/student.service';
import { StudentDto } from '../../../../core/models/student.dto';
import { UserStatus } from '../../../../core/enums/UserStatus';
import { LayoutService } from '../../../layout/service/layout.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SurveyDto } from '../../../../core/models/survey.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list-teacher',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    SelectModule,
    ButtonModule, ToastModule, ConfirmDialogModule
  ],
  templateUrl: './student-list-teacher.html',
  styleUrl: './student-list-teacher.css'
})
export class StudentListTeacher implements OnInit {

  students: StudentDto[] = [];
  loading = true;

  userStatuses = Object.values(UserStatus);

  constructor(
    private studentService: StudentService,
    private confirmationService: ConfirmationService,
    public layoutService: LayoutService,
    public router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    //this.layoutService.onMenuToggle();
    this.loadStudents();
  }

  
  loadStudents(): void {
    this.loading = true;  
        this.studentService.findAll().subscribe({
      next: students => {
        this.students = students;
        this.loading = false;
      },
      error: () => (this.loading = false)
    }); 
  }


  clear(table: Table): void {
    table.clear();
  }

  getInitial(student: StudentDto): string {
    return student?.user?.lastName?.charAt(0)?.toUpperCase() || '?';
  }

  getUserStatusSeverity(
    status: string
  ): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | null {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Pending':
        return 'info';
      case 'Suspended':
        return 'danger';
      case 'Warning':
        return 'warn';
      default:
        return null;
    }
  }

    confirmDelete(student: any) {
  this.confirmationService.confirm({
    message: `Are you sure you want to delete "${student.user.firstName} ${student.user.lastName}"?`,
    header: 'Confirm Deletion',
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: 'Yes',
    rejectLabel: 'No',
    acceptButtonStyleClass: 'p-button-danger',
    accept: () => this.onDelete(student)
    }); 
  }

    onDelete(student: StudentDto) {
      this.studentService.delete(Number(student.id)).subscribe({
        next: () => {
          this.loadStudents();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Survey deleted successfully.'
          });
        },
        error: (error) => {
          console.error('Error deleting survey:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete survey.'
          });
        }
      });
    }

    viewStudent(student: StudentDto) {
    this.router.navigate(['app/teacher/view/student-view/' + student.user?.id]);
}
}
