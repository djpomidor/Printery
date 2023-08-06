In order to save the position of items to a database, you'll want to update the database whenever a change in the items' positions occurs. Here's a high-level overview of what you would need to do:

1. Ensure that your database has a schema to store the position information. This might include adding columns for `position` and/or `parent_container` (if your items are part of containers, like lists or boards). You should also add a unique identifier (e.g., `id`) for each item.

2. Create an API endpoint in your Django backend that allows you to update an item's positional data. (e.g., something like `/api/items/:id/update_position/`)

3. Write a function in your Django view that receives the updated position data and updates the item in the database accordingly.

4. In your React app, add an event handler for when an item's position changes (for example, using `onDragEnd` event if you are using the react-beautiful-dnd library). When this handler is triggered, update the item's position in its state and send an API request to the Django backend with the updated positional data.

Here's a simple example of how you might implement this in your Django view to update the position:

```python
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Item
from .serializers import ItemSerializer

@api_view(['PUT'])
def update_position(request, pk):
    try:
        item = Item.objects.get(pk=pk)
    except Item.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    position = request.data.get('position')

    if position is not None:
        item.position = position
        item.save()
        serializer = ItemSerializer(item)
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)
```

In your React app, you would need a function that sends the updated positional data to this API endpoint when the items' positions are changed:

```javascript
const updateItemPosition = async (itemId, newPosition) => {
  try {
    const response = await axios.put(`/api/items/${itemId}/update_position/`, {
      position: newPosition,
    });

    // Do anything with the updated item data, if necessary
    // console.log(response.data);

  } catch (error) {
    // Handle errors
    console.error(error);
  }
};
```

Finally, make sure to call this function with the appropriate values in your drag and drop event handler (e.g., `onDragEnd`).