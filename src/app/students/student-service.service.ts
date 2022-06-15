import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../Models/Api-Models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  private baseApiUrl = 'https://localhost:7001'

  constructor(private httpClient: HttpClient) { }

  getStudents() : Observable<Student[]>{
    return this.httpClient.get<Student[]>(this.baseApiUrl + '/Students');
  }
  getStudent(studentId: string) : Observable<Student> {
    return this.httpClient.get<Student>(this.baseApiUrl + '/Students/' + studentId);
  }
}
