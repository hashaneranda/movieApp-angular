import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { initApp } from '@app/app.module';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: APP_INITIALIZER,
        useFactory: initApp,
        deps: [HttpClient, TranslateService],
        multi: true,
      },
    }),
    MatInputModule,
  ],
})
export class RegisterModule {}
