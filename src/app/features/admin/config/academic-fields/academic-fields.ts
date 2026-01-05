import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { AcademicProfileFieldDto } from '../../../../core/models/academic-profile-field.dto';
import { AcademicFieldsConfigService } from '../../../../core/services/academic-fields-config.service';
import { FieldType } from '../../../../core/enums/field-type.enum';

@Component({
  selector: 'app-academic-fields',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    ToggleSwitchModule,
    ButtonModule,
    SelectModule,
    Toast
  ],
  providers: [MessageService],
  templateUrl: './academic-fields.html',
  styleUrl: './academic-fields.css'
})
export class AcademicFields implements OnInit {

  fields: AcademicProfileFieldDto[] = [];

  fieldTypes = Object.values(FieldType).map(type => ({
    label: type,
    value: type
  }));

  constructor(
    private fieldService: AcademicFieldsConfigService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadFields();
  }

  loadFields(): void {
    this.fieldService.findAll().subscribe(fields => this.fields = fields);
  }

  /* =========================
     VALIDATION
     ========================= */

  isRowInvalid(field: AcademicProfileFieldDto): boolean {
    return !field.name?.trim()
        || !field.label?.trim()
        || !field.type;
  }

  hasPendingNewRow(): boolean {
    return this.fields.some(
      f => f.id == null && this.isRowInvalid(f)
    );
  }

  /* =========================
     CRUD
     ========================= */

  onCellEditComplete(field: AcademicProfileFieldDto): void {
    if (this.isRowInvalid(field)) {
      return;
    }

    this.fieldService.save(field).subscribe({
      next: () => {
        this.loadFields();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Academic field saved successfully.'
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not save academic field.'
        });
      }
    });
  }

  addNewRow(): void {
    if (this.hasPendingNewRow()) {
      return;
    }

    this.fields = [
      {
        id: undefined as any,
        name: '',
        label: '',
        type: undefined as any,
        required: false
      },
      ...this.fields
    ];
  }

  deleteRow(field: AcademicProfileFieldDto): void {
    if (!field.id) {
      this.fields = this.fields.filter(f => f !== field);
      return;
    }

    this.fieldService.delete(field).subscribe({
      next: () => {
        this.loadFields();
        this.messageService.add({
          severity: 'success',
          summary: 'Deleted',
          detail: 'Academic field deleted.'
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not delete academic field.'
        });
      }
    });
  }
}
