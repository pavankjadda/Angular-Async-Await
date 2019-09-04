# Synchronous HTTP calls in Angular 8 using Async and Await
---

Observables in Angular offer significant benefits over other techniques for event handling, asynchronous programming, and handling multiple values. But some times we may want to wait for the response from previous HTTP call or load default settings for an application. In that case, we use Async and Await functions to achieve this. 

An asynchronous function is a function which operates asynchronously via the event loop, using an implicit Promise to return its result. But the syntax and structure of your code using async functions are much more like using standard synchronous functions. The await operator is used to wait for a Promise. It can only be used inside an async function.
```
async method() 
{
  var x = await resolveAfter2Seconds(10);
  console.log(x); // 10
}
```
## Technologies
1. Angular 7
2. json-server (to mock Rest API)

# Synchronous HTTP call in Angular 8
1. json-server helps to mock the backend REST API and stores entered data. In this application, we demonstrate a simple use case with two operations, create new employee and fetch a list of employees
First, create db.json file, that holds employee information
```
{
 "employees": 
[
  {
   "id": 1,
   "firstName": "John",
   "lastName": "Reese"
  },
  {
   "id": 2,
   "firstName": "Steve",
   "lastName": "Rogers"
  }
 ]
}
```
2. Add json-server dependency and json-server -- watch db.json script in package.json as shown below
```
"dependencies": 
{   
  ....,    
  "json-server": "^0.14.2",
  ....,
},
"scripts": 
{
  ....,
  "json-server": "json-server --watch db.json"
  ....,
}
```
3. start json-server by executing following command on project root folder
```
$ json-server -- watch db.json
```
4. Now that, backend mock REST Api server is available, let's build front end. In order for async to work, both component method and service method should annotate with async and await.

**app.component.ts**
```
async createEmployee()
    {
        let url = API_URL + 'employees';
        let employee = new Employee();
        employee.id = Math.floor(Math.random() * 10000);
        employee.firstName = "John";
        employee.lastName = "McCain" + employee.id;
        //Wait for POST operation to complete then return response
        let createdEmployee=await this.employeeService.createEmployee(url, employee);
        console.log('Created Employee: '+createdEmployee);
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
employee.service.ts

async createEmployee(url:string,employee: Employee)
  {
    return await this.httpClient.post(url, employee).toPromise();
  }
getEmployees(url:string)
  {
    return this.httpClient.get<Employee[]>(url);
  }
  ```
5. createEmployee() method on component class annotated with async and employeeService.createEmployee() annotated with await. This instructs compiler to wait for execution of `this.employeeService.createEmployee()` method, then execute `this.getEmployees()`
6. When you click on CreateNew button on html page, it creates new employee with Random Id, then `this.getEmployees()` gets list of employees


---

