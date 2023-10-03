import daysGenerator from "./daysGenerator";

const daysOfPrint = (items) => {
    // Pass fetchedOrders (items) as an argument
    const obj = {};
    const days = daysGenerator();
    // const currendDay = new window.Date();
    for (const [index, key] of days.entries()) {
      const timeofday = index % 2 === 0 ? "day" : "night"; 
      let itemsOfday = [];
      items.forEach((item)=>{
        item.parts.forEach((part)=>{
        if ((key + '_' + timeofday) === part.printing[0].parent_day ) {
        //   item.pk = part.printing[0].order_part_id  
          itemsOfday.push(
            {
                'pk': part.printing[0].pk,
                'number': item.number,
                'nameOfOrder': item.nameOfOrder,
                'printed_sheets': part.printing[0].printed_sheets,
                'circulation_sheets': part.printing[0].circulation_sheets,
                'partName': part.part_name_display,
                'order_part': part.printing[0].order_part,
                'position': part.printing[0].position,
                'paper': part.paper.type_display,
            }
          );
          console.log("1_item_" , item)
          console.log("2_part_" , part)
          console.log("3_itemsOfday__", itemsOfday)
          }        
        })
      })
      // const today = new window.Date().toLocaleDateString('Ru', {day: "numeric",month:"numeric",weekday:"short",   })
      obj[key + '_' + timeofday] = {
        date: key,
        timeofday: timeofday,
        // items: key === today && index % 2 === 0 ? items : [],
        items: itemsOfday.sort((a, b)=>{
        //   return a.parts[0].printing[0].position - b.parts[0].printing[0].position;
          return a.position - b.position;

        }),
      };
    }
    return obj;
  };

  export default daysOfPrint;