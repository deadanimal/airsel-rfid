import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AlertController, MenuController } from "@ionic/angular";
import { Platform } from '@ionic/angular';

import { NotificationsService } from 'src/app/shared/services/notifications/notifications.service';
import { UsersService } from "src/app/shared/services/users/users.service";
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';

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
    public notificationService: NotificationsService,
    private userService: UsersService,
    private employeeService: EmployeeService,
    private platform: Platform
  ) {
    console.log("this.userService.umodel = ", this.userService.umodel)
    this.userFormGroup = this.formBuilder.group({
      id: new FormControl(this.userService.umodel.id),
      email: new FormControl(this.userService.umodel.email),
      employee_id: new FormControl(""),
      // full_name: new FormControl(this.userService.umodel.first_name + ' ' + this.userService.umodel.last_name),
      full_name: new FormControl(this.userService.umodel.first_name),
      phone_no: new FormControl(this.userService.umodel.phone_no),
      // department: new FormControl(this.userService.umodel.department),
      // job_title: new FormControl(this.userService.umodel.job_title),
      service_area: new FormControl(this.userService.umodel.service_area),
      // crewshift_id: new FormControl(this.userService.umodel.crewshift_id)
    });
    this.getEmployeeData(this.userService.umodel.employee_id)
    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('removed back');
    });
  }

  ngOnInit() {
  }

  getEmployeeData(emp_id) {
    console.log("emp_id = ", emp_id)
    this.employeeService.getOne(emp_id).subscribe(
      (res) => {
        console.log("res employeeService = ", res)

        this.userFormGroup.patchValue({
          employee_id: res.employee_id,
          phone_no: res.phone_no,
          // node_id: res[0].node_id,
          // description: "NA",
          // long_description: res[0].detailed_description
        })
      },
      (err) => {
        console.log("err employeeService = ", err)
      }
    )
  }

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
