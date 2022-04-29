import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../model/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  id!: number
  employee!: Employee
  constructor(private route: ActivatedRoute,
    private employeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.employeService.getEmployeeById(this.id)
      .subscribe(data => this.employee = data);
  }
}
