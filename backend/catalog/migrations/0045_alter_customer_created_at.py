# Generated by Django 4.0.6 on 2023-01-15 11:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0044_alter_customer_created_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='created_at',
            field=models.DateTimeField(verbose_name='Дата створення'),
        ),
    ]