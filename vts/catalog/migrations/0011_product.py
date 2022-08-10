# Generated by Django 4.0.6 on 2022-08-10 19:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0010_alter_category_image_alter_phone_image_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(help_text='Вкажіть назву продукту', max_length=200, verbose_name='Назва')),
                ('image', models.ImageField(upload_to='products')),
                ('article', models.CharField(blank=True, help_text='Вкажіть артикул продукту', max_length=200, verbose_name='Артикул')),
                ('manufacturer', models.CharField(blank=True, help_text='Вкажіть виробника', max_length=200, verbose_name='Виробник')),
                ('water_heater_type', models.CharField(blank=True, choices=[('нак', 'Накопичувальний'), ('прт', 'Проточний')], help_text='Вкажіть тип водонагрівача', max_length=3)),
                ('boiler_type', models.CharField(blank=True, choices=[('газ', 'Газовий'), ('рід', 'Рідкопаливний'), ('ком', 'Комбінований'), ('твр', 'Твердопаливний'), ('ел', 'Електричний')], help_text='Вкажіть тип котла', max_length=3)),
                ('work_type_of_gas_boiler', models.CharField(blank=True, choices=[('стн', 'Стандартний'), ('кнд', 'Конденсаційний')], help_text='Вкажіть принцип роботи газового котла', max_length=3)),
                ('work_type_of_solid_fuel_boiler', models.CharField(blank=True, choices=[('дтг', 'Довготривалого горіння'), ('пел', 'Пелетний'), ('пір', 'Піролізний'), ('стн', 'Стандартний')], help_text='Вкажіть принцип роботи твердопаливного котла', max_length=3)),
                ('type_of_thrust', models.CharField(blank=True, choices=[('прм', 'Примусова'), ('звч', 'Звичайна')], help_text='Вид тяги', max_length=3)),
                ('fuel_type', models.CharField(blank=True, choices=[('диз', 'Дизель'), ('дер', 'Деревина'), ('кок', 'Кокс'), ('пел', 'Пелети'), ('прг', 'Природній газ'), ('скг', 'Скраплений газ'), ('сол', 'Солома'), ('тор', 'Торфобрикети/Торф'), ('вуг', 'Вугілля'), ('еле', 'Електрика')], help_text='Вид палива', max_length=3)),
                ('heat_carrier_type', models.CharField(blank=True, choices=[('вод', 'Вода'), ('етл', 'Етиленгліколь'), ('прп', 'Пропіленгліколь'), ('сум', 'Суміші')], help_text='Вид теплоносія', max_length=3)),
                ('coefficient_of_performance', models.IntegerField(blank=True, verbose_name='ККД (%)')),
                ('max_fuel_consumption', models.IntegerField(blank=True, verbose_name='Максимальна витрата палива (м3/год)')),
                ('heat_area', models.IntegerField(blank=True, verbose_name='Максимальна площа обігріву (кв м)')),
                ('control_type', models.CharField(blank=True, choices=[('мех', 'Механічне'), ('еле', 'Електронне')], help_text='Тип керування', max_length=3)),
                ('ignition_type', models.CharField(blank=True, choices=[('авт', 'Автоматичний'), ('руч', 'Ручний'), ('пєз', "П'єзоелектричний")], help_text='Тип розпалу', max_length=3)),
                ('heat_range_temperature', models.CharField(blank=True, max_length=200, verbose_name='Діапазон температури опалення (°С)')),
                ('water_range_temperature', models.CharField(blank=True, max_length=200, verbose_name='Діапазон температури водопостачання (°С)')),
                ('heating_time', models.CharField(blank=True, max_length=200, verbose_name='Час нагріву (хв)')),
                ('heating_type', models.CharField(blank=True, choices=[('газ', 'Газовий'), ('ком', 'Комбінований'), ('неп', 'Непрямий'), ('еле', 'Електричний')], help_text='Тип розпалу', max_length=3)),
                ('productivity', models.IntegerField(blank=True, verbose_name='Продуктивність (л/хв)')),
                ('combustion_chamber_type', models.CharField(blank=True, choices=[('від', 'Відчинена'), ('зач', 'Зачинена')], help_text='Тип камери згорання', max_length=3)),
                ('tank_form', models.CharField(blank=True, choices=[('цил', 'Циліндрична'), ('плс', 'Плоска')], help_text='Форма баку', max_length=3)),
                ('heating_element', models.CharField(blank=True, choices=[('трб', 'Трубчастий'), ('спі', 'Спіральний'), ('сух', 'Сухий'), ('мок', 'Мокрий')], help_text='Нагріваючий елемент', max_length=3)),
                ('pressure_in_min', models.IntegerField(blank=True, verbose_name='Тиск на вході (min атм)')),
                ('pressure_in_max', models.IntegerField(blank=True, verbose_name='Тиск на вході (max атм)')),
                ('max_temperature_water_heating', models.IntegerField(blank=True, verbose_name='Максимальна температура нагріва води (°С)')),
                ('power', models.CharField(blank=True, max_length=10, verbose_name='Напруга (В)')),
                ('tank_type', models.CharField(blank=True, choices=[('без', 'Безнапорний'), ('нап', 'Напорний')], help_text='Тип баку', max_length=3)),
                ('heating_power', models.IntegerField(blank=True, verbose_name='Теплова потужність (кВт)')),
                ('electric_power', models.IntegerField(blank=True, verbose_name='Електрична потужність (кВт)')),
                ('price', models.IntegerField(verbose_name='Ціна')),
                ('show_price_in_hrn', models.BooleanField(default=False, verbose_name='Показувати ціну в гривнях')),
                ('manufacturer_country', models.CharField(blank=True, max_length=200, verbose_name='Країна виробник')),
                ('boiler_purpose', models.CharField(blank=True, choices=[('дво', 'Двоконтурний'), ('одн', 'Одноконтурний')], help_text='Призначення котла', max_length=3)),
                ('installation_method', models.CharField(blank=True, choices=[('навіс', 'Навісний'), ('підлог', 'Підлоговий'), ('вертик', 'Вертикальний'), ('гориз', 'Горизонтальний')], help_text='Спосіб установки', max_length=8)),
                ('heat_exchanger_material', models.CharField(blank=True, choices=[('сталь', 'Сталь'), ('нержавіюча', 'Нержавіюча сталь'), ('чавун', 'Чавун'), ('мідь', 'Мідь')], help_text='Спосіб установки', max_length=12)),
                ('boiler_capacity', models.IntegerField(blank=True, verbose_name='Місткість водонагрівача (л)')),
                ('pump_type', models.BooleanField(default=False, verbose_name='Автозапалювання')),
                ('auto_on', models.BooleanField(default=False, verbose_name='Автоматичне ввімкнення')),
                ('auto_off', models.BooleanField(default=False, verbose_name='Автоматичне вимкнення')),
                ('power_indicator', models.BooleanField(default=False, verbose_name='Індикатор ввімкнення')),
                ('accelerated_heating', models.BooleanField(default=False, verbose_name='Прискорений нагрів')),
                ('thermometer', models.BooleanField(default=False, verbose_name='Термометр')),
                ('self_diagnosis', models.BooleanField(default=False, verbose_name='Самодіагностика')),
                ('display', models.BooleanField(default=False, verbose_name='Дисплей')),
                ('remote_controller', models.BooleanField(default=False, verbose_name='Пульт дистанційного управління')),
                ('gas_control', models.BooleanField(default=False, verbose_name='Газ-контроль')),
                ('heating_temperature_limitation', models.BooleanField(default=False, verbose_name='Обмеження температури нагрівання')),
                ('overheating_defence', models.BooleanField(default=False, verbose_name='Захист від перегріву')),
                ('safety_valve', models.BooleanField(default=False, verbose_name='Запобіжний клапан')),
                ('eyeliner', models.CharField(blank=True, choices=[('бокова', 'Бокова'), ('верхня', 'Верхня'), ('нижня', 'Нижня')], help_text='Підводка', max_length=12)),
                ('water_level_defense', models.CharField(blank=True, choices=[('first', '1'), ('second', '2'), ('third', '3'), ('fourth', '4'), ('fifth', '5'), ('sixth', '6'), ('seventh', '7'), ('eight', '8')], help_text='Рівень захисту від води', max_length=12)),
                ('width', models.IntegerField(blank=True, verbose_name='Ширина (мм)')),
                ('height', models.IntegerField(blank=True, verbose_name='Висота (мм)')),
                ('length', models.IntegerField(blank=True, verbose_name='Глибина (мм)')),
                ('weight', models.IntegerField(blank=True, verbose_name='Вага (кг)')),
                ('description', models.TextField(blank=True, help_text='Опис', max_length=10000)),
                ('warranty', models.CharField(blank=True, max_length=10, verbose_name='Гарантія (міс)')),
                ('available', models.BooleanField(default=True, verbose_name='В наявності')),
                ('hide_on_site', models.BooleanField(default=False, verbose_name='Приховувати на сайті')),
                ('discount_price', models.IntegerField(blank=True, verbose_name='Акційна ціна')),
                ('discount_and_date', models.DateField(blank=True, null=True, verbose_name='Кінець акції')),
                ('title_without_serial_number', models.CharField(help_text='Назва без порядкового номеру', max_length=200)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('category', models.ManyToManyField(to='catalog.category')),
                ('subcategory', models.ManyToManyField(to='catalog.subcategory')),
                ('subsubcategory', models.ManyToManyField(to='catalog.subsubcategory')),
            ],
        ),
    ]
