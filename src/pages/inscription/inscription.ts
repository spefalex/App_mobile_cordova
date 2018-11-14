import { Component,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,ActionSheetController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ImagePicker } from "@ionic-native/image-picker";
import { Base64 } from "@ionic-native/base64";
import { GlobalService } from "../../Stores/Services/global-service";
import { AppStore } from "../../app/app.store";
import { Store } from "@ngrx/store";
import { UserInscriptionAction} from "../../Stores/User/user.reducer";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer";
import { CameraOptions, Camera } from "@ionic-native/camera";
import { File } from "@ionic-native/file";
import { FilePath } from "@ionic-native/file-path";
/**
 * Generated class for the InscriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inscription',
  templateUrl: 'inscription.html',
})
export class InscriptionPage {
  public form: FormGroup;
  public clientPicture: any;
  public ClientFirstName  : any;
  public ClientLastName  : any;
  public ClientNumero  : any;
  public ClientEmail  : any;
  public ClientPassword  : any;
  public ClientMotDePasse1:any;
  public ClientMotDePasse2:any;
  public state;
  public pathsWEB;
  public pathsMobile;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fb:FormBuilder,  public toastCtrl  : ToastController,  private imagePicker: ImagePicker,
    private base64: Base64,  private camera: Camera,
    public element: ElementRef,public actionSheetCtrl: ActionSheetController,private globalService: GlobalService, private store: Store<AppStore>) {
    this.form = fb.group({
      "firstname" : ["", Validators.required],
      "lastname": ["", Validators.required],
      "numeroTelephone": ["", Validators.required],
      "email": ["", Validators.required],
      "motdepasse1": ["", Validators.required],
      "motdepasse2": ["", Validators.required],
      "avatar": null
   });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InscriptionPage');
    this.clientPicture="assets/imgs/blank-avatar.jpg";
    this.state= this.globalService.verification();
  }
  imageFIle() {
    let options = {
      maximumImagesCount: 3,
      quality: 90,
      outputType: 1
    };
    this.imagePicker.getPictures(options).then(
      results => {
        for (var i = 0; i < results.length; i++) {
          console.log("Image URI: " + results[i]);
          this.base64.encodeFile(results[i]).then(
            (base64File: string) => {
              alert(base64File);
            },
            err => {
              console.log(err);
            }
          );
          this.clientPicture = "data:image/jpeg;base64," + results[i];
        }
      },
      err => {}
    );
  }

  takePhoto2(sourceType: number) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.clientPicture = "data:image/jpeg;base64," + imageData;
        console.log("testa mandeh", this.clientPicture);
      },
      err => {
        // Handle error
      }
    );
  }
  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Sélectionner une source d'image",
      buttons: [
        {
          text: "Load from Library",
          handler: () => {
            this.imageFIle();
          }
        },
        {
          text: "Charger depuis la bibliothèque",
          handler: () => {
            this.takePhoto2(1);
          }
        },
        {
          text: "Annuler",
          role: "cancel"
        }
      ]
    });
    actionSheet.present();
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('avatar').setValue({
          filename: file.name,
          filetype: file.type
        });
        if (
          file.type.split('/').pop() == 'jpeg' ||
          file.type.split('/').pop() == 'png' ||
          file.type.split('/').pop() == 'jpg' ||
          file.type.split('/').pop() == 'gif'
        ) {
          this.clientPicture = reader.result;
          this.clientPicture = reader.result;
          this.pathsWEB = event.target.files[0];
        } else {
          this.errorFile();
        }
      };
    }
  }
  errorFile() {
    let toast = this.toastCtrl.create({
      message: 'Veuillez sélectionner une image',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  inscription() {
    var firstname = this.form.value['firstname'];
    var password = this.form.value['motdepasse1'];
    this.store.dispatch(new UserInscriptionAction(firstname,password));
    this.store
      .select("userState")
      .subscribe(userState => {
       console.log('userstate',userState)
      });
  }
}
