# Generated by Django 4.1.7 on 2023-10-06 17:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('printery', '0024_alter_paper_height_alter_paper_width'),
    ]

    operations = [
        migrations.AlterField(
            model_name='paper',
            name='height',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='paper',
            name='width',
            field=models.IntegerField(null=True),
        ),
    ]