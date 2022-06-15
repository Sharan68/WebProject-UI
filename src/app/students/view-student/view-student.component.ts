import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/Models/Api-Models/ui-model/student.model';
import { GenderService } from 'src/app/services/gender.service';
import { StudentServiceService } from '../student-service.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  studentId: string | null | undefined;
  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    genderId: '',
    profileImageURL: '',
    gender: {
      id: '',
      description: ''
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: ''
    }
  }

  constructor(
    private readonly studentService: StudentServiceService,
    private readonly route: ActivatedRoute,
    private readonly genderService: GenderService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.studentId = params.get('id');
        if(this.studentId) {
          this.studentService.getStudent(this.studentId)
          .subscribe(
            (sucessResponse) => {
              this.student = sucessResponse;
            }
          );

          this.genderService.getGenderList().subscribe(
            (sucessResponse) => {
              console.log(sucessResponse);
            }
          );
        }
      }
    )
  }

}
