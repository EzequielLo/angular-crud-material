import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, } from '@angular/forms';
import { Employee } from '../model/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  private id!: number;
  public employee!: Employee;
  public updateEmployeeForm = this.fb.group({
    firstName: [[""], [Validators.pattern(/[a-z]{1,20}/g)]],
    lastName: [[""], [Validators.pattern(/[a-z]{1,20}/g)]],
    emailId: [[""], [Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g)]],
  })

  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.subscribeEmployee();
  }

  subscribeEmployee() {
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data;
      const { firstName, lastName, emailId } = this.employee;
      this.updateEmployeeForm.patchValue({
        firstName,
        lastName,
        emailId
      })
    });

  }

  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }

  onSubmit() {
    if (this.updateEmployeeForm.invalid) {

      this.updateEmployeeForm.markAllAsTouched();
      return
    } else {

      this.employeeService.updateEmployee(this.id, this.updateEmployeeForm.value)
        .subscribe(() => this.goToEmployeeList());
    }
  }

}
