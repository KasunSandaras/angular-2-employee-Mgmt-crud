import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Employee } from './employee';

@Injectable()
export class EmployeeService{
    
    constructor(private _httpService: Http){}

    getAllEmployees(): Observable<Employee[]>{
        console.log("inside the service getAllEmployees():::::::");
        return this._httpService.get("http://localhost:8080/JerseyHibernateApp/webapi/employees")
                .map((response: Response) => response.json())
                .catch(this.handleError);
    }

    getEmployeeById(employeeId: string): Observable<Employee>{
        console.log("Inside the getemployeeById() service::::::");
        return this._httpService.get("http://localhost:8080/JerseyHibernateApp/webapi/employees/"+employeeId)
                .map((response: Response) => response.json())
                .catch(this.handleError);
    }

    addEmployee(employee: Employee){
        let body = JSON.parse(JSON.stringify(employee));
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        if(employee.id){    
            let body = JSON.parse(JSON.stringify(employee));
            console.log("Inside addEmployee update service():::::::");
            return this._httpService.put("http://localhost:8080/JerseyHibernateApp/webapi/employees/update/"+employee.id, body, options);
        }else{

            const { id, ...noA } = employee;
            console.log(noA); // => { b: 2, c: 3 }
            let body = JSON.parse(JSON.stringify(noA));
            console.log("Inside addEmployee add service():::::::");
            return this._httpService.post("http://localhost:8080/JerseyHibernateApp/webapi/employees/create", body, options);
        }
    }

    deleteEmployee(employeeId: number){
        console.log("Inside the service deleteEmployee():::::employee id:::"+employeeId);
        return this._httpService.delete("http://localhost:8080/JerseyHibernateApp/webapi/employees/delete/"+employeeId);
    }

    private handleError(error: Response){
        console.error(error);
        return Observable.throw(error);
    }
}