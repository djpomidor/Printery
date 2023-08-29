Чтобы сохранить позицию элементов в базу данных, вы захотите обновить базу данных, когда происходит изменение позиций элементов.Вот обзор высокого уровня того, что вам нужно сделать:

1. Убедитесь, что в вашей базе данных есть схема для хранения информации о позиции.Это может включать добавление столбцов для `position` и/или` parent_container` (если ваши элементы являются частью контейнеров, таких как списки или доски).Вы также должны добавить уникальный идентификатор (например, `id`) для каждого элемента.

2. Создайте конечную точку API в своем бэкэнде Django, которая позволяет вам обновить позиционные данные элемента.(например, что -то вроде `/api/items/: id/update_position/`)

3. Напишите функцию в вашем представлении Django, которая получает обновленные данные положения и соответственно обновляет элемент в базе данных.

4. В вашем приложении React добавьте обработчик событий, когда изменяется позиция элемента (например, используя событие `ondragend`, если вы используете библиотеку React-Beautiful-DND).Когда этот обработчик запускается, обновите позицию элемента в его состоянии и отправьте запрос API в бэкэнд Django с обновленными позиционными данными.

Вот простой пример того, как вы можете реализовать это в своем представлении Django, чтобы обновить позицию:

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