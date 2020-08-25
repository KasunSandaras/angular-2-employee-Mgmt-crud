import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Employee } from './employee';
import { Router } from '@angular/router';


@Component({
    selector: 'employee-list',
    templateUrl: './employeeList.component.html',
    styleUrls: ['./employeeList.component.css']
})
export class EmployeeListComponent implements OnInit{
    employee = new Employee();
    statusMessage: string;
    employees: Employee[];
    constructor(private _employeeService: EmployeeService,
                private _router: Router){}
    
    ngOnInit(): void {
        console.log("calling ngOnInit()::::");
        this.getEmployees();
    }

    getEmployees(): void{
        console.log("Inside getEmployees():::::")
        this._employeeService.getAllEmployees()
            .subscribe((employeeData) => this.employees = employeeData,
            (error) =>{
                console.log(error);
                this.statusMessage = "Problem with service. Please try again later!";
            }
        );
        console.log("end of getEmployees():::::");
    }
}