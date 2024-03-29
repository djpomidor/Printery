# Generated by Django 4.1.7 on 2023-08-11 10:40

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('printery', '0014_alter_printschedule_order_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='printschedule',
            name='order',
            field=models.ForeignKey(default=490, on_delete=django.db.models.deletion.CASCADE, related_name='printing', to='printery.order'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='printschedule',
            name='parent_day',
            field=models.CharField(blank=True, default=django.utils.timezone.now, max_length=8),
            preserve_default=False,
        ),
    ]
