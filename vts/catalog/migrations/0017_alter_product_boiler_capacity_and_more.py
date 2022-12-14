# Generated by Django 4.0.6 on 2022-08-13 20:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0016_product_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='boiler_capacity',
            field=models.IntegerField(blank=True, null=True, verbose_name='Місткість водонагрівача (л)'),
        ),
        migrations.AlterField(
            model_name='product',
            name='coefficient_of_performance',
            field=models.IntegerField(blank=True, null=True, verbose_name='ККД (%)'),
        ),
        migrations.AlterField(
            model_name='product',
            name='discount_price',
            field=models.IntegerField(blank=True, null=True, verbose_name='Акційна ціна'),
        ),
        migrations.AlterField(
            model_name='product',
            name='electric_power',
            field=models.IntegerField(blank=True, null=True, verbose_name='Електрична потужність (кВт)'),
        ),
        migrations.AlterField(
            model_name='product',
            name='heat_area',
            field=models.IntegerField(blank=True, null=True, verbose_name='Максимальна площа обігріву (кв м)'),
        ),
        migrations.AlterField(
            model_name='product',
            name='heating_power',
            field=models.IntegerField(blank=True, null=True, verbose_name='Теплова потужність (кВт)'),
        ),
        migrations.AlterField(
            model_name='product',
            name='height',
            field=models.IntegerField(blank=True, null=True, verbose_name='Висота (мм)'),
        ),
        migrations.AlterField(
            model_name='product',
            name='length',
            field=models.IntegerField(blank=True, null=True, verbose_name='Глибина (мм)'),
        ),
        migrations.AlterField(
            model_name='product',
            name='max_fuel_consumption',
            field=models.IntegerField(blank=True, null=True, verbose_name='Максимальна витрата палива (м3/год)'),
        ),
        migrations.AlterField(
            model_name='product',
            name='pressure_in_max',
            field=models.IntegerField(blank=True, null=True, verbose_name='Тиск на вході (max атм)'),
        ),
        migrations.AlterField(
            model_name='product',
            name='pressure_in_min',
            field=models.IntegerField(blank=True, null=True, verbose_name='Тиск на вході (min атм)'),
        ),
        migrations.AlterField(
            model_name='product',
            name='productivity',
            field=models.IntegerField(blank=True, null=True, verbose_name='Продуктивність (л/хв)'),
        ),
        migrations.AlterField(
            model_name='product',
            name='weight',
            field=models.IntegerField(blank=True, null=True, verbose_name='Вага (кг)'),
        ),
        migrations.AlterField(
            model_name='product',
            name='width',
            field=models.IntegerField(blank=True, null=True, verbose_name='Ширина (мм)'),
        ),
    ]
