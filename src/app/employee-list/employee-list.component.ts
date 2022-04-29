import { Component, ViewChild, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from "../services/employee.service";
import { Employee } from "../model/employee";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit {
  dataSource!: MatTableDataSource<Employee>;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'emailId', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private employeeService: EmployeeService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.getEmployees()
  }


  private getEmployees() {
    this.employeeService.getEmployeesList().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: () => alert("uy")
    });
  }

  employeeDetails(id: number) {
    this.router.navigate(['employee-details', id]);
  }

  updateEmployee(id: number) {
    this.router.navigate(['update-employee', id]);
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(() => this.getEmployees())
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
