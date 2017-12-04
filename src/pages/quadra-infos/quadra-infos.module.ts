import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuadraInfosPage } from './quadra-infos';

@NgModule({
  declarations: [
    QuadraInfosPage,
  ],
  imports: [
    IonicPageModule.forChild(QuadraInfosPage),
  ],
})
export class QuadraInfosPageModule {}
