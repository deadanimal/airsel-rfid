import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  locations = [
    {
      value: 1,
      text: "SHAH ALAM - CENTRAL STORE",
    },
    {
      value: 2,
      text: "KLANG - STORE",
    },
    {
      value: 3,
      text: "PETALING - STORE",
    },
    {
      value: 4,
      text: "KUALA LANGAT - STORE",
    },
    {
      value: 5,
      text: "SUNGAI BATU - STORE",
    },
    {
      value: 6,
      text: "KUALA LUMPUR - STORE",
    },
    {
      value: 7,
      text: "SSP2 - STORE",
    },
    {
      value: 8,
      text: "KUALA SELANGOR - STORE",
    },
    {
      value: 9,
      text: "SABAK BERNAM - STORE",
    },
    {
      value: 10,
      text: "HULU SELANGOR - STORE",
    },
    {
      value: 11,
      text: "RANTAU PANJANG - STORE",
    },
    {
      value: 12,
      text: "SEMENYIH - STORE",
    },
    {
      value: 13,
      text: "SEMENYIH 2 - STORE",
    },
    {
      value: 14,
      text: "HULU LANGAT - STORE",
    },
    {
      value: 15,
      text: "SEPANG - STORE",
    },
    {
      value: 16,
      text: "SHAH ALAM - STORE",
    },
    {
      value: 17,
      text: "SUNGAI LANGAT - STORE",
    },
  ];
  profile = {
    location: 1,
  };

  constructor() {}

  ngOnInit() {}
}
