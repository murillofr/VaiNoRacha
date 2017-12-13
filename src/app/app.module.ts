import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { SplashPage } from './../pages/splash/splash';
import { LoginPage } from './../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RachasMarcadosPage } from './../pages/rachas-marcados/rachas-marcados';
import { MarcarRachaPage } from './../pages/marcar-racha/marcar-racha';
import { ConquistasPage } from './../pages/conquistas/conquistas';
import { ConfiguracoesPage } from './../pages/configuracoes/configuracoes';
import { AjudaPage } from './../pages/ajuda/ajuda';
import { SobreNosPage } from './../pages/sobre-nos/sobre-nos';
import { QuadraInfosPage } from './../pages/quadra-infos/quadra-infos';
import { RachasPage } from './../pages/rachas/rachas';

import { HomeService } from './../service/rest/home-service';
import { RachasMarcadosService } from './../service/rest/rachas-marcados-service';
import { MarcarRachaService } from './../service/rest/marcar-racha-service';

import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HerokuProvider } from '../providers/heroku/heroku';

@NgModule({
  declarations: [
    MyApp,
    SplashPage,
    LoginPage,
    HomePage,
    ListPage,
    RachasMarcadosPage,
    MarcarRachaPage,
    ConquistasPage,
    ConfiguracoesPage,
    AjudaPage,
    SobreNosPage,
    QuadraInfosPage,
    RachasPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
      monthShortNames: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ],
      dayNames: ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sabado'],
      dayShortNames: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab' ],
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SplashPage,
    LoginPage,
    HomePage,
    ListPage,
    RachasMarcadosPage,
    MarcarRachaPage,
    ConquistasPage,
    ConfiguracoesPage,
    AjudaPage,
    SobreNosPage,
    QuadraInfosPage,
    RachasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Geolocation,
    HomeService,
    MarcarRachaService,
    RachasMarcadosService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HerokuProvider
  ]
})
export class AppModule {}
