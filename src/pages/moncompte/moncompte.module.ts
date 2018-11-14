import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoncomptePage } from './moncompte';

@NgModule({
  declarations: [
    MoncomptePage,
  ],
  imports: [
    IonicPageModule.forChild(MoncomptePage),
  ],
})
export class MoncomptePageModule {}
