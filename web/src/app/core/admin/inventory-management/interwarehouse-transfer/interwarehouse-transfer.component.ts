import {
  Component,
  OnInit,
  AfterViewInit,
  TemplateRef,
  OnDestroy,
  NgZone,
} from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

import { InventoryTransactionService } from "src/app/shared/services/inventory-transaction/inventory-transaction.service";

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

  //Actual data
  tableTemptInventoryTransaction = [];
  rowDataInventoryTransaction: any;

  constructor(
    public modalService: BsModalService,
    public InventoryTransactionService: InventoryTransactionService,
  ) {
      this.getInventoryTransactionData();
    }

  ngOnInit() {}

  entriesChange($event) {
    console.log($event)
    this.entries = $event.target.value;
    console.log(this.entries)
  }

  getInventoryTransactionData(){
    let tempData = [];
    this.InventoryTransactionService.get().subscribe(
      (res) => {
        res.forEach(function(result){
          tempData.push(result)
        })
        this.tableTemptInventoryTransaction = tempData;
        console.log("test1 = ", this.tableTemptInventoryTransaction);
      },
      error => {
        console.error("err, error");
      }
    )
  }

  openSubInventory(modalNotification: TemplateRef<any>, row) {
      this.rowDataInventoryTransaction = '';
      this.rowDataInventoryTransaction = row;
      this.ModalSubInventory = this.modalService.show(
          modalNotification,
          this.modalConfig,

        );
      }

}
