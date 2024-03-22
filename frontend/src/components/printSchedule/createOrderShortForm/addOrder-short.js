export const addOrder = async (values, user, props) => {
    values.owner = [user.user_id]
    values.parts = values.parts.filter((part) => {
        if (part.printing[0].printed_sheets != 0 && part.printing[0].printing_day) {
        let day = part.printing[0].printing_day.toLocaleDateString('Ru', {  
            day: "numeric", 
            month:"numeric", 
            weekday:"short",
          });
          part.printing[0].parent_day = day + "_" + part.printing[0].day_or_night;
          switch(part.printing[0].machine){
            case '1':
               part.printing[0].sm1 = true;
               part.printing[0].sm2 = false;
               part.printing[0].rapida = false;
               break;
            case '2':
                part.printing[0].sm2 = true;
                part.printing[0].sm1 = false;
                part.printing[0].rapida = false;
                break;
            case '3':
                part.printing[0].rapida = true;
                part.printing[0].sm2 = false;
                part.printing[0].sm1 = false;
                break;
            default:
                part.printing[0].sm1 = true;
                part.printing[0].sm2 = false;
                part.printing[0].rapida = false;             
          }
            
        return  part.printing[0].printed_sheets != 0 ;}   
    });

    try {
        const response = await fetch("http://127.0.0.1:8000/api/orders/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values, null, 2)
        });
        const data = await response.json();
        if (response.status === 201) {
            alert("All good! status: 201");
            console.log("___--", data);
            props.setUpdateTrigger(prevState => !prevState); // Toggle between false and true
            
            // window.location.reload();
        } else {
            alert("Something went wrong:!");
            console.log("___--", data);
            return data;
        }
    } catch (error) {
        console.error(")))))))",error);
        // console.error("((((((())))))))))))))",response);
    }
};