import { beforeEach, describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppComponent, NoopAnimationsModule],
			providers: [provideHttpClient(), provideHttpClientTesting()],
		}).compileComponents();
	});

	it('should create', () => {
		const fixture = TestBed.createComponent(AppComponent);
		expect(fixture.componentInstance).toBeTruthy();
	});
});
