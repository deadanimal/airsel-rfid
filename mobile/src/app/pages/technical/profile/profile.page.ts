import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController, MenuController } from "@ionic/angular";

import { NotificationsService } from 'src/app/shared/services/notifications/notifications.service';
import { UsersService } from "src/app/shared/services/users/users.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  // FormGroup
  userFormGroup: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    public menu: MenuController,
    private router: Router,
    private notificationService: NotificationsService,
    private userService: UsersService
  ) {    
    this.userFormGroup = this.formBuilder.group({
      id: new FormControl(this.userService.umodel.id),
      email: new FormControl(this.userService.umodel.email),
      name: new FormControl(this.userService.umodel.name),
      mobile: new FormControl(this.userService.umodel.mobile),
      department: new FormControl("ES-DIST-PJ"),
      title: new FormControl("EN.")
    });
  }

  ngOnInit() {}

  async update() {
    const alert = await this.alertController.create({
      header: 'Profile',
      message: 'Your profile have successfully updated. Thank you.',
      buttons: ['OK']
    });

    await alert.present();
  }

  homePage(path: string) {
    this.router.navigate([path]);
  }

  openNotification() {
    this.menu.enable(true, "menuNotification");
    this.menu.open("menuNotification");
  }
}
