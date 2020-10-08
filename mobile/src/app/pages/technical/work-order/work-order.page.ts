import { Component, OnInit } from "@angular/core";
import { AlertController, MenuController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";

import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: "app-work-order",
  templateUrl: "./work-order.page.html",
  styleUrls: ["./work-order.page.scss"],
})
export class WorkOrderPage implements OnInit {
  // Datas
  work_order = {
    work_order: "",
    activity_type: "",
    asset: "",
    completed_at: "",
    created_at: "",
    due_date: "",
    id: "",
    maintenance_form: "",
    modified_at: "",
    name: "",
    status: "",
    wams_work_id: "",
  };

  constructor(
    public alertController: AlertController,
    public menu: MenuController,
    private route: ActivatedRoute,
    private router: Router,
    public userService: UsersService
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.work_order = this.router.getCurrentNavigation().extras.state.work_order;
      }
    });
  }

  ngOnInit() {
    this.menu.enable(false, "menuNotification");
  }

  async submit() {
    const alert = await this.alertController.create({
      header: 'Work Order',
      message: 'Your work order have successfully submitted into the system. Thank you.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/technical/maintenance-work-detail']);
          }
        }
      ]
    });

    await alert.present();
  }
}
