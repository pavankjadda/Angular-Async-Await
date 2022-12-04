import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from './service/employee.service';
import { API_URL } from './app.constants';
import { Employee } from './model/employee';
import { NgForOf, NgIf } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';

@Component({
	standalone: true,
	selector: 'my-app',
	templateUrl: './app.component.html',
	imports: [NgForOf, NgIf, MatTableModule, MatPaginatorModule, MatButtonModule],
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
		let url = API_URL + 'employees';
		this.employeeService.getEmployees(url).subscribe(
			(data) => {
				this.dataSource = new MatTableDataSource<Employee>(data);
				this.dataSource.paginator = this.paginator;
			},
			(error1) => {
				console.log('Error');
			}
		);
	}

	async createEmployee() {
		let url = API_URL + 'employees';
		let employee = new Employee();
		employee.id = Math.floor(Math.random() * 10000);
		employee.firstName = 'John';
		employee.lastName = 'McCain' + employee.id;

		let createdEmployee = await this.employeeService.createEmployee(url, employee);
		console.log('Created Employee: ' + createdEmployee);
		this.getEmployees();
	}
}
