import daysGenerator from "./daysGenerator";

const daysOfPrint = (items) => {
    // Pass fetchedOrders (items) as an argument
    const obj = {};
    const days = daysGenerator();
    const currendDay = new window.Date();
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
                'circulation': item.circulation,
                'partName': part.part_name,
                'order_part': part.printing[0].order_part,
                'position': part.printing[0].position,
            }
          );
        //   console.log("1__" , part)
          console.log("2___", itemsOfday)
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