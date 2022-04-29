import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent {

  public createEmployeeForm = this.fb.group({
    firstName: [[""], [Validators.pattern(/[a-z]{1,20}/g)]],
    lastName: [[""], [Validators.pattern(/[a-z]{1,20}/g)]],
    emailId: [[""], [Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g)]],
  })


  constructor(private employeeService: EmployeeService,
    private router: Router,
    private fb: FormBuilder) { }


  saveEmployee() {
    this.employeeService.createEmployee(this.createEmployeeForm.value)
      .subscribe(() => this.goToEmployeeList());
  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }

  onSubmit() {
    if (this.createEmployeeForm.invalid) {

      this.createEmployeeForm.markAllAsTouched();
      return
    } else {
      this.saveEmployee();
    }
  }
}
