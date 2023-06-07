# Generated by Django 4.0.6 on 2022-08-17 18:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0018_alter_product_max_temperature_water_heating'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='auto_ignition',
            field=models.BooleanField(default=False, verbose_name='Автозапалювання'),
        ),
        migrations.AlterField(
            model_name='product',
            name='heat_exchanger_material',
            field=models.CharField(blank=True, choices=[('сталь', 'Сталь'), ('нержавіюча', 'Нержавіюча сталь'), ('чавун', 'Чавун'), ('мідь', 'Мідь')], help_text='Матеріал теплообмінника', max_length=12),
        ),
        migrations.AlterField(
            model_name='product',
            name='pump_type',
            field=models.CharField(blank=True, choices=[('глибинний', 'Глибинний'), ('дренажний', 'Дренажний'), ('поверхневий', 'Поверхневий'), ('занур', 'Занурювальний'), ('каналіз', 'Каналізаційний'), ('циркул', 'Циркуляційний')], help_text='Тип насосу', max_length=12),
        ),
    ]