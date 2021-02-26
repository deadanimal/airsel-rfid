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
  selector: 'app-interwarehouse-transfer',
  templateUrl: './interwarehouse-transfer.component.html',
  styleUrls: ['./interwarehouse-transfer.component.scss']
})
export class InterwarehouseTransferComponent implements OnInit{

  // Modal
  ModalSubInventory: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered modal-lg",
    ignoreBackdropClick: true,
  };

  //Data Entries
  entries: number = 5;

  //Testing data
  tableShowStockCount = [
    {
      "id": 1,
      "transaction_date": "Test1",
      "organization_code": "Test1",
      "source_code":"Test1",
      "item_number":"Test1",
      "subinventory_code":"Test1",
    },
    {
      "id": 2,
      "transaction_date": "Test2",
      "organization_code": "Test2",
      "source_code":"Test2",
      "item_number":"Test2",
      "subinventory_code":"Test2",
    },
    {
      "id": 3,
      "transaction_date": "Test3",
      "organization_code": "Test3",
      "source_code":"Test3",
      "item_number":"Test3",
      "subinventory_code":"Test3",
    },
    {
      "id": 4,
      "transaction_date": "Test4",
      "organization_code": "Test4",
      "source_code":"Test4",
      "item_number":"Test4",
      "subinventory_code":"Test4",
    },
    {
      "id": 5,
      "transaction_date": "Test5",
      "organization_code": "Test5",
      "source_code":"Test5",
      "item_number":"Test5",
      "subinventory_code":"Test5",
    },
  ]

  constructor(
    public modalService: BsModalService,
  ) { }

  ngOnInit() {}

  entriesChange($event) {
    console.log($event)
    this.entries = $event.target.value;
    console.log(this.entries)
  }

  openSubInventory(modalNotification: TemplateRef<any>, row) {
      this.ModalSubInventory = this.modalService.show(
          modalNotification,
          this.modalConfig,

        );
      }

}
