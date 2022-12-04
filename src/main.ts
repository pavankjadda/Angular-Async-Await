import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication, BrowserModule, Title } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

bootstrapApplication(AppComponent, {
	providers: [
		importProvidersFrom(
			BrowserModule,
			CommonModule,
			FormsModule,
			ReactiveFormsModule,
			BrowserAnimationsModule,
			HttpClientModule,
			HttpClientXsrfModule.withOptions(),
			MatSelectModule,
			MatAutocompleteModule,
			MatNativeDateModule,
			MatDatepickerModule
		),
		Title,
		DatePipe,
		{
			provide: MAT_DIALOG_DEFAULT_OPTIONS,
			useValue: { hasBackdrop: true, disableClose: true },
		},
	],
}).catch((err) => console.error('Unable to Boostrap the application. Error:' + err));
