у меня есть такая модель в models.py:

class Paper(models.Model):
    name = models.CharField(blank=True, max_length=64)
    TYPE_CHOICES = [
        (None, 'Select...'),
        ('OFF', 'Офсетная'),
        ('GL', 'Глянцевая'),
        ('MAT', 'Матовая'),
        ('CAR', 'Картон'),
    ]
    type = models.CharField(max_length=3,
        choices=TYPE_CHOICES,
        )
    
    COLOR_CHOICES = [
        (None, 'Select...'),
        ('4_4', '4(CMYK)+4(CMYK)'),
        ('4_0', '4(CMYK)+0'),
        ('1_1', '1(Black)+1(Black)'),
    ]
    color = models.CharField(blank=True, max_length=3, choices=COLOR_CHOICES)    

serializer.py:

class PaperSerializer(serializers.ModelSerializer):
    class Meta:
        model=Paper
        fields = ["name", "type","density","width","height", "manufacturer"]


как в django serializer вернуть из базы не само значение поля, например OFF и 4_4, но их соответствее имя в виде строки - Офсетная и 4(CMYK)+4(CMYK)?