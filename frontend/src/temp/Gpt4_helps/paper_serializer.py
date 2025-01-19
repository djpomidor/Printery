
class PartSerializer(serializers.ModelSerializer):
    pages = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    order = serializers.PrimaryKeyRelatedField(read_only=True)
    paper = PaperSerializer()  # Update to use PaperSerializer for nested structure
    color_display = serializers.CharField(source='get_color_display', read_only=True)
    printing = PrintScheduleSerializer(many=True)
    part_name_display = serializers.CharField(source='get_part_name_display', read_only=True)

    def validate_pages(self, value):
        if not value:
            return 0
        try:
            return int(value)
        except ValueError:
            raise serializers.ValidationError('You must supply an integer')

    class Meta:
        model = Part
        fields = ['order', 'part_name', 'part_name_display', 'pages', 'paper', 'color', 'color_display', 'laminate', 'uflak', 'printing']


class OrderSerializer(serializers.ModelSerializer):
    orderId = serializers.IntegerField(source='number', required=False)
    parts = PartSerializer(many=True)
    nameOfOrder = serializers.CharField(source='name')
    typeOfOrder = serializers.CharField(source='type', allow_blank=True, required=False)
    width = serializers.IntegerField(default=0, allow_null=True, required=False)
    height = serializers.IntegerField(allow_null=True, required=False)
    owner = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)

    class Meta:
        model = Order 
        fields = ['pk', 'number', 'orderId', 'nameOfOrder', 'owner', 'typeOfOrder', 'circulation', 'binding', 'width', 'height', 'created', 'due_date', 'delivery_date', 'parts']

    def create(self, validated_data):
        owners = validated_data.pop('owner')
        parts_data = validated_data.pop('parts')
        order = Order.objects.create(**validated_data)
        order.owner.set(owners)
        
        for part_data in parts_data:
            print("!@#$%__", part_data)
            # Handle paper data
            paper_data = part_data.pop('paper', None)  # Use .pop with a default to avoid KeyError
            if paper_data:
                paper, created = Paper.objects.get_or_create(**paper_data)  # Use get_or_create to avoid duplicates
            else:
                paper = None

            # Handle printing data
            printing_data = part_data.pop('printing', [])
            part = Part.objects.create(order=order, paper=paper, **part_data)

            for printing in printing_data:
                PrintSchedule.objects.create(order_part=part, **printing)

        return order
