import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MenuController } from "@ionic/angular";

@Component({
  selector: "app-form-first",
  templateUrl: "./form-first.page.html",
  styleUrls: ["./form-first.page.scss"],
})
export class FormFirstPage implements OnInit {
  maklumatAmForm: FormGroup;
  public wilayahs = [
    { val: "KL", isChecked: false },
    { val: "PTG", isChecked: false },
    { val: "GBK", isChecked: false },
    { val: "KLG", isChecked: false },
    { val: "HL", isChecked: false },
    { val: "SPG", isChecked: false },
    { val: "H.S", isChecked: false },
    { val: "K.LGT", isChecked: false },
    { val: "K.SEL", isChecked: false },
    { val: "S.BER", isChecked: false },
  ];

  constructor(public menu: MenuController, private fb: FormBuilder) {}

  ngOnInit() {
    this.maklumatAmForm = this.fb.group({
      wilayah: ["false", Validators.required],
      tarikh: ["", Validators.required],
      masa: ["", Validators.required],
      lokasi: ["", Validators.required],
    });

    this.menu.enable(false, "menuNotification");
  }
}
