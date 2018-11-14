import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultatsPage } from './resultats';

@NgModule({
  declarations: [
    ResultatsPage,
  ],
  imports: [
    IonicPageModule.forChild(ResultatsPage),
  ],
})
export class ResultatsPageModule {}
