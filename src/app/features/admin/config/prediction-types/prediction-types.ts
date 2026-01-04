import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ButtonModule } from 'primeng/button';

import { PredictionType } from '../../../../core/import-export/models/prediction.type.model';
import { PredictionConfigService } from '../../../../core/import-export/service/prediction.config.service';
import { PredictionValueType } from '../../../../core/import-export/models/prediction-value-type';
import { MessageService } from 'primeng/api';
import { Toast } from "primeng/toast";

@Component({
  selector: 'app-prediction-types',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    SelectModule,
    ToggleSwitchModule,
    ButtonModule,
    Toast
],
  templateUrl: './prediction-types.html',
  styleUrl: './prediction-types.css'
})
export class PredictionTypes implements OnInit {

  predictionTypes: PredictionType[] = [];

  valueTypes = Object.entries(PredictionValueType).map(([key, value]) => ({
      label: value,
      value: key
    }));

  constructor(
    private predictionConfigService: PredictionConfigService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadPredictionTypes();
  }

  loadPredictionTypes(): void {
    this.predictionConfigService
      .getAllPredictionTypes()
      .subscribe(types => this.predictionTypes = types);
  }

  /* =========================
     VALIDATION
     ========================= */

  isRowInvalid(type: PredictionType): boolean {
    return !type.code?.trim()
        || !type.label?.trim()
        || !type.valueType;
  }

  hasPendingNewRow(): boolean {
    return this.predictionTypes.some(
      t => t.id == null && this.isRowInvalid(t)
    );
  }

  /* =========================
     CRUD
     ========================= */

  onCellEditComplete(type: PredictionType): void {
    if (this.isRowInvalid(type)) {
      return;
    }

    this.predictionConfigService
      .savePredictionType(type)
      .subscribe({
        next: (savedType) => {
          this.loadPredictionTypes();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Prediction type saved successfully.'
          });
        },
        error: (err) => {
          console.error('Error saving prediction type:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Could not save prediction type. Please try again.'
          });
        }
      });
  }

  addNewRow(): void {
    if (this.hasPendingNewRow()) {
      return;
    }

    this.predictionTypes = [
      {
        id: undefined,
        code: '',
        label: '',
        description: '',
        valueType: PredictionValueType.NUMBER,
        active: true
      },
      ...this.predictionTypes
    ];
  }

  deleteRow(type: PredictionType): void {
    console.log('type to delete:', type);
    
    if (type.id) {      
      this.predictionConfigService.deletePredictionType(type.id!).subscribe({
        next: () => {
          this.loadPredictionTypes();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Prediction type deleted successfully.'
          });
        },
        error: (err) => {
          console.error('Error deleting prediction type:', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Could not delete prediction type. Please try again.'
          });
        }
      });
    }    
  }
}
