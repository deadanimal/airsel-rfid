import { Component, OnInit, TemplateRef } from "@angular/core"; import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
} from "@angular/forms";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import swal from "sweetalert2";

import { AuthService } from "src/app/shared/services/auth/auth.service";
import { UsersService } from "src/app/shared/services/users/users.service";

@Component({
  selector: "app-utility-user",
  templateUrl: "./utility-user.component.html",
  styleUrls: ["./utility-user.component.scss"],
})
export class UtilityUserComponent implements OnInit {
  // Data
  users;
  focusSearch;

  // Modal
  modal: BsModalRef;
  modalConfig = {
    keyboard: true,
    class: "modal-dialog-centered modal-lg",
    ignoreBackdropClick: true,
  };

  // Table
  entries: number = 5;
  selected: any[] = [];
  temp = [];
  activeRow: any;
  rows: any = [];

  SelectionType;

  userTypes = [
    {
      name: "Operator",
      value: "OP",
    },
    {
      name: "Admin",
      value: "AM",
    },
    {
      name: "Planner",
      value: "PL",
    },
    {
      name: "Contractor",
      value: "CR",
    },
    {
      name: "Technical Crew",
      value: "TC",
    },
  ];

  // Forms
  userFormGroup: FormGroup;
  validation_forms = [];

  constructor(
    public formBuilder: FormBuilder,
    public modalService: BsModalService,
    private authService: AuthService,
    private userService: UsersService
  ) {
    this.getUsers();

    this.userFormGroup = this.formBuilder.group({
      id: "",
      username: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      office_number: new FormControl("", [Validators.required]),
      mobile_number: new FormControl("", [Validators.required]),
      user_type: new FormControl("", [Validators.required]),
      // default for is_active is false
      is_active: new FormControl("", [Validators.required]),
      status: new FormControl("", [Validators.required]),
      password1: "bg6yaaz3pv",
      password2: "bg6yaaz3pv",
    });
  }

  ngOnInit() { }

  getUsers() {
    this.userService.get().subscribe((data) => {
      if (data) {
        this.rows = data;
        this.temp = data.map((prop, key) => {
          return {
            ...prop,
            // id: key,
          };
        });
      }
    });
  }


  openModal(modalInventory: TemplateRef<any>, row) {
    if (row) {
      this.userFormGroup.patchValue({
        id: row.id,
        username: row.username,
        name: row.name,
        email: row.email,
        office_number: row.office_number,
        mobile_number: row.mobile_number,
        user_type: row.user_type,
        is_active: row.is_active,
      });
    }
    this.modal = this.modalService.show(modalInventory, this.modalConfig);
  }

  openModalNew(modalInventory: TemplateRef<any>) {
    this.modal = this.modalService.show(modalInventory, this.modalConfig);
  }

  closeModal() {
    this.modal.hide();
  }

  register() {
    // To reset the formGroup if exist value
    // this.userFormGroup.reset();
    this.userFormGroup.patchValue({
        status: false,
        is_active: false,
      });

    this.authService.register(this.userFormGroup.value).subscribe(
      (res) => {
        if (res) {
          console.log("auth", res);
          this.userFormGroup.value.id = res.user.pk;
          let user_pk = res.user.email;

          this.userService
            .update(this.userFormGroup.value.id, this.userFormGroup.value)
            .subscribe(
              (res) => {
                // console.log("user", res);

                this.modal.hide();
                swal.fire({
                  title: "Added!",
                  text: "New user has been added",
                  type: "success",
                  buttonsStyling: false,
                  confirmButtonText: "Ok",
                  confirmButtonClass: "btn btn-success btn-sm",
                }).then(result => {
                  if (result.value) {
                    this.getUsers();
                  }
                });
              },
              (err) => {
                console.error(err);
              },
              () => {
                () => console.log("HTTP request completed.");
                this.sendActivationEmail(user_pk);
              }
            );
        }
      },
      (err) => {
        this.validation_forms = err.error;
      },
      () => {
        () => console.log("HTTP request completed.");
      }
    );
  }

  sendActivationEmail(user_pk) {
    let body = {
      "user_pk": user_pk
    }

    this.userService.activation(body).subscribe(
      (res) => {
        console.log("activation email", res);
      },
      (err) => {

      },
      () => {

      }
    );
  }

  update() {
    console.log("bastard", this.userFormGroup.value);
    let temp1;
    let temp2;

    console.log("status", this.userFormGroup.value.status);

    if (this.userFormGroup.value.status == "false") {
      this.userFormGroup.patchValue({
          status: false,
          is_active: false,
      });

    } else {
      this.userFormGroup.patchValue({
          status: true,
          is_active: true,
      });
    }

    
    console.log("bastard2", this.userFormGroup.value);
    
    this.userService
      .update(this.userFormGroup.value.id, this.userFormGroup.value)
      .subscribe(
        (res) => {
          if (res) {
            console.log("user", res);

            this.modal.hide();
            swal.fire({
              title: "Saved!",
              text: "Your edited information has been saved",
              type: "success",
              buttonsStyling: false,
              confirmButtonText: "Ok",
              confirmButtonClass: "btn btn-success btn-sm",
            }).then(result => {
              if (result.value) {
                this.getUsers();
              }
            });
          }
        },
        (err) => {
          this.validation_forms = err.error;
          console.log(err);
        },
        () => {
          () => console.log("HTTP request completed.");
        }
      );
  }

  entriesChange($event) {
    this.entries = $event.target.value;
  }

  filterTable($event) {
    let val = $event.target.value;
    this.temp = this.rows.filter(function (d) {
      for (var key in d) {
        if (d[key]) {
          if (d[key].toString().toLowerCase().indexOf(val) !== -1) {
            return true;
          }
        }
      }
      return false;
    });
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    this.activeRow = event.row;
  }

  findUserType(value: string) {
    var result = this.userTypes.find((obj) => {
      return obj.value === value;
    });
    return result.name;
  }

  openSearch() {
    document.body.classList.add("g-navbar-search-showing");
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-showing");
      document.body.classList.add("g-navbar-search-show");
    }, 150);
    setTimeout(function () {
      document.body.classList.add("g-navbar-search-shown");
    }, 300);
  }

  closeSearch() {
    document.body.classList.remove("g-navbar-search-shown");
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-show");
      document.body.classList.add("g-navbar-search-hiding");
    }, 150);
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-hiding");
      document.body.classList.add("g-navbar-search-hidden");
    }, 300);
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-hidden");
    }, 500);
  }
}
