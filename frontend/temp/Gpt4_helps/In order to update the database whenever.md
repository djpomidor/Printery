Чтобы обновить базу данных всякий раз, когда происходит изменение в позициях элементов, вам следует изменить функцию `ondragend` для отправки запроса API с обновленными позициями.Давайте выполним эти шаги, чтобы реализовать это:

1. Создайте конечную точку API в своем бэкэнд Django, чтобы обновить позиции элементов.
2. Напишите функцию в вашем представлении Django, которая получает обновленные данные положения и соответственно обновляет элементы в базе данных.
3. Обновите функцию `ondragend`, чтобы отправить запрос API в бэкэнд Django с обновленными позициями.

Во -первых, создайте функцию в вашем приложении React, которая отправляет обновленные позиции в бэкэнд Django:

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


Убедитесь, что ваши элементы имеют уникальные идентификаторы (например, `item.id`).Наконец, вам необходимо реализовать конечную точку API и функцию представления в вашем бэкэнд Django, чтобы сохранить обновленные позиции.

Важно отметить, что этот метод запускает запросы API для каждого элемента в столбцах источника и назначения.Это потенциально может привести ко многим вызовам API.Альтернативный подход состоит в том, чтобы обновить позиции оптом путем отправки порядка всех элементов в их соответствующих столбцах в бэкэнд Django в одном запросе API.