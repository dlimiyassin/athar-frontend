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

@Component({
  selector: 'app-student-list-admin',
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
    ButtonModule
  ],
  templateUrl: './student-list-admin.html',
  styleUrl: './student-list-admin.css',
})
export class StudentListAdmin implements OnInit {

  students: StudentDto[] = [];
  loading = true;

  userStatuses = Object.values(UserStatus);

  constructor(
    private studentService: StudentService,
    public layoutService: LayoutService
  ) {}

  ngOnInit(): void {
    //this.layoutService.onMenuToggle();
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
}
