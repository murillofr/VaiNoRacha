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

    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
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
    window.localStorage.removeItem('usuario');
    window.localStorage.removeItem('senha');
    console.log("Deletado do localStorage os dados de login");
    console.log("Usuario: " + window.localStorage.getItem('usuario'));
    console.log("Senha: " + window.localStorage.getItem('senha'));
  }

}