import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConquistasPage } from './conquistas';

@NgModule({
  declarations: [
    ConquistasPage,
  ],
  imports: [
    IonicPageModule.forChild(ConquistasPage),
  ],
})
export class ConquistasPageModule {}
