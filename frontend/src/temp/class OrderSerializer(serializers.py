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
            paper_data = part_data.pop('paper', None)
            if paper_data:
                paper, created = Paper.objects.get_or_create(**paper_data)
            else:
                paper = None
            
            printing_data = part_data.pop('printing', [])
            part = Part.objects.create(order=order, paper=paper, **part_data)
            for printing in printing_data:
                PrintSchedule.objects.create(order_part=part, **printing)
                
        return order

    def update(self, instance, validated_data):
        owners = validated_data.pop('owner', None)
        if owners:
            instance.owner.set(owners)
        
        # Обновляем данные заказа
        instance.number = validated_data.get('number', instance.number)
        instance.name = validated_data.get('name', instance.name)
        instance.type = validated_data.get('type', instance.type)
        instance.circulation = validated_data.get('circulation', instance.circulation)
        instance.binding = validated_data.get('binding', instance.binding)
        instance.width = validated_data.get('width', instance.width)
        instance.height = validated_data.get('height', instance.height)
        instance.due_date = validated_data.get('due_date', instance.due_date)
        instance.delivery_date = validated_data.get('delivery_date', instance.delivery_date)
        instance.save()

        # Обработка вложенных частей заказа (parts)
        parts_data = validated_data.pop('parts', [])
        existing_parts = {part.id: part for part in instance.parts.all()}
        
        for part_data in parts_data:
            part_id = part_data.get('id')
            if part_id in existing_parts:
                part = existing_parts[part_id]
                part.pages = part_data.get('pages', part.pages)
                part.color = part_data.get('color', part.color)
                # Обновление бумаги
                paper_data = part_data.get('paper')
                if paper_data:
                    paper, _ = Paper.objects.get_or_create(**paper_data)
                    part.paper = paper
                part.save()

                # Обновление расписания печати
                printing_data = part_data.get('printing', [])
                existing_prints = {p.pk: p for p in part.printing.all()}
                for print_data in printing_data:
                    print_id = print_data.get('pk')
                    if print_id and print_id in existing_prints:
                        print_instance = existing_prints[print_id]
                        for field, value in print_data.items():
                            setattr(print_instance, field, value)
                        print_instance.save()
                    else:
                        PrintSchedule.objects.create(order_part=part, **print_data)
            else:
                paper_data = part_data.pop('paper', None)
                if paper_data:
                    paper, _ = Paper.objects.get_or_create(**paper_data)
                else:
                    paper = None

                printing_data = part_data.pop('printing', [])
                part = Part.objects.create(order=instance, paper=paper, **part_data)
                for printing in printing_data:
                    PrintSchedule.objects.create(order_part=part, **printing)
        
        return instance
