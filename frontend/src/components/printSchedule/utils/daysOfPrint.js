import daysGenerator from "./daysGenerator";

const daysOfPrint = (items, machine) => {
  console.log("-------", items)
  // Pass fetchedOrders (items) as an argument
  const obj = {};
  const days = daysGenerator();

  for (const [index, key] of days.entries()) {
    const timeofday = index % 2 === 0 ? "day" : "night";
    let itemsOfday = [];
    items.forEach((item) => {
      item.parts.forEach((part) => {
        if ((key + '_' + timeofday) === part.printing[0].parent_day && part.printing[0][machine] === true ) {
          itemsOfday.push(
            {
              'pk': part.printing[0].pk,
              'number': item.number,
              'nameOfOrder': item.nameOfOrder,
              'color': part.color_display,
              'printed_sheets': part.printing[0].printed_sheets,
              'circulation_sheets': part.printing[0].circulation_sheets,
              'partName': part.part_name_display,
              'order_part': part.printing[0].order_part,
              'position': part.printing[0].position,
              'paper': part.paper.type_display,

            }
          );
        }
      })
    })
    obj[key + '_' + timeofday] = {
      date: key,
      timeofday: timeofday,
      items: itemsOfday.sort((a, b) => {
        return a.position - b.position;
      }),
    };
  }
  return obj;
};

export default daysOfPrint;