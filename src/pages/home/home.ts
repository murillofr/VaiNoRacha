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
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HomeService } from './../../service/rest/home-service';

declare var google;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  private quadras: Array<any>;

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(
    public navCtrl: NavController,
    public geolocation: Geolocation,
    public homeService: HomeService) {
    this.encontrarQuadras();
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker();

      // Chamada para a função que vai percorrer a informação
      // contida no array quadras e criar os marcadores a mostrar no mapa
      this.displayMarkers();

    }, (err) => {
      console.log(err);
    });

  }

  addMarker() {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);

  }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  encontrarQuadras() {
    this.homeService.encontrarQuadras().subscribe(
      data => {
        this.quadras = data;
        console.log(data);
      },
      err => {
        console.log(err);
      },
      () => console.log('Todas as quadras foram encontradas')
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
      var latlng = new google.maps.LatLng(coordenadasSplit[0], coordenadasSplit[1]);
      var nome = this.quadras[i].nome;
      var endereco = this.quadras[i].endereco;
      var telefone = this.quadras[i].telefone;
      var diasFuncionamento = this.quadras[i].diasFuncionamento;

      this.createMarker(latlng, nome, endereco, telefone, diasFuncionamento);

      // Os valores de latitude e longitude do marcador são adicionados à
      // variável bounds
      bounds.extend(latlng);
    }

    // Depois de criados todos os marcadores,
    // a API, através da sua função fitBounds, vai redefinir o nível do zoom
    // e consequentemente a área do mapa abrangida de acordo com
    // as posições dos marcadores
    this.map.fitBounds(bounds);
  }

  createMarker(latlng, nome, endereco, telefone, diasFuncionamento) {
    var marker = new google.maps.Marker({
      map: this.map,
      position: latlng,
      title: nome
    });

    // Cria a nova Info Window com referência à variável infoWindow.
    let infoWindow = new google.maps.InfoWindow();

    // Evento que dá instrução à API para estar alerta ao click no marcador.
    // Define o conteúdo e abre a Info Window.
    google.maps.event.addListener(marker, 'click', () => {

      // Variável que define a estrutura do HTML a inserir na Info Window.
      var iwContent = '<div id="iw_container">' +
        '<div class="iw_title">' + nome + '</div>' +
        '<div class="iw_content">' + endereco + '<br />' +
        telefone + '<br />' +
        diasFuncionamento + '</div></div>';

      // O conteúdo da variável iwContent é inserido na Info Window.
      infoWindow.setContent(iwContent);

      // A Info Window é aberta com um click no marcador.
      infoWindow.open(this.map, marker);
    });

    // Evento que fecha a infoWindow com um click no mapa.
    google.maps.event.addListener(this.map, 'click', () => {
      infoWindow.close();
    });

  }


}
