In your current implementation, `OrderSerializer` is trying to fetch `parent_day` and `position` properties as if they're related fields for the `Order` model, but they are not. The relationship should be built through the `PrintSchedule` model. It's necessary to correctly set the related fields and expand the relationship between `Order` and `PrintSchedule` using the `StringRelatedField` or the `PrimaryKeyRelatedField` depending on your preference.

Update your serializer like this:

```python
# serializers.py
from rest_framework import serializers
from .models import Order, PrintSchedule

class PrintScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrintSchedule
        fields = ['parent_day', 'position']

class OrderSerializer(serializers.ModelSerializer):
    printing = PrintScheduleSerializer(many=True, read_only=True)
    
    class Meta:
        model = Order
        fields = ['pk', 'name', 'printing']
```

In this implementation, the `OrderSerializer` includes a nested `printing` field representing the reverse relation between `Order` and `PrintSchedule` models. The `PrintScheduleSerializer` will serialize each related PrintSchedule object, and the `many=True` attribute ensures that this nested serialization works for multiple related PrintSchedule objects.

With this setup, your serialized `Order` objects should now include related `PrintSchedule` objects with their `parent_day` and `position`. The serialized JSON structure will look like this:

```json
{
  "pk": 1,
  "name": "Example Order",
  "printing": [
    {
      "parent_day": "some_value",
      "position": 2
    },
    {
      "parent_day": "another_value",
      "position": 3
    }
  ]
}
```