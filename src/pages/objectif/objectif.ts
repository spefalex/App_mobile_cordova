import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessagePage } from "../message/message";
import { AppStore } from "../../app/app.store";
import { Store } from "@ngrx/store";
/**
 * Generated class for the ObjectifPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-objectif',
  templateUrl: 'objectif.html',
})
export class ObjectifPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,   private store: Store<AppStore>) {
  }
  ngOnInit() {
    
    this.store
      .select("userState")
      .subscribe(userState => {

        console.log(userState.user);
      });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ObjectifPage');
  }
  redux() {
    this.navCtrl.push(MessagePage);
  }

}
