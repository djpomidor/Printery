Apologies for the oversight. It looks like I missed updating the reference to `setColumns` inside the `onDragEnd` call. Since you're now using `setState` to update the state object, you should replace `setColumns` with `setState`. Here's the corrected line:

```jsx
<DragDropContext
  onDragEnd={(result) => onDragEnd(result, state.columns, setState)}
>
```

You'll also need to update the `onDragEnd` function to handle the new `setState` and modify the state accordingly:

```js
const onDragEnd = (result, columns, setState) => {
  if (!result.destination) return;
  const { source, destination } = result;

  const newColumns = { ...columns };

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = newColumns[source.droppableId];
    const destColumn = newColumns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    newColumns[source.droppableId] = { ...sourceColumn, items: sourceItems };
    newColumns[destination.droppableId] = { ...destColumn, items: destItems };
  } else {
    const column = newColumns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    newColumns[source.droppableId] = { ...column, items: copiedItems };
  }

  setState(prevState => ({
    ...prevState,
    columns: newColumns
  }));
};
```

In this updated version of `onDragEnd`, it creates a new `newColumns` object based on the current `columns` and modifies it accordingly when dragging items. Then, it updates the state with the new `columns` using `setState`.