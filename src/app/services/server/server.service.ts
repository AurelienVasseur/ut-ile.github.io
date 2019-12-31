import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Email } from 'src/app/models/email/email';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  serverUrl: string = "https://us-central1-ut-ile.cloudfunctions.net/api";

  constructor(private http: HttpClient) { }

  getAPIData() : Observable<Object>{
    return this.http.get('https://jsonplaceholder.typicode.com/users')
  }

  sendEmail(information: Email) : Observable<Object>{
    return this.http.post(this.serverUrl + "/sendMail", information);
  }

}
