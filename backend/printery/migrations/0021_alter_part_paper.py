# Generated by Django 4.1.7 on 2023-10-03 12:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('printery', '0020_alter_order_type_alter_part_part_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='part',
            name='paper',
            field=models.ForeignKey(blank=True, default=1, on_delete=django.db.models.deletion.CASCADE, related_name='paper', to='printery.paper'),
            preserve_default=False,
        ),
    ]
