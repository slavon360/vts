# Generated by Django 4.0.6 on 2022-08-18 20:17

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0019_product_auto_ignition_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='created_at',
            field=models.DateTimeField(verbose_name='Дата створення'),
        ),
        migrations.AlterField(
            model_name='product',
            name='id',
            field=models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='product',
            name='title_without_serial_number',
            field=models.CharField(help_text='Назва без серійного номеру', max_length=200),
        ),
    ]