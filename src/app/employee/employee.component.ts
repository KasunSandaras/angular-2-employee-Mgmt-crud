import {Component, OnInit, OnChanges} from '@angular/core';
import {Router} from '@angular/router';
import {EmployeeService} from './employee.service';
import {Employee} from './employee';

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnChanges{

    employees: Employee[];
    statusMessage: string;
    employee = new Employee();
    newEmployee = true;
    submit_label = "Add Employee";
    
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

    addEmployee(): void{
        this.submit_label = "Add Employee";
        console.log("inside the addEmployee()::::::");
        this._employeeService.addEmployee(this.employee)
            .subscribe((response) => {console.log(response); this.getEmployees();this.reset();},
            (error) =>{
                console.log(error);
                this.statusMessage = "Problem with service. Please try again later!";
            }
        );   
        
        console.log("end of addEEmployee()::::");
        //this._router.navigate(['/employees']);
    }

    private reset(){
        console.log("inside the reset():::::::");
        this.employee.id = null;
        this.employee.name = null;
        this.employee.designation = null;
        this.employee.office = null;
        console.log("end of reset():::::::");
    }

    ngOnChanges(changes:any) {
        console.log("calling ngOnChanges()::::::::");
    }

    deleteEmployee(employeeId: number){
        console.log("Inside the deleteEmployee()::::Employee id::::"+employeeId);
        this._employeeService.deleteEmployee(employeeId)
            .subscribe((response) => {console.log(response); this.getEmployees();},
            (error) =>{
                console.log(error);
                this.statusMessage = "Problem with service. Please try again later!";
            });
            this.reset();
            console.log("end of deleteEmployee():::::::");
    }

    getEmployee(employeeId: string){
        this.submit_label = "Update Employee";
        console.log("Inside the updateEmployee()::::::Employee id::::"+employeeId);
        this._employeeService.getEmployeeById(employeeId)
            .subscribe((employeeData) => {this.employee = employeeData; this.getEmployees(); }),
            (error) => {
                console.log(error);
                this.statusMessage = "Problem with service. Please try again later!";
            }
        this.reset();    
        console.log("end of updateEmployee()::::::");
    }
}