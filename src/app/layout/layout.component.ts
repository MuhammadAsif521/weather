import { Component, OnInit } from '@angular/core';
import { IonContent, IonCol, IonRow, IonIcon, IonLabel, IonSearchbar } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import {locationOutline, searchOutline } from 'ionicons/icons';
addIcons({
location:locationOutline,
search:searchOutline,
})

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [IonSearchbar, IonLabel, IonIcon, IonRow, IonCol, IonContent]
})
export class LayoutComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
