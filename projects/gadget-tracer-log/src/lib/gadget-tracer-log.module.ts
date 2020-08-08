import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { HttpClientModule } from '@angular/common/http';
import { GadgetTracerLogComponent} from './gadget-tracer-log.component';
import { CrudUiComponent } from './CRUD-UI/gadget-tracer-log-crud.componant';
import { GadgetPopupDialogComponent} from './Popup-UI/gadget-tracer-log-popup.component';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GadgetTracerDeleteSelectDialogComponent } from './gadget-tracer-delete-select-dialog/gadget-tracer-delete-select-dialog.component';
import {MatRadioModule} from '@angular/material/radio';
import { GadgetTracerLogService } from './gadget-tracer-log.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { QuantityManagerComponent } from './quantity-manager/quantity-manager.component';


@NgModule({
  imports:
    [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MatCardModule,
      MatInputModule,
      MatFormFieldModule,
      MatButtonModule,
      MatDividerModule,
      MatListModule,
      MatMomentDateModule,
      MatStepperModule,
      MatDialogModule,
      MatProgressBarModule,
      MatCheckboxModule,
      MatIconModule,
      MatSelectModule,
      MatDatepickerModule,
      MatSnackBarModule,
      MatRadioModule,
      MatTableModule,
      MatPaginatorModule,
      FlexLayoutModule,
      HttpClientModule,
      MatTooltipModule,
      RouterModule.forChild([
        {
          path: '', pathMatch: 'full', component: GadgetTracerLogComponent
        }
      ])
    ],
    
  declarations:
    [
      GadgetTracerLogComponent,CrudUiComponent,GadgetPopupDialogComponent,GadgetTracerDeleteSelectDialogComponent,CheckoutComponent, QuantityManagerComponent
    ],
    providers: [
      {
        provide: 'gadget-symptom-config',
        useValue: GadgetTracerLogComponent
      },
      
        {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {strict: true}},
      MatDatepickerModule,
      GadgetTracerLogService,
    ],
  exports:
    [
      GadgetTracerLogComponent
    ],
  entryComponents: [
    GadgetTracerLogComponent,CrudUiComponent,GadgetPopupDialogComponent,GadgetTracerDeleteSelectDialogComponent
  ]
})
export class GadgetTracerLogModule { }
