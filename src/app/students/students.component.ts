import { error } from '@angular/compiler/src/util';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentServiceService } from './student-service.service';
import { Student } from "../Models/Api-Models/ui-model/student.model";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: Student[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email', 'mobile', 'gender', 'edit'];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();

  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  filterString = '';

  constructor(private studentService: StudentServiceService) { }

  ngOnInit(): void {
    //Fetching students
    this.studentService.getStudents()
    .subscribe(
      (sucessResponse) => {
        this.students = sucessResponse;
        this.dataSource = new MatTableDataSource<Student>(this.students);

        if(this.matPaginator) {
          this.dataSource.paginator = this.matPaginator;
        }

        if(this.matSort) {
          this.dataSource.sort = this.matSort;
        }
      },
      (erroResponse) => {
        console.log(erroResponse);
      }
    );
  }

  filterStudents(){
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }

}
