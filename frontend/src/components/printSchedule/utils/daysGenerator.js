const daysGenerator = () => {
    let dates = [];
    [...Array(8).keys()].map(index => {
    const d = new window.Date();
    d.setDate((d.getDate() - 2) + index);
    let day = d.toLocaleDateString('Ru', {  
      day: "numeric", 
      month:"numeric", 
      weekday:"short",
    });
    dates.push(day);
    return dates.push(day);
  });
  return dates;
  };

  export default daysGenerator;