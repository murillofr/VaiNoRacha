// import { Component } from '@angular/core';
// import { NavController } from 'ionic-angular';

// @Component({
//   selector: 'page-home',
//   templateUrl: 'home.html'
// })
// export class HomePage {

//   constructor(public navCtrl: NavController) {

//   }

// }
// import {
//   GoogleMaps,
//   GoogleMap,
//   GoogleMapsEvent,
//   GoogleMapOptions,
//   CameraPosition,
//   MarkerOptions,
//   Marker
// } from '@ionic-native/google-maps';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HerokuProvider } from './../../providers/heroku/heroku';
import { QuadraInfosPage } from './../quadra-infos/quadra-infos';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { DomSanitizer } from '@angular/platform-browser';
// import { HomeService } from './../../service/rest/home-service';

declare var google;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html',
  providers: [HerokuProvider]
})
export class HomePage {

  private quadrasParam = this.navParams.data.quadras;
  private quadras: Array<any>;
  private latitudeUser;
  private longitudeUser;

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  infoWindow = null;

  safeSvg: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public geolocation: Geolocation,
    // public homeService: HomeService,
    private herokuProvider: HerokuProvider,
    public menuCtrl: MenuController,
    private sanitizer: DomSanitizer) {
    this.menuCtrl.enable(true);
  }

  ionViewDidLoad() {

    console.log("Quadras", this.quadrasParam);
    if (this.quadrasParam !== undefined) {
      document.getElementById("h3MenuNomeUsuario").innerHTML = window.localStorage.getItem('nome');
      this.quadras = this.quadrasParam;
      this.loadMap();
    } else {
      this.encontrarQuadras();
    }

  }

  loadMap() {

    this.geolocation.getCurrentPosition().then((position) => {

      this.latitudeUser = position.coords.latitude;
      this.longitudeUser = position.coords.longitude;

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 18,
        panControl: false,
        mapTypeControl: true,
        // mapTypeId: google.maps.MapTypeId.ROADMAP
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker();

      // Estilizando o mapa;
      // Criando um array com os estilos
      var styles = [
        {
          stylers: [
            { hue: "#409737" },
            { saturation: 20 },
            { lightness: 0 },
            { gamma: 0.35 }
          ]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [
            { lightness: 100 },
            { visibility: "simplified" }
          ]
        },
        {
          featureType: "road",
          elementType: "labels"
        }
      ];

      // Cria um objeto passando o array de estilos (styles) e definindo um nome para ele;
      var styledMap = new google.maps.StyledMapType(styles, {
        name: "Mapa Estilizado"
      });

      // Aplicando as configurações do mapa
      this.map.mapTypes.set('map_style', styledMap);
      this.map.setMapTypeId('map_style');

      // Chamada para a função que vai percorrer a informação
      // contida no array quadras e criar os marcadores a mostrar no mapa
      this.displayMarkers();

    }, (err) => {
      console.log(err);
    });

  }

  addMarker() {

    var image = './../../assets/icon/MarkerLocalUserSmall.png';
    var marker = new google.maps.Marker({
      map: this.map,
      position: this.map.getCenter(),
      animation: google.maps.Animation.DROP,
      title: 'Você está aqui',
      icon: image
    });

    // Evento que dá instrução à API para estar alerta ao click no marcador.
    // Verifica se algum Info Window já está aberto e o fecha caso esteja.
    // Cria a Info Window, define o conteúdo e abre a Info Window.
    google.maps.event.addListener(marker, 'click', () => {

      if (this.infoWindow) {
        this.infoWindow.close();
      }

      // Anima o Marker
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function () {
        marker.setAnimation(null)
      }, 700);

      // Cria a nova Info Window com referência à variável infoWindow.
      this.infoWindow = new google.maps.InfoWindow();

      // Variável que define a estrutura do HTML a inserir na Info Window.
      var iwContent = '<div id="iw_container">' +
        '<p class="iw_title">Você está aqui</div>';

      // O conteúdo da variável iwContent é inserido na Info Window.
      this.infoWindow.setContent(iwContent);

      // A Info Window é aberta com um click no marcador.
      this.infoWindow.open(this.map, marker);

    });

    // Evento que fecha a infoWindow com um click no mapa.
    google.maps.event.addListener(this.map, 'click', () => {
      if (this.infoWindow) {
        this.infoWindow.close();
      }
    });

  }

  encontrarQuadras() {
    let svg = `
      <div class="divContainerLoading">
        <svg class="svgLoading" xmlns="http://www.w3.org/2000/svg" viewBox="140 0 910 1190">
          <style>
            .st1 {
              fill: transparent;
              stroke-width: 40;
              stroke-miterlimit: 10;
            }
          </style>

          <path id="idHexagonLoading" stroke="transparent" class="st1" d="M570.1 82.5L163.7 317.2c-15.6 9-25.2 25.6-25.2 43.6v469.3c0 18 9.6 34.6 25.2 43.6l406.4 234.7c15.6 9 34.7 9 50.3 0l406.4-234.7c15.6-9 25.2-25.6 25.2-43.6V360.8c0-18-9.6-34.6-25.2-43.6L620.4 82.5c-15.5-8.9-34.7-8.9-50.3 0z"
          />

        </svg>
        <span class="spanMsgLoading">Carregando mapa...</span>
      </div>
    `;

    this.safeSvg = this.sanitizer.bypassSecurityTrustHtml(svg);

    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: this.safeSvg,
    });
    loading.present();

    this.herokuProvider.encontrarQuadras().subscribe(
      data => {
        this.quadras = data;
        console.log(data);
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('Todas as quadras foram encontradas');
        loading.dismiss();
        this.loadMap();
      }
    );
  }

  // Esta função vai percorrer a informação contida no array quadras
  // e cria os marcadores através da função createMarker
  displayMarkers() {

    // esta variável vai definir a área de mapa a abranger e o nível do zoom
    // de acordo com as posições dos marcadores
    var bounds = new google.maps.LatLngBounds();

    // Loop que vai percorrer a informação contida no array quadras 
    // para que a função createMarker possa criar os marcadores 
    for (let i in this.quadras) {
      var coordenadasSplit = this.quadras[i].coordenada.split(',');
      var id = this.quadras[i].id;
      var latlng = new google.maps.LatLng(coordenadasSplit[0], coordenadasSplit[1]);
      var nome = this.quadras[i].nome;
      var logadouro = this.quadras[i].logadouro;
      var numero = this.quadras[i].numero;
      var bairro = this.quadras[i].bairro;
      var telefone = this.quadras[i].telefone;
      var diasFuncionamento = this.quadras[i].diasFuncionamento;

      this.createMarker(id, latlng, nome, logadouro, numero, bairro, telefone, diasFuncionamento);

      // Os valores de latitude e longitude do marcador são adicionados à
      // variável bounds
      bounds.extend(latlng);
    }

    var latlngUser = new google.maps.LatLng(this.latitudeUser, this.longitudeUser);
    bounds.extend(latlngUser);

    // Depois de criados todos os marcadores,
    // a API, através da sua função fitBounds, vai redefinir o nível do zoom
    // e consequentemente a área do mapa abrangida de acordo com
    // as posições dos marcadores
    this.map.fitBounds(bounds);

  }

  createMarker(id, latlng, nome, logadouro, numero, bairro, telefone, diasFuncionamento) {
    var id = id;
    var image = './../../assets/icon/MarkerRachaSmall.png';
    var marker = new google.maps.Marker({
      map: this.map,
      position: latlng,
      animation: google.maps.Animation.DROP,
      title: nome,
      icon: image
    });

    // Evento que dá instrução à API para estar alerta ao click no marcador.
    // Verifica se algum Info Window já está aberto e o fecha caso esteja.
    // Cria a Info Window, define o conteúdo e abre a Info Window.
    google.maps.event.addListener(marker, 'click', () => {

      if (this.infoWindow) {
        this.infoWindow.close();
      }

      // Anima o Marker
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function () {
        marker.setAnimation(null)
      }, 700);

      // Cria a nova Info Window com referência à variável infoWindow.
      this.infoWindow = new google.maps.InfoWindow();

      var diasFuncionamentoEditado = diasFuncionamento.split(', ').join('<br />');

      // Variável que define a estrutura do HTML a inserir na Info Window.
      var iwContent = '<div id="iw_container">' +
        '<p class="iw_title">' +
        nome + '</p>' +
        '<p class="iw_content">' +
        logadouro + ', ' + numero + '<br />' +
        bairro + '<br />' +
        telefone + '<br />' +
        'Dias de Funcionamento:' + '<br />' +
        diasFuncionamentoEditado + '</p><hr>' +
        '<button id="idBotao" class="btMarcarRacha">MARCAR RACHA</button>' +
        '</div>';

      // O conteúdo da variável iwContent é inserido na Info Window.
      this.infoWindow.setContent(iwContent);

      // A Info Window é aberta com um click no marcador.
      this.infoWindow.open(this.map, marker);

      // Adicionando ouvinte para que o botão de Marcar Racha funcione
      google.maps.event.addListenerOnce(this.infoWindow, 'domready', () => {
        document.getElementById('idBotao').addEventListener('click', () => {
          this.marcarRacha(id);
        });
      });

    });

    // Evento que fecha a infoWindow com um click no mapa.
    google.maps.event.addListener(this.map, 'click', () => {
      if (this.infoWindow) {
        this.infoWindow.close();
      }
    });

  }

  marcarRacha(id) {
    this.navCtrl.push(QuadraInfosPage, {
      id: id
    });
  }

}
