import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "./service/employee.service";
import {API_URL} from "./app.constants";
import {Employee} from "./model/employee";


@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit
{
    name = 'Angular';

    employees: Array<Employee>;

    constructor(private employeeService:EmployeeService)
    {

    }

    ngOnInit(): void
    {
        this.getEmployees();
    }

    getEmployees()
    {
        let url=API_URL+'employees';
        this.employeeService.getEmployees(url).subscribe(
            data=>
            {
                this.employees=data;
            },
            error1 =>
            {
                console.log('Error');
            }
        )
    }

    employeesAvailable()
    {
        return this.employees!=undefined;
    }

    async createEmployee()
    {
        let url = API_URL + 'employees';
        let employee = new Employee();
        employee.id = Math.floor(Math.random() * 10000);
        employee.firstName = "John";
        employee.lastName = "McCain" + employee.id;

        let createdEmployee=await this.employeeService.createEmployee(url, employee);
        console.log('Created Employee: '+createdEmployee);
        this.getEmployees();
    }
}
