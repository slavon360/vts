from pyexpat import model
from django.db import models

# Create your models here.

class Category(models.Model):
    name = models.CharField('Назва', max_length=200, help_text='Вкажіть назву категорії')
    image = models.ImageField(upload_to='categories', blank = True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

class SubCategory(models.Model):
    name = models.CharField('Назва', max_length=200, help_text='Вкажіть назву субкатегорії')
    image = models.ImageField(upload_to='subcategories', blank = True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

class SubSubCategory(models.Model):
    name = models.CharField('Назва', max_length=200, help_text='Вкажіть назву суб-субкатегорії')
    image = models.ImageField(upload_to='subcategories', blank = True)
    subcategory = models.ManyToManyField(SubCategory)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

class Phone(models.Model):
    phone_number = models.CharField('Телефон', max_length=20, help_text='Номер телефону')
    image = models.ImageField(upload_to='about', blank = True)

    def __str__(self):
        return self.phone_number

class Product(models.Model):
    HEATER_TYPES = (
        ('нак', 'Накопичувальний'),
        ('прт', 'Проточний'),
    )
    BOILER_TYPES = (
        ('газ', 'Газовий'),
        ('рід', 'Рідкопаливний'),
        ('ком', 'Комбінований'),
        ('твр', 'Твердопаливний'),
        ('ел', 'Електричний')
    )
    WORK_TYPES_OF_GAS_BOILER = (
        ('стн', 'Стандартний'),
        ('кнд', 'Конденсаційний')
    )
    WORK_TYPES_OF_SOLID_FUEL_BOILER = (
        ('дтг', 'Довготривалого горіння'),
        ('пел', 'Пелетний'),
        ('пір', 'Піролізний'),
        ('стн', 'Стандартний')
    )
    TYPES_OF_THRUST = (
        ('прм', 'Примусова'),
        ('звч', 'Звичайна')
    )
    FUEL_TYPES = (
        ('диз', 'Дизель'),
        ('дер', 'Деревина'),
        ('кок', 'Кокс'),
        ('пел', 'Пелети'),
        ('прг', 'Природній газ'),
        ('скг', 'Скраплений газ'),
        ('сол', 'Солома'),
        ('тор', 'Торфобрикети/Торф'),
        ('вуг', 'Вугілля'),
        ('еле', 'Електрика')
    )
    HEAT_CARRIER_TYPES = (
        ('вод', 'Вода'),
        ('етл', 'Етиленгліколь'),
        ('прп', 'Пропіленгліколь'),
        ('сум', 'Суміші')
    )
    CONTROL_TYPES = (
        ('мех', 'Механічне'),
        ('еле', 'Електронне')
    )
    IGNITION_TYPES = (
        ('авт', 'Автоматичний'),
        ('руч', 'Ручний'),
        ('пєз', 'П\'єзоелектричний')
    )
    HEATING_TYPES = (
        ('газ', 'Газовий'),
        ('ком', 'Комбінований'),
        ('неп', 'Непрямий'),
        ('еле', 'Електричний')
    )
    COMBUSTION_CHAMBER_TYPES = (
        ('від', 'Відчинена'),
        ('зач', 'Зачинена')
    )
    TANK_FORMS = (
        ('цил', 'Циліндрична'),
        ('плс', 'Плоска')
    )
    HEATING_ELEMENTS = (
        ('трб', 'Трубчастий'),
        ('спі', 'Спіральний'),
        ('сух', 'Сухий'),
        ('мок', 'Мокрий')
    )
    TANK_TYPES = (
        ('без', 'Безнапорний'),
        ('нап', 'Напорний')
    )
    BOILER_PURPOSES = (
        ('дво', 'Двоконтурний'),
        ('одн', 'Одноконтурний')
    )
    INSTALLATION_METHODS = (
        ('навіс', 'Навісний'),
        ('підлог', 'Підлоговий'),
        ('вертик', 'Вертикальний'),
        ('гориз', 'Горизонтальний')
    )
    HEAT_EXCHANGER_MATERIALS = (
        ('сталь', 'Сталь'),
        ('нержавіюча', 'Нержавіюча сталь'),
        ('чавун', 'Чавун'),
        ('мідь', 'Мідь')
    )
    PUMP_TYPES = (
        ('глибинний', 'Глибинний'),
        ('дренажний', 'Дренажний'),
        ('поверхневий', 'Поверхневий'),
        ('занур', 'Занурювальний'),
        ('каналіз', 'Каналізаційний'),
        ('циркул', 'Циркуляційний'),
    )
    EYELINER_TYPES = (
        ('бокова', 'Бокова'),
        ('верхня', 'Верхня'),
        ('нижня', 'Нижня')
    )
    WATER_LEVEL_DEFENSE_TYPES = (
        ('first', '1'),
        ('second', '2'),
        ('third', '3'),
        ('fourth', '4'),
        ('fifth', '5'),
        ('sixth', '6'),
        ('seventh', '7'),
        ('eight', '8'),
    )

    title = models.CharField('Назва', max_length=200, help_text='Вкажіть назву продукту')
    category = models.ManyToManyField(Category)
    subcategory = models.ManyToManyField(SubCategory)
    subsubcategory = models.ManyToManyField(SubSubCategory)
    image = models.ImageField(upload_to='products', blank=False)
    article = models.CharField('Артикул', max_length=200, help_text='Вкажіть артикул продукту', blank=True)
    manufacturer = models.CharField('Виробник', max_length=200, help_text='Вкажіть виробника', blank=True)
    water_heater_type = models.CharField(
        max_length=3,
        choices=HEATER_TYPES,
        blank=True,
        # default='m',
        help_text='Вкажіть тип водонагрівача'
    )
    boiler_type = models.CharField(
        max_length=3,
        choices=BOILER_TYPES,
        blank=True,
        # default='m',
        help_text='Вкажіть тип котла'
    )
    work_type_of_gas_boiler = models.CharField(
        max_length=3,
        choices=WORK_TYPES_OF_GAS_BOILER,
        blank=True,
        # default='m',
        help_text='Вкажіть принцип роботи газового котла'
    )
    work_type_of_solid_fuel_boiler = models.CharField(
        max_length=3,
        choices=WORK_TYPES_OF_SOLID_FUEL_BOILER,
        blank=True,
        # default='m',
        help_text='Вкажіть принцип роботи твердопаливного котла'
    )
    type_of_thrust = models.CharField(
        max_length=3,
        choices=TYPES_OF_THRUST,
        blank=True,
        # default='m',
        help_text='Вид тяги'
    )
    fuel_type = models.CharField(
        max_length=3,
        choices=FUEL_TYPES,
        blank=True,
        # default='m',
        help_text='Вид палива'
    )
    heat_carrier_type = models.CharField(
        max_length=3,
        choices=HEAT_CARRIER_TYPES,
        blank=True,
        # default='m',
        help_text='Вид теплоносія'
    )
    coefficient_of_performance = models.IntegerField('ККД (%)', blank=True)
    max_fuel_consumption = models.IntegerField('Максимальна витрата палива (м3/год)', blank=True)
    heat_area = models.IntegerField('Максимальна площа обігріву (кв м)', blank=True)
    control_type = models.CharField(
        max_length=3,
        choices=CONTROL_TYPES,
        blank=True,
        # default='m',
        help_text='Тип керування'
    )
    ignition_type = models.CharField(
        max_length=3,
        choices=IGNITION_TYPES,
        blank=True,
        # default='m',
        help_text='Тип розпалу'
    )
    heat_range_temperature = models.CharField('Діапазон температури опалення (°С)', max_length=200, blank=True)
    water_range_temperature = models.CharField('Діапазон температури водопостачання (°С)', max_length=200, blank=True)
    heating_time = models.CharField('Час нагріву (хв)', max_length=200, blank=True)
    heating_type = models.CharField(
        max_length=3,
        choices=HEATING_TYPES,
        blank=True,
        # default='m',
        help_text='Тип розпалу'
    )
    productivity = models.IntegerField('Продуктивність (л/хв)', blank=True)
    combustion_chamber_type = models.CharField(
        max_length=3,
        choices=COMBUSTION_CHAMBER_TYPES,
        blank=True,
        # default='m',
        help_text='Тип камери згорання'
    )
    tank_form = models.CharField(
        max_length=3,
        choices=TANK_FORMS,
        blank=True,
        # default='m',
        help_text='Форма баку'
    )
    heating_element = models.CharField(
        max_length=3,
        choices=HEATING_ELEMENTS,
        blank=True,
        # default='m',
        help_text='Нагріваючий елемент'
    )
    pressure_in_min = models.IntegerField('Тиск на вході (min атм)', blank=True)
    pressure_in_max = models.IntegerField('Тиск на вході (max атм)', blank=True)
    max_temperature_water_heating = models.IntegerField('Максимальна температура нагріва води (°С)', blank=True)
    power = models.CharField('Напруга (В)', max_length=10, blank=True)
    tank_type = models.CharField(
        max_length=3,
        choices=TANK_TYPES,
        blank=True,
        # default='m',
        help_text='Тип баку'
    )
    heating_power = models.IntegerField('Теплова потужність (кВт)', blank=True)
    electric_power = models.IntegerField('Електрична потужність (кВт)', blank=True)
    price = models.IntegerField('Ціна', blank=False)
    show_price_in_hrn = models.BooleanField('Показувати ціну в гривнях', default=False)
    manufacturer_country = models.CharField('Країна виробник', max_length=200, blank=True)
    boiler_purpose = models.CharField(
        max_length=3,
        choices=BOILER_PURPOSES,
        blank=True,
        # default='m',
        help_text='Призначення котла'
    )
    installation_method = models.CharField(
        max_length=8,
        choices=INSTALLATION_METHODS,
        blank=True,
        # default='m',
        help_text='Спосіб установки'
    )
    heat_exchanger_material = models.CharField(
        max_length=12,
        choices=HEAT_EXCHANGER_MATERIALS,
        blank=True,
        # default='m',
        help_text='Спосіб установки'
    )
    boiler_capacity = models.IntegerField('Місткість водонагрівача (л)', blank=True)
    pump_type = models.CharField(
        max_length=12,
        choices=PUMP_TYPES,
        blank=True,
        # default='m',
        help_text='Тип насосу'
    )
    pump_type = models.BooleanField('Автозапалювання', default=False)
    auto_on = models.BooleanField('Автоматичне ввімкнення', default=False)
    auto_off = models.BooleanField('Автоматичне вимкнення', default=False)
    power_indicator = models.BooleanField('Індикатор ввімкнення', default=False)
    accelerated_heating = models.BooleanField('Прискорений нагрів', default=False)
    thermometer = models.BooleanField('Термометр', default=False)
    self_diagnosis = models.BooleanField('Самодіагностика', default=False)
    display = models.BooleanField('Дисплей', default=False)
    remote_controller = models.BooleanField('Пульт дистанційного управління', default=False)
    gas_control = models.BooleanField('Газ-контроль', default=False)
    heating_temperature_limitation = models.BooleanField('Обмеження температури нагрівання', default=False)
    overheating_defence = models.BooleanField('Захист від перегріву', default=False)
    safety_valve = models.BooleanField('Запобіжний клапан', default=False)
    eyeliner = models.CharField(
        max_length=12,
        choices=EYELINER_TYPES,
        blank=True,
        # default='m',
        help_text='Підводка'
    )
    water_level_defense = models.CharField(
        max_length=12,
        choices=WATER_LEVEL_DEFENSE_TYPES,
        blank=True,
        # default='m',
        help_text='Рівень захисту від води'
    )
    width = models.IntegerField('Ширина (мм)', blank=True)
    height = models.IntegerField('Висота (мм)', blank=True)
    length = models.IntegerField('Глибина (мм)', blank=True)
    weight = models.IntegerField('Вага (кг)', blank=True)
    description = models.TextField(max_length=10000, help_text='Опис', blank=True)
    warranty = models.CharField('Гарантія (міс)', max_length=10, blank=True)
    available = models.BooleanField('В наявності', default=True)
    hide_on_site = models.BooleanField('Приховувати на сайті', default=False)
    discount_price = models.IntegerField('Акційна ціна', blank=True)
    discount_and_date = models.DateField('Кінець акції', null=True, blank=True)
    title_without_serial_number = models.CharField(max_length=200, help_text='Назва без порядкового номеру')
    created_at = models.DateTimeField(auto_now_add=True)