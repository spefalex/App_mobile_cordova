import { Component } from "@angular/core";
import {
  NavController,
  Loading,
  LoadingController,
  ToastController
} from "ionic-angular";
import { AppStore } from "../../app/app.store";
import { Store } from "@ngrx/store";
import {
  UserAction,
  UserInformationAction
} from "../../Stores/User/user.reducer";
import { UserService } from "../../Stores/User/user.service";
import { StorageService } from "../../Stores/Services/storage-service";
import { AcceuilPage } from "../acceuil/acceuil";
import { Modal, ModalController, ModalOptions } from "ionic-angular";
import { InscriptionPage } from "../inscription/inscription";
import { Subscription } from "rxjs";
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  private username: string;
  private password: string;
  private message: string;
  private token: string;
  private userStateSubscription: Subscription;
  private loading: Loading;
  private stateLoading: boolean = false;
  private stateError: boolean = false;
  constructor(
    public navCtrl: NavController,
    private store: Store<AppStore>,
    private us: UserService,
    private storageService: StorageService,
    private modal: ModalController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}
  ionViewDidEnter() {
    this.userStateSubscription = this.store
      .select("userState")
      .subscribe(userState => {
        //voir l\'etat du state console.log('message',userState.message);
        this.message = userState.message;
        this.stateError = userState.error;
        this.stateLoading = userState.loading;
        this.showConnexionFailed();
        this;
        if (userState.token) {
          this.token = userState.token;
          this.navCtrl.push(AcceuilPage);
        }
      });
  }
  hideStateMessage() {
    this.message = "";
  }

  showConnexionFailed() {
    if (this.stateError == true) {
      this.presentToast();
      this.message = "";
    }
  }
  ionViewDidLeave() {
    this.userStateSubscription.unsubscribe();
    this.store.dispatch(new UserInformationAction(this.token));
  }
  acceuil() {
    this.navCtrl.setRoot(AcceuilPage);
  }
  presentLoading() {
    let loading = this.loadingCtrl.create({
      content: 'En cours de connexion...'
    });
  
    loading.present();
    if (this.stateError == true || this.stateLoading == false || this.token) {
      loading.dismiss();
    }
  }
  login() {
    if (this.username == undefined || this.password == undefined) {
      this.message = "Les deux champs sont obligatoires";
    } else {
      this.presentLoading();
      this.store.dispatch(new UserAction(this.username, this.password));
    }
  }

  inscription() {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };

    const myModal: Modal = this.modal.create(InscriptionPage, myModalOptions);

    myModal.present();

    myModal.onDidDismiss(data => {
      console.log("I have dismissed.");
      console.log(data);
    });

    myModal.onWillDismiss(data => {
      console.log("I'm about to dismiss");
      console.log(data);
    });
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: "Vérifier votre connexion ou contacter l'admin",
      duration: 3000,
      position: "top"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }
}
