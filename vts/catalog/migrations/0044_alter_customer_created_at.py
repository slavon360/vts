# Generated by Django 4.0.6 on 2023-01-15 11:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0043_alter_customer_created_at_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='created_at',
            field=models.DateTimeField(auto_now=True, verbose_name='Дата створення'),
        ),
    ]
