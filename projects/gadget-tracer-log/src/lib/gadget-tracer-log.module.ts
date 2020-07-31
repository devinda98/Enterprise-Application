import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { GadgetTracerLogComponent} from './gadget-tracer-log.component';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

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
      MatStepperModule,
      MatProgressBarModule,
      MatCheckboxModule,
      MatIconModule,
      MatSelectModule,
      MatDatepickerModule,
      MatSnackBarModule,
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
      GadgetTracerLogComponent
    ],
  providers:
    [{
      provide: 'gadget-tracer-log',
      useValue: GadgetTracerLogComponent
    }],
  exports:
    [
      GadgetTracerLogComponent
    ],
  entryComponents: [
    GadgetTracerLogComponent
  ]
})
export class GadgetTracerLogModule { }
