import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Employee } from '../model/employee';

@Injectable({
	providedIn: 'root',
})
export class EmployeeService {
	httpClient = inject(HttpClient);

	getEmployees(url: string) {
		return this.httpClient.get<Employee[]>(url);
	}

	async createEmployee(url: string, employee: Employee) {
		return await firstValueFrom(this.httpClient.post(url, employee));
	}
}
