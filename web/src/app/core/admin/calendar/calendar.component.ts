import {
  Component,
  OnInit,
  TemplateRef,
  ElementRef,
  ViewChild,
} from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import swal from "sweetalert2";

import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";

import { EventData } from "../../../../assets/mock/calendar";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit {
  editModal: BsModalRef;
  @ViewChild("modalEdit", { static: false }) modalEdit: ElementRef;
  default = {
    keyboard: true,
    class: "modal-dialog-centered modal-secondary",
  };
  radios = "bg-danger";
  eventTitle = undefined;
  eventDescription;
  eventId;
  event;
  startDate;
  endDate;
  calendar;
  today = new Date();
  y = this.today.getFullYear();
  m = this.today.getMonth();
  d = this.today.getDate();
  events = EventData;
  filterEvents = [];
  months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  workCategoryArray = [
    {
      name: "Corrective Maintenance (CM)",
      value: "CM",
    },
    {
      name: "Preventive Maintenance (PM)",
      value: "PM",
    },
    {
      name: "Predictive Maintenance (PDM)",
      value: "PDM",
    },
    {
      name: "Compliance",
      value: "C",
    },
    {
      name: "Redesign",
      value: "R",
    },
    {
      name: "Installation Testing Commissioning",
      value: "ITC",
    },
    {
      name: "Disposal",
      value: "D",
    },
  ];

  departmentArray = [
    {
      name: "Customer Billing Services",
      value: "D1",
    },
    {
      name: "Distribution",
      value: "D2",
    },
    {
      name: "Engineering Services – Distribution",
      value: "D3",
    },
    {
      name: "Fleet",
      value: "D4",
    },
    {
      name: "Land",
      value: "D5",
    },
    {
      name: "NRW",
      value: "D6",
    },
    {
      name: "Production Northern",
      value: "D7",
    },
    {
      name: "Production Southern",
      value: "D8",
    },
    {
      name: "SCADA",
      value: "D9",
    },
    {
      name: "Water Quality",
      value: "D10",
    },
  ];

  regionArray = [
    {
      name: "Kuala Selangor",
      value: "R1",
    },
    {
      name: "Kuala Lumpur",
      value: "R2",
    },
    {
      name: "Hulu Langat",
      value: "R3",
    },
    {
      name: "Sabak Bernam",
      value: "R4",
    },
    {
      name: "Petaling",
      value: "R5",
    },
    {
      name: "Kuala Langat",
      value: "R6",
    },
    {
      name: "Hulu Selangor",
      value: "R7",
    },
    {
      name: "Sepang",
      value: "R8",
    },
    {
      name: "Gombak",
      value: "R9",
    },
    {
      name: "Klang",
      value: "R10",
    },
    {
      name: "North",
      value: "R11",
    },
    {
      name: "South",
      value: "R12",
    },
    {
      name: "Headquarters",
      value: "R13",
    },
  ];

  statusArray = [
    {
      name: "New",
      value: "S1",
    },
    {
      name: "Active",
      value: "S2",
    },
    {
      name: "Backlog",
      value: "S3",
    },
    {
      name: "Completed",
      value: "S4",
    },
  ];

  searchInput = {
    workCategory: "",
    department: "",
    region: "",
    status: "",
    startDate: new Date(),
    endDate: new Date(),
  };

  constructor(private modalService: BsModalService) {}

  changeView(newView) {
    this.calendar.changeView(newView);

    currentDate: this.calendar.view.title;
  }

  ngOnInit() {
    this.initCalendar(this.events);
  }

  initCalendar(events) {
    this.calendar = new Calendar(document.getElementById("calendar"), {
      plugins: [interaction, dayGridPlugin],
      defaultView: "dayGridMonth",
      selectable: true,
      editable: true,
      events,
      views: {
        month: {
          titleFormat: { month: "long", year: "numeric" },
        },
        agendaWeek: {
          titleFormat: { month: "long", year: "numeric", day: "numeric" },
        },
        agendaDay: {
          titleFormat: { month: "short", year: "numeric", day: "numeric" },
        },
      },
      // Edit calendar event action
      eventClick: ({ event }) => {
        this.eventId = event.id;
        this.eventTitle = event.title;
        this.eventDescription = event.extendedProps.description;
        this.radios = "bg-danger";
        this.event = event;
        this.editModal = this.modalService.show(this.modalEdit, this.default);
      },
    });
    this.calendar.render();
  }

  getNewEventTitle(e) {
    this.eventTitle = e.target.value;
  }

  getNewEventDescription(e) {
    this.eventDescription = e.target.value;
  }

  deleteEventSweetAlert() {
    this.editModal.hide();
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-danger",
        cancelButtonClass: "btn btn-secondary",
        confirmButtonText: "Yes, delete it!",
        buttonsStyling: false,
      })
      .then((result) => {
        if (result.value) {
          this.events = this.events.filter(
            (prop) => prop.id + "" !== this.eventId
          );
          this.initCalendar(this.events);
          swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            type: "success",
            confirmButtonClass: "btn btn-primary",
            buttonsStyling: false,
          });
        }
      });
    this.radios = "bg-danger";
    (this.eventTitle = undefined),
      (this.eventDescription = undefined),
      (this.eventId = undefined),
      (this.event = undefined);
  }

  updateEvent() {
    this.events = this.events.map((prop, key) => {
      if (prop.id + "" === this.eventId + "") {
        return {
          ...prop,
          title: this.eventTitle,
          className: this.radios,
          description: this.eventDescription,
        };
      } else {
        return prop;
      }
    });
    this.radios = "bg-danger";
    (this.eventTitle = undefined),
      (this.eventDescription = undefined),
      (this.eventId = undefined),
      (this.event = undefined);
    this.initCalendar(this.events);
    this.editModal.hide();
  }

  searchCalendar() {
    console.log(this.searchInput);
    this.filterEvents = this.events.filter((prop) => {
      console.log(prop);
      // Find a date range
      if (this.searchInput.startDate && this.searchInput.endDate) {
        if (
          prop.start.getDate() >= this.searchInput.startDate.getDate() &&
          prop.start.getDate() <= this.searchInput.endDate.getDate()
        )
          return prop;
      }
    });

    this.calendar.destroy();
    this.initCalendar(this.filterEvents);
  }

  resetCalendar() {
    this.filterEvents = [];
    this.calendar.destroy();
    this.initCalendar(this.events);
  }
}
