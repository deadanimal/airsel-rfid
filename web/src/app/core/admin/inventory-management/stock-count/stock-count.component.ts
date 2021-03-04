import {
  Component,
  OnInit,
  AfterViewInit,
  TemplateRef,
  OnDestroy,
  NgZone,
} from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: 'app-stock-count',
  templateUrl: './stock-count.component.html',
  styleUrls: ['./stock-count.component.scss']
})
export class StockCountComponent implements OnInit{

  //Data entries
  entries: number = 2;

  // Modal
  ModalStockCount: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered modal-lg",
    ignoreBackdropClick: true,
  };

  //Testing data
  tableShowStockCount = [
    {
      "id": 1,
      "organisation": "Langat 2 - Store",
      "item": "LEDQ0000999",
      "description":"Quatro Cable",
      "long_description":"Spare Part for YSi 5000",
      "quantity":"89",
      "latest_updated_date":"08/02/2019"
    },
    {
      "id": 2,
      "organisation": "Langat 2 - Store",
      "item": "LEDQ0000999",
      "description":"Quatro Cable",
      "long_description":"Spare Part for YSi 5000",
      "quantity":"67",
      "latest_updated_date":"10/01/2019"
    },
    {
      "id": 3,
      "organisation": "Langat 2 - Store",
      "item": "LEDQ0000999",
      "description":"Quatro Cable",
      "long_description":"Spare Part for YSi 5000",
      "quantity":"56",
      "latest_updated_date":"14/11/2019"
    },
    {
      "id": 4,
      "organisation": "Langat 2 - Store",
      "item": "LEDQ0000999",
      "description":"Quatro Cable",
      "long_description":"Spare Part for YSi 5000",
      "quantity":"45",
      "latest_updated_date":"23/04/2020"
    },
    {
      "id": 5,
      "organisation": "Langat 2 - Store",
      "item": "LEDQ0000999",
      "description":"Quatro Cable",
      "long_description":"Spare Part for YSi 5000",
      "quantity":"56",
      "latest_updated_date":"06/12/2020"
    },
  ]

  constructor(
    public modalService: BsModalService,) { }

  ngOnInit() {}

  entriesChange($event) {
    console.log($event)
    this.entries = $event.target.value;
    console.log(this.entries)
  }

  openStockCount(modalNotification: TemplateRef<any>, row) {
      this.ModalStockCount = this.modalService.show(
          modalNotification,
          this.modalConfig,

        );
      }

}
