# Generated by Django 4.1.7 on 2024-11-11 21:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('printery', '0034_alter_paper_density'),
    ]

    operations = [
        migrations.AlterField(
            model_name='part',
            name='color',
            field=models.CharField(blank=True, choices=[(None, 'Select...'), ('4+4', '4+4'), ('4+0', '4+0'), ('1+1', '1+1'), ('1+0', '1+0')], max_length=3),
        ),
    ]
