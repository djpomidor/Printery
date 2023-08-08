In order to update the database whenever a change in the items' positions occurs, you should modify the `onDragEnd` function to send an API request with the updated positions. Let's follow these steps to implement this:

1. Create an API endpoint in your Django backend to update the positions of the items.
2. Write a function in your Django view that receives the updated position data and updates the items in the database accordingly.
3. Update the `onDragEnd` function to send an API request to the Django backend with updated positions.

First, create a function in your React app that sends the updated positions to the Django backend:

```javascript
const updatePositions = async (itemId, newPosition, newColumnId) => {
  try {
    const response = await api.put(`/api/items/${itemId}/update_position/`, {
      position: newPosition,
      column_id: newColumnId,
    });

    // Do anything with the updated item data if necessary
    // console.log(response.data);

  } catch (error) {
    // Handle errors
    console.error(error);
  }
};
```

Next, modify the `onDragEnd` function to call the `updatePositions` function whenever a change in the items' positions occurs:

```javascript 
const onDragEnd = (result, columns, setState) => {
  // ... (keep the existing code)

  // Call updatePositions for each item in the source and destination columns
  if (source.droppableId !== destination.droppableId) {
    newColumns[source.droppableId].items.forEach((item, index) => {
      updatePositions(item.id, index, source.droppableId); 
    });
    newColumns[destination.droppableId].items.forEach((item, index) => {
      updatePositions(item.id, index, destination.droppableId);
    });
  } else {
    newColumns[source.droppableId].items.forEach((item, index) => {
      updatePositions(item.id, index, source.droppableId);
    });
  }

  // ... (keep the existing code)
};
```

Make sure your items have unique identifiers (e.g., `item.id`). Finally, you need to implement the API endpoint and the view function in your Django backend to save the updated positions.

It's important to note that this method triggers API requests for each item in the source and destination columns. This could potentially lead to many API calls. An alternative approach is to update the positions in bulk by sending the order of all items in their respective columns to the Django backend in a single API request.
