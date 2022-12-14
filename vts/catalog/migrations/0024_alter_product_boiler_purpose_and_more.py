# Generated by Django 4.0.6 on 2022-08-28 20:08

from django.db import migrations, models
import tinymce.models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0023_alter_product_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='boiler_purpose',
            field=models.CharField(blank=True, choices=[('дво', 'Двоконтурний'), ('одн', 'Одноконтурний')], max_length=3, verbose_name='Призначення котла'),
        ),
        migrations.AlterField(
            model_name='product',
            name='boiler_type',
            field=models.CharField(blank=True, choices=[('газ', 'Газовий'), ('рід', 'Рідкопаливний'), ('ком', 'Комбінований'), ('твр', 'Твердопаливний'), ('ел', 'Електричний')], max_length=3, verbose_name='Вкажіть тип котла'),
        ),
        migrations.AlterField(
            model_name='product',
            name='combustion_chamber_type',
            field=models.CharField(blank=True, choices=[('від', 'Відчинена'), ('зач', 'Зачинена')], max_length=3, verbose_name='Тип камери згорання'),
        ),
        migrations.AlterField(
            model_name='product',
            name='control_type',
            field=models.CharField(blank=True, choices=[('мех', 'Механічне'), ('еле', 'Електронне')], max_length=3, verbose_name='Тип керування'),
        ),
        migrations.AlterField(
            model_name='product',
            name='description',
            field=tinymce.models.HTMLField(blank=True, null=True, verbose_name='Опис'),
        ),
        migrations.AlterField(
            model_name='product',
            name='eyeliner',
            field=models.CharField(blank=True, choices=[('бокова', 'Бокова'), ('верхня', 'Верхня'), ('нижня', 'Нижня')], max_length=12, verbose_name='Підводка'),
        ),
        migrations.AlterField(
            model_name='product',
            name='fuel_type',
            field=models.CharField(blank=True, choices=[('диз', 'Дизель'), ('дер', 'Деревина'), ('кок', 'Кокс'), ('пел', 'Пелети'), ('прг', 'Природній газ'), ('скг', 'Скраплений газ'), ('сол', 'Солома'), ('тор', 'Торфобрикети/Торф'), ('вуг', 'Вугілля'), ('еле', 'Електрика')], max_length=3, verbose_name='Вид палива'),
        ),
        migrations.AlterField(
            model_name='product',
            name='heat_carrier_type',
            field=models.CharField(blank=True, choices=[('вод', 'Вода'), ('етл', 'Етиленгліколь'), ('прп', 'Пропіленгліколь'), ('сум', 'Суміші')], max_length=3, verbose_name='Вид теплоносія'),
        ),
        migrations.AlterField(
            model_name='product',
            name='heat_exchanger_material',
            field=models.CharField(blank=True, choices=[('сталь', 'Сталь'), ('нержавіюча', 'Нержавіюча сталь'), ('чавун', 'Чавун'), ('мідь', 'Мідь')], max_length=12, verbose_name='Матеріал теплообмінника'),
        ),
        migrations.AlterField(
            model_name='product',
            name='heating_element',
            field=models.CharField(blank=True, choices=[('трб', 'Трубчастий'), ('спі', 'Спіральний'), ('сух', 'Сухий'), ('мок', 'Мокрий')], max_length=3, verbose_name='Нагріваючий елемент'),
        ),
        migrations.AlterField(
            model_name='product',
            name='heating_type',
            field=models.CharField(blank=True, choices=[('газ', 'Газовий'), ('ком', 'Комбінований'), ('неп', 'Непрямий'), ('еле', 'Електричний')], max_length=3, verbose_name='Тип опалення'),
        ),
        migrations.AlterField(
            model_name='product',
            name='ignition_type',
            field=models.CharField(blank=True, choices=[('авт', 'Автоматичний'), ('руч', 'Ручний'), ('пєз', "П'єзоелектричний")], max_length=3, verbose_name='Тип розпалу'),
        ),
        migrations.AlterField(
            model_name='product',
            name='installation_method',
            field=models.CharField(blank=True, choices=[('навіс', 'Навісний'), ('підлог', 'Підлоговий'), ('вертик', 'Вертикальний'), ('гориз', 'Горизонтальний')], max_length=8, verbose_name='Спосіб установки'),
        ),
        migrations.AlterField(
            model_name='product',
            name='pump_type',
            field=models.CharField(blank=True, choices=[('глибинний', 'Глибинний'), ('дренажний', 'Дренажний'), ('поверхневий', 'Поверхневий'), ('занур', 'Занурювальний'), ('каналіз', 'Каналізаційний'), ('циркул', 'Циркуляційний')], max_length=12, verbose_name='Тип насосу'),
        ),
        migrations.AlterField(
            model_name='product',
            name='tank_form',
            field=models.CharField(blank=True, choices=[('цил', 'Циліндрична'), ('плс', 'Плоска')], max_length=3, verbose_name='Форма баку'),
        ),
        migrations.AlterField(
            model_name='product',
            name='tank_type',
            field=models.CharField(blank=True, choices=[('без', 'Безнапорний'), ('нап', 'Напорний')], max_length=3, verbose_name='Тип баку'),
        ),
        migrations.AlterField(
            model_name='product',
            name='title_without_serial_number',
            field=models.CharField(max_length=200, verbose_name='Назва без серійного номеру'),
        ),
        migrations.AlterField(
            model_name='product',
            name='type_of_thrust',
            field=models.CharField(blank=True, choices=[('прм', 'Примусова'), ('звч', 'Звичайна')], max_length=3, verbose_name='Вид тяги'),
        ),
        migrations.AlterField(
            model_name='product',
            name='water_level_defense',
            field=models.CharField(blank=True, choices=[('first', '1'), ('second', '2'), ('third', '3'), ('fourth', '4'), ('fifth', '5'), ('sixth', '6'), ('seventh', '7'), ('eight', '8')], max_length=12, verbose_name='Рівень захисту від води'),
        ),
        migrations.AlterField(
            model_name='product',
            name='work_type_of_gas_boiler',
            field=models.CharField(blank=True, choices=[('стн', 'Стандартний'), ('кнд', 'Конденсаційний')], max_length=3, verbose_name='Вкажіть принцип роботи газового котла'),
        ),
        migrations.AlterField(
            model_name='product',
            name='work_type_of_solid_fuel_boiler',
            field=models.CharField(blank=True, choices=[('дтг', 'Довготривалого горіння'), ('пел', 'Пелетний'), ('пір', 'Піролізний'), ('стн', 'Стандартний')], max_length=3, verbose_name='Вкажіть принцип роботи твердопаливного котла'),
        ),
    ]
