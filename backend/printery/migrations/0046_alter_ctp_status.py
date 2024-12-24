# Generated by Django 4.1.7 on 2024-12-10 18:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('printery', '0045_alter_ctp_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ctp',
            name='status',
            field=models.CharField(blank=True, choices=[('in_progress', 'В работе'), ('issues', 'Проблемы с заказом'), ('completed', 'Сделан')], max_length=15, null=True),
        ),
    ]
