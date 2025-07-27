You can use the HTML `<datalist>` element in your React code just like any other HTML element.

Here's a very basic use-case of using `<datalist>` in React:

```jsx
import React from 'react';

function AutoCompleteTextInput() {
  return (
    <div>
      <input list="fruit" placeholder="Choose a fruit" />
      
      <datalist id="fruit">
        <option value="Apple" />
        <option value="Banana" />
        <option value="Cherry" />
        <option value="Date" />
        <option value="Elderberry" />
        <option value="Fig" />
        <option value="Grape" />
        <option value="Honeydew" />
      </datalist>
    </div>
  );
}

export default AutoCompleteTextInput;
```

In this code, we have an `<input>` field with a `list` attribute that refers to a `<datalist>` by id. The `<datalist>` contains several `<option>` elements, which are the options that will be shown as suggestions in the `<input>` field while the user is typing.

Note: Keep in mind, `<datalist>` behaviour may differ slightly between different browsers. For instance, in some browsers, the list of options will automatically appear when the user clicks on the input field, while others will wait until the user starts typing.
