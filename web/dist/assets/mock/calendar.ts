let today = new Date();
let y = today.getFullYear();
let m = today.getMonth();
let d = today.getDate();

export const EventData = [
  {
    id: 0,
    title: "PM (1)",
    start: new Date(y, m, 14),
    allDay: true,
    className: "bg-orange",
  },
  {
    id: 1,
    title: "CM (3)",
    start: new Date(y, m, 1),
    allDay: true,
    className: "bg-red",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  },
  {
    id: 2,
    title: "PM (5)",
    start: new Date(y, m, d - 1, 10, 30),
    allDay: true,
    className: "bg-orange",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  },
  {
    id: 3,
    title: "PM (7)",
    start: new Date(y, m, d + 7, 12, 0),
    allDay: true,
    className: "bg-green",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  },
  {
    id: 4,
    title: "PM (6)",
    start: new Date(y, m, d - 2),
    allDay: true,
    className: "bg-green",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  },
  {
    id: 5,
    title: "PM (3)",
    start: new Date(y, m, d + 1, 19, 0),
    allDay: true,
    className: "bg-red",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  },
  {
    id: 6,
    title: "CM (1)",
    start: new Date(y, m, 21),
    allDay: true,
    className: "bg-warning",
    description:
      "Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  },
];
