import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DomSanitizer } from "@angular/platform-browser";
import { ActionSheetController, ToastController, Loading } from "ionic-angular";
import { TabsPage } from "../tabs/tabs";
import { OffresPage } from "../offres/offres";
import { MoncomptePage } from "../moncompte/moncompte";
import { ObjectifPage } from "../objectif/objectif";
import { PaiementPage } from "../paiement/paiement";
import { EquipePage } from "../equipe/equipe";
import "rxjs/add/operator/toPromise";
import { Subscription } from "rxjs";
import { MessagePage } from "../message/message";
import { ResultatsPage } from "../resultats/resultats";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  Nav
} from "ionic-angular";
import { StorageService } from "../../Stores/Services/storage-service";

import { AppStore } from "../../app/app.store";
import { Store } from "@ngrx/store";
import { UserInformationAction } from "../../Stores/User/user.reducer";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/toPromise";

export interface PageInterface {
  title: string;
  pageName?: any;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@IonicPage()
@Component({
  selector: "page-acceuil",
  templateUrl: "acceuil.html"
})
export class AcceuilPage {
  rootPage = TabsPage;

  @ViewChild(Nav)
  nav: Nav;

  pages: PageInterface[] = [
    {
      title: "Objectif",
      pageName: ObjectifPage,
      tabComponent: ObjectifPage,
      index: 0,
      icon: "card"
    },
  
    {
      title: "Resutats",
      pageName: ResultatsPage,
      tabComponent: ResultatsPage,
      index: 1,
      icon: "book"
    },
    {
      title: "Offres",
      pageName: OffresPage,
      tabComponent: OffresPage,
      index:2,
      icon: "card"
    },
   
    {
      title: "Equipe",
      pageName: EquipePage,
      tabComponent: EquipePage,
      index:3,
      icon: "logo-steam"
    },
    {
      title: "Mode de paiement ",
      pageName: PaiementPage,
      tabComponent: PaiementPage,
      index: 4,
      icon: "logo-usd"
    },
    {
      title: "Mon Compte",
      pageName: MoncomptePage,
      tabComponent: MoncomptePage,
      icon: "person"
    },
    { title: "A propos ", pageName: "A propos", index: 3, icon: "help" },
    {
      title: "Deconnexion ",
      pageName: "Deconnexion",
      index: 0,
      icon: "ios-log-out"
    }
  ];

  private userStateSubscription: Subscription;
  form: FormGroup;
  user: any;
  informationUser: any;
  token: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public http: Http,
    private store: Store<AppStore>
  ) {}

  ngOnInit() {
    //this.store.dispatch(new UserInformationAction(this.navParams.get('token')));
    this.userStateSubscription = this.store
      .select("userState")
      .subscribe(userState => {
        this.user = userState.loading;
        this.informationUser = userState.user;
        console.log(userState.user);
      });
  }

  redux() {
    this.navCtrl.push(MessagePage);
  }

  openPage(page: PageInterface) {
    let params = {};
    if (page.index) {
      params = { tabIndex: page.index };
    }
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
    } else {
      this.nav.setRoot(page.pageName, params);
    }
  }
  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNav();
    if (childNav) {
      if (
        childNav.getSelected() &&
        childNav.getSelected().root === page.tabComponent
      ) {
        return "primary";
      }
      return;
    }

    if (this.nav.getActive()) {
      if (this.nav.getActive().component === page.pageName) {
        return "primary";
      }
    }
  }
}
