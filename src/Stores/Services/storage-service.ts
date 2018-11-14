import "rxjs/add/operator/map";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class StorageService {
  storage: any;
  data: any;

  constructor(private http: Http) {}

  set(key: string, value: any) {
    return new Promise(resolve => {
      window.localStorage.setItem(key, value);
      resolve(value);
    });
  }

  get(key: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      resolve(window.localStorage.getItem(key));
    });
  }

  remove(key: string) {
    window.localStorage.removeItem(key);
  }

  clear() {
    return new Promise((resolve, reject) => {
      window.localStorage.clear();
      resolve();
    });
  }
}
