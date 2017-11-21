import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RachasMarcadosPage } from './../pages/rachas-marcados/rachas-marcados';
import { MarcarRachaPage } from './../pages/marcar-racha/marcar-racha';
import { ConquistasPage } from './../pages/conquistas/conquistas';
import { ConfiguracoesPage } from './../pages/configuracoes/configuracoes';
import { AjudaPage } from './../pages/ajuda/ajuda';
import { SobreNosPage } from './../pages/sobre-nos/sobre-nos';

import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    RachasMarcadosPage,
    MarcarRachaPage,
    ConquistasPage,
    ConfiguracoesPage,
    AjudaPage,
    SobreNosPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    RachasMarcadosPage,
    MarcarRachaPage,
    ConquistasPage,
    ConfiguracoesPage,
    AjudaPage,
    SobreNosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}