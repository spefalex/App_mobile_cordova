import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppStore } from "../../app/app.store";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";


@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
  private userStateSubscription: Subscription;
  user:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private store:Store<AppStore>) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
    this.userStateSubscription = this.store.select('userState').subscribe(userState => {
      this.user = userState.token;
    
    });
  }

}
