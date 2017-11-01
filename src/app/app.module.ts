import { ListHandwritingService } from './components/color-picker/service/list-handwriting.service';
import { WritingService } from './components/writing/service/writing.service';
import { WritingComponent } from './components/writing/writing.component';
import { AdvancedSettingsComponent } from './components/advanced-settings/advanced-settings.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { HttpModule } from '@angular/http';
import { FormGroup, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {PanelModule} from 'primeng/primeng';
import {ColorPickerModule} from 'primeng/primeng';
import {SelectButtonModule} from 'primeng/primeng';
import {InputTextareaModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import { MatSelectModule, MatExpansionModule, MatCardModule, MatInputModule } from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    ColorPickerComponent,
    AdvancedSettingsComponent,
    WritingComponent
  ],
  imports: [
    BrowserModule,
    MatProgressSpinnerModule,
    GrowlModule,
    MatExpansionModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    ColorPickerModule,
    FormsModule,
    SelectButtonModule,
    MatButtonModule,
    HttpModule,
    InputTextareaModule,
    BrowserAnimationsModule
  ],
  providers: [WritingService, ListHandwritingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
