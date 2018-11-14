import "rxjs/add/operator/map";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Platform } from 'ionic-angular';
@Injectable()
export class GlobalService {
  

  constructor( private platform: Platform,) {}

  verification() {
    if (this.platform.is('cordova')) {
      console.log('mobile');
      return true;
    } else {
      console.log('web');
      return false;
    }
  }
}
