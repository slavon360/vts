# Generated by Django 4.0.6 on 2022-09-03 20:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0030_alter_product_title_without_serial_number'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='product',
            options={'ordering': ['created_at']},
        ),
    ]
