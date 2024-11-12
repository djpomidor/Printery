def update(self, instance, validated_data):
    print("!FAGAJKA& instance", instance)
    print("!FAGAJKA& validated_data", validated_data)
    # Обновляем поля заказа
    for attr, value in validated_data.items():
        if attr == 'parts':
            continue  # Пропускаем части; обработаем их отдельно

        # Обновляем только изменённые поля
        if getattr(instance, attr) != value:
            setattr(instance, attr, value)

    instance.save()

    # Обработка поля `parts`
    parts_data = validated_data.get('parts')
    print("Parts Data:", parts_data)
    if parts_data:
        for part_data in parts_data:
            part_id = part_data.get('id')
            if part_id:
                part = Part.objects.get(pk=part_id, order=instance)
            else:
                part = Part(order=instance)  # Создаём новую часть, если ID нет

            # Обновляем только изменённые поля для `Part`
            for attr, value in part_data.items():
                if attr == 'printing':
                    continue  # Пропускаем печать; обработаем её отдельно
                elif attr == 'paper':
                    # Обработка данных бумаги
                    paper_data = value
                    if paper_data:
                        paper, _ = Paper.objects.get_or_create(**paper_data)  # Получаем или создаём объект Paper
                        part.paper = paper  # Присваиваем объект Paper
                else:
                    # Обновляем только изменённые поля
                    if getattr(part, attr) != value:
                        setattr(part, attr, value)
            part.save()

            # Обработка вложенного поля `printing`
            printing_data = part_data.get('printing')
            print("Printing Data:", printing_data)

            if printing_data:
                for print_item in printing_data:
                    print_id = print_item.get('pk')
                    if print_id:
                        printing_instance = PrintSchedule.objects.get(pk=print_id, order_part=part)
                    else:
                        printing_instance = PrintSchedule(order_part=part)

                    # Обновляем только изменённые поля для `Printing`
                    for attr, value in print_item.items():
                        if getattr(printing_instance, attr) != value:
                            setattr(printing_instance, attr, value)
                    printing_instance.save()

    return instance
