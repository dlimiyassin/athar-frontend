

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FieldType } from '../../../../core/enums/field-type.enum';
import { AcademicProfileFieldDto } from '../../../../core/models/academic-profile-field.dto';
import { AcademicFieldsConfigService } from '../../../../core/services/academic-fields-config.service';


@Component({
  selector: 'app-academic-fields',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    SplitButtonModule,
    InputTextModule,
    CheckboxModule,
    ToastModule,
  ],
  standalone: true,
  providers: [MessageService],
  templateUrl: './academic-fields.html',
  styleUrl: './academic-fields.css',
})
export class AcademicFields implements OnInit {

  fields: AcademicProfileFieldDto[] = [];
  selectedFields : AcademicProfileFieldDto[] = [];

  field: AcademicProfileFieldDto = {} as AcademicProfileFieldDto;
  fieldDialog = false;
  submitted = false;
  editMode = false;
  fieldTypeDropdownVisible:boolean = false;
  fieldTypes : FieldType[] = []

  constructor(
    private fieldService: AcademicFieldsConfigService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadFields();
    this.fieldTypes = Object.values(FieldType);
  }

    toggleFieldTypeDropdown(){
    this.fieldTypeDropdownVisible = !this.fieldTypeDropdownVisible;
  }

  setFieldType(fieldType: FieldType){
    this.field.type = fieldType;
    this.fieldTypeDropdownVisible = false;
  }

  loadFields(): void {
    this.fieldService.findAll().subscribe({
      next: (data: AcademicProfileFieldDto[]) => (this.fields = data),
    });
  }

  openNew(): void {
    this.field = {} as AcademicProfileFieldDto;
    this.submitted = false;
    this.editMode = false;
    this.fieldDialog = true;
  }

  editField(field: AcademicProfileFieldDto): void {
    this.field = { ...field };
    this.editMode = true;
    this.fieldDialog = true;
  }

  hideDialog(): void {
    this.fieldDialog = false;
    this.submitted = false;
  }

  saveField(): void {
    this.submitted = true;

    if (!this.field.name || !this.field.label || !this.field.type) {
      return;
    }

    this.fieldService.save(this.field).subscribe({
      next: (saved: AcademicProfileFieldDto) => {
        this.loadFields();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Field saved successfully',
        });
        this.fieldDialog = false;
        this.field = {} as AcademicProfileFieldDto;
      },
      error: (err) => {
                this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to save field',
        });
      }
    });
  }

  deleteField(field: AcademicProfileFieldDto): void {
    this.fieldService.delete(field).subscribe({
      next : () => {
        this.loadFields();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Field could not be deleted',
        });
      }
    });

    this.messageService.add({
      severity: 'warn',
      summary: 'Deleted',
      detail: 'Field deleted',
    });
  }

  deleteSelected(): void {
    this.fields = this.fields.filter(f => !this.selectedFields.includes(f));
    this.selectedFields = [];
    this.messageService.add({
      severity: 'warn',
      summary: 'Deleted',
      detail: 'Selected fields deleted',
    });
  }
}
