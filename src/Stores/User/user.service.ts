import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/toPromise";
import { Observable } from "rxjs";

@Injectable()
export class UserService {
  private apiHost: string = "http://172.17.0.1:8080";

  constructor(private http: Http) {}

  public login(email: string, password: string): Observable<any> {
    console.log(email)
    let body: string = "name=" + email + "&password=" + password,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ "Content-Type": type }),
      options: any = new RequestOptions({ headers: headers });
      return this.http
      .post(this.apiHost + "/authenticate", body,options)
      .map(response => {
        return response.json();
      })
      .catch(err => {
        throw Observable.throw(err);
      });
  }
  public inscription(name: string, password: string): Observable<any> {
    console.log(name)
    let body: string = "name=" + name + "&password=" + password,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ "Content-Type": type }),
      options: any = new RequestOptions({ headers: headers });
      return this.http
      .post(this.apiHost + "/inscription", body,options)
      .map(response => {
        
        return response.json();
      })
      .catch(err => {
        throw Observable.throw(err);
      });
  }

  public infoUser(token:string) : Observable<any> {
    //token = localStorage.getItem('idUser'); on peut utiliser le local storage
    return this.http.get(this.apiHost+'/api/users?token='+token)
    .map(res => { return res.json()})
  }

}
