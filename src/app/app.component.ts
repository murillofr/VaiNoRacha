import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SplashPage } from './../pages/splash/splash';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { RachasMarcadosPage } from './../pages/rachas-marcados/rachas-marcados';
import { MarcarRachaPage } from './../pages/marcar-racha/marcar-racha';
import { ConquistasPage } from './../pages/conquistas/conquistas';
import { ConfiguracoesPage } from './../pages/configuracoes/configuracoes';
import { AjudaPage } from './../pages/ajuda/ajuda';
import { SobreNosPage } from './../pages/sobre-nos/sobre-nos';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SplashPage;

  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public toastCtrl: ToastController,
    public menuCtrl: MenuController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Mapa', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Rachas Marcados', component: RachasMarcadosPage },
      { title: 'Marcar Racha', component: MarcarRachaPage },
      { title: 'Conquistas', component: ConquistasPage },
      { title: 'Configurações', component: ConfiguracoesPage },
      { title: 'Ajuda', component: AjudaPage },
      { title: 'Sobre Nós', component: SobreNosPage },
      { title: 'Login', component: LoginPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.menuCtrl.enable(false);
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if (page.title == 'Login') {
      this.deletarLocalStorage();
    }
    this.nav.setRoot(page.component);
  }

  tapEvent() {
    let toast = this.toastCtrl.create({
      message: 'Em construção',
      duration: 500,
      position: 'bottom'
    });
    toast.present();
  }

  deletarLocalStorage() {
    window.localStorage.clear();
    console.log("Deletado do localStorage os dados de login");
    console.log("id: " + window.localStorage.getItem('id'));
    console.log("name: " + window.localStorage.getItem('name'));
    console.log("email: " + window.localStorage.getItem('email'));
    console.log("userName: " + window.localStorage.getItem('userName'));
    console.log("birthDate: " + window.localStorage.getItem('birthDate'));
    console.log("photo: " + window.localStorage.getItem('photo'));
    console.log("cpfOrCnpj: " + window.localStorage.getItem('cpfOrCnpj'));
    console.log("loggedByFace: " + window.localStorage.getItem('loggedByFace'));
    console.log("profiles: " + window.localStorage.getItem('profiles'));
    console.log("rentalHistory: " + window.localStorage.getItem('rentalHistory'));
    console.log("password: " + window.localStorage.getItem('password'));
  }

  alterarImagemAvatar() {
    this.tapEvent();
  }

}