import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

export interface PeriodicElement {
  item: string;
  position: number;
  description: string;
  quantity: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, item: 'LEQ200001', description: "QUATRO CABLE (PRO PLUS)", quantity: 45},
  {position: 2, item: 'LEQ200002', description: "FIBRE OPTIC CABLE", quantity: 34},
  {position: 3, item: 'LEQ200003', description: "COPPER CABLE", quantity: 26},
  {position: 4, item: 'LEQ200004', description: "SWITCH", quantity: 54},
  {position: 5, item: 'LEQ200005', description: "HUB", quantity: 21},
  {position: 6, item: 'LEQ200006', description: "ROUTER", quantity: 22},
];

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.page.html',
  styleUrls: ['./list-item.page.scss'],
})
export class ListItemPage implements OnInit {
  displayedColumns: string[] = ['item', 'description', 'quantity'];
  dataSource = ELEMENT_DATA;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  closeList() {
    this.modalController.dismiss();
  }

}
