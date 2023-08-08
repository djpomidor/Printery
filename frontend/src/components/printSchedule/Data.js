import { v4 as uuidv4 } from 'uuid';
export const data = [
  {
    pk: '1',
    nameOfOrder: 'Книга',
    Assigned_To: 'Beltran',
    Assignee: 'Romona',
    Status: 'To-do',
    Priority: 'Low',
    due_date: '25-May-2020',
  },
  {
    pk: '2',
    nameOfOrder: 'Fix Styling',
    // Assigned_To: 'Dave',
    // Assignee: 'Romona',
    // Status: 'To-do',
    // Priority: 'Low',
    due_date: '26-May-2020',
  },
  {
    pk: '3',
    nameOfOrder: 'Handle Door Specs',
    // Assigned_To: 'Roman',
    // Assignee: 'Romona',
    // Status: 'To-do',
    // Priority: 'Low',
    due_date: '27-May-2020',
  },
  {
    pk: '4',
    nameOfOrder: 'morbi',
    // Assigned_To: 'Gawen',
    // Assignee: 'Kai',
    // Status: 'Done',
    // Priority: 'High',
    due_date: '23-Aug-2020',
  },
  {
    pk: '5',
    nameOfOrder: 'proin',
    // Assigned_To: 'Bondon',
    // Assignee: 'Antoinette',
    // Status: 'In Progress',
    // Priority: 'Medium',
    due_date: '05-Jan-2021',
  },
];

// const weekday = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]

const getDayPrint = (date) => {
  let d;
  (date === undefined)?d = new Date():d = new Date(date);
  // return weekday[d.getDay()] + ", " + d.getDate() + "." + (d.getMonth() + 1); 
  return d.toLocaleDateString('Ru', {  
    day: "numeric", 
    month:"numeric", 
    weekday:"short",}); 
}

const daysGenerator = () => {
  let dates = [];
  [...Array(14).keys()].map(index => {
  const date = new Date();
  date.setDate((date.getDate() - 7) + index);
  let d = date.toLocaleDateString('Ru', {  
    day: "numeric", 
    month:"numeric", 
    weekday:"short",
  });
  dates.push(d);
  return dates.push(d);
});
return dates;
};

let d = daysGenerator()
console.log("!@#$%",d)

let c = new Date().toLocaleDateString('Ru', {  day: "numeric", month:"numeric", weekday:"short",});

// d.map((day)=> {
//   return console.log("!@!@!@!", day.toLocaleDateString('Ru', {  day: "numeric", month:"numeric", weekday:"short",}));
// });

// https://stackoverflow.com/questions/42974735/create-object-from-array

export const daysOfPrint = ()=> {
  const obj = {};
  const days = daysGenerator();
  const curentDate = new Date();
  for (const [index, key] of days.entries()) {
      obj[uuidv4()] = {
        date: key,
        timeofday: (index % 2 === 0)? "day":"night",
        items: (key === "пт, 21.07" && index % 2 === 0)?data:[],
      };
  };
  return obj;
};
console.log("!!! daysOfPrint_", daysOfPrint())

export const daysOfPrint_ = {
  [uuidv4()]: {
    date: getDayPrint("01/01/2023"),
    items: data,
  },
  [uuidv4()]: {
    date: 'We, 23.09',
    items: [],
  },
  [uuidv4()]: {
    date: getDayPrint(),
    items: [],
  },
  [uuidv4()]: {
    date: 'Fr, 25.09',
    items: [],
  },
  [uuidv4()]: {
    date: c,
    items: [],
  },
  [uuidv4()]: {
    date: 'Fr, 25.09',
    items: [],
  },  
};