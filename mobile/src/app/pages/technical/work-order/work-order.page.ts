import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";

@Component({
  selector: "app-work-order",
  templateUrl: "./work-order.page.html",
  styleUrls: ["./work-order.page.scss"],
})
export class WorkOrderPage implements OnInit {
  constructor(public menu: MenuController) {}

  ngOnInit() {
    this.menu.enable(false, "menuNotification");
  }
}
