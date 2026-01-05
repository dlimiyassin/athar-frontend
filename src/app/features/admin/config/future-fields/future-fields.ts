import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ButtonModule } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { FutureFieldOfStudy } from '../../../../core/import-export/models/future.field.of.study.model';
import { PredictionConfigService } from '../../../../core/import-export/service/prediction.config.service';

@Component({
  selector: 'app-future-fields',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    ToggleSwitchModule,
    ButtonModule,
    Toast
  ],
  providers: [MessageService],
  templateUrl: './future-fields.html',
  styleUrl: './future-fields.css'
})
export class FutureFields implements OnInit {

  fields: FutureFieldOfStudy[] = [];

  constructor(
    private predictionConfigService: PredictionConfigService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadFields();
  }

  loadFields(): void {
    this.predictionConfigService
      .getAllFields()
      .subscribe(fields => this.fields = fields);
  }

  /* =========================
     VALIDATION
     ========================= */

  isRowInvalid(field: FutureFieldOfStudy): boolean {
    return field.code == null
        || !field.label?.trim();
  }

  hasPendingNewRow(): boolean {
    return this.fields.some(
      f => f.id == null && this.isRowInvalid(f)
    );
  }

  /* =========================
     CRUD
     ========================= */

  onCellEditComplete(field: FutureFieldOfStudy): void {
    if (this.isRowInvalid(field)) {
      return;
    }

    this.predictionConfigService
      .saveField(field)
      .subscribe({
        next: () => {
          this.loadFields();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Field of study saved successfully.'
          });
        },
        error: (err) => {
          console.error('Error saving field:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Could not save field of study.'
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
        code: undefined as any,
        label: '',
        active: true
      },
      ...this.fields
    ];
  }

  deleteRow(field: FutureFieldOfStudy): void {
    if (!field.id) {
      this.fields = this.fields.filter(f => f !== field);
      return;
    }

    this.predictionConfigService
      .deleteField(field.id)
      .subscribe({
        next: () => {
          this.loadFields();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Field of study deleted successfully.'
          });
        },
        error: (err) => {
          console.error('Error deleting field:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Could not delete field of study.'
          });
        }
      });
  }
}
