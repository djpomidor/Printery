# Generated by Django 4.1.7 on 2024-04-04 14:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('printery', '0029_alter_paper_type_alter_printschedule_sm1'),
    ]

    operations = [
        migrations.AlterField(
            model_name='part',
            name='part_name',
            field=models.CharField(blank=True, choices=[('BLO', 'блок'), ('COV', 'обл.'), ('INS', 'вкл.'), ('FRZ', 'форзацы')], max_length=3),
        ),
    ]
