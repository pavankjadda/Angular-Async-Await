import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from './service/employee.service';
import { API_URL } from './app.constants';
import { Employee } from './model/employee';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	imports: [MatTableModule, MatPaginatorModule, MatButtonModule],
})
export class AppComponent implements OnInit, AfterViewInit {
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sorter: MatSort;

	employeeService = inject(EmployeeService);
	displayedColumns: string[] = ['id', 'firstName', 'lastName'];
	dataSource = new MatTableDataSource<Employee>();

	ngOnInit(): void {
		this.getEmployees();
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		//this.dataSource.sorter = this.sorter;
	}

	getEmployees() {
		const url = API_URL + 'employees';
		this.employeeService.getEmployees(url).subscribe(
			(data) => {
				this.dataSource = new MatTableDataSource<Employee>(data);
				this.dataSource.paginator = this.paginator;
			},
			() => {
				console.log('Error');
			}
		);
	}

	async createEmployee() {
		const url = API_URL + 'employees';
		const employee = new Employee();
		employee.id = Math.floor(Math.random() * 10000);
		employee.firstName = 'John';
		employee.lastName = 'McCain' + employee.id;

		const createdEmployee = await this.employeeService.createEmployee(url, employee);
		console.log('Created Employee: ' + createdEmployee);
		this.getEmployees();
	}
}
