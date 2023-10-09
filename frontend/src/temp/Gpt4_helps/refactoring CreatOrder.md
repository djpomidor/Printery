Your code currently contains the UI, form user interaction handling, validation, API request, and some relatively complex computation all in a single component. It also has a large amount of repetition.

By extracting things into smaller components and custom hooks, the code will be more maintainable and reusable.

Here's an example of how you could break things down and abstract some functionality:

```jsx
import React, { useState, useContext } from 'react';
import FormField from './FormField';
import { useFormikContext, Formik, Field, FieldArray, ErrorMessage } from 'formik';
import * as yup from 'yup';
import SelectField from './SelectField';
import AuthContext from "../../context/AuthContext";
import { addOrder } from '../../api/orders'; // separated API request function
import Parts from './Parts';

const schema = */...your schema...*/

const CreateOrder = () => {
  const { user } = useContext(AuthContext);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState();

  const onSubmit = async (values) => {
    values = manipulateValues(values); // separated out manipulation
    const newOrder = await addOrder(values, user);
    setValidated(true);
    setErrors(newOrder);
  };

  return (
    <Formik /*...your form props...*/>
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <FormField /* All field components are abstracted  */ />
          {/* other FormFields */}
           
           // This can be abstracted to separate component as well
          <FieldArray name="parts" component={Parts} />
          
          {/* Rest of your Form */}
        </Form>
    )}
    </Formik>
  );
}

export default CreateOrder;

// In new file: api/orders.js
export const addOrder = async (values, user) => {
    values.owner = [user.user_id]
    values.parts = values.parts.filter((part) => {
      // part.paper = parseInt(part.paper)
      return part.pages !== 0;
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
        // window.location.reload();
      } else {
        alert("Something went wrong, response.status:!", response.status);
        return data;
      }
    } catch (error) {
      console.error(error);
    }
}

// In new file: components/Parts.js
export const Parts = ({ insert, remove, push }) => {
 /* your existing code here */
}

// Do a similar thing with FormField component. It could accept its validation schema, name, and all other essential props. That way, you can reuse it for all of your Form fields.
```

Please remember to adapt the modularization to meet your coding style and project requirements.

This step is optional according to your needs but creating separate files for each new component and import them in your main file.