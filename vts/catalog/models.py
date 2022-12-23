from distutils.command.upload import upload
from locale import currency
from django.db import models
import uuid
from tinymce.models import HTMLField
from django.urls import reverse

# Create your models here.

class Currency(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    currency_name = models.CharField('Назва курсу', max_length=200, help_text='Наприклад: Євро - Гривня')
    currency_value = models.DecimalField('Значення', max_digits=8, decimal_places=2, null=True, blank=True)

    class Meta:
        ordering = ['currency_name']

    def __str__(self):
        return self.currency_name

class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField('Назва', max_length=200, help_text='Вкажіть назву категорії')
    image = models.ImageField(upload_to='categories', blank = True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

class SubCategory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField('Назва', max_length=200, help_text='Вкажіть назву субкатегорії')
    image = models.ImageField(upload_to='subcategories', blank = True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

class SubSubCategory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
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
        ('накопичувальний', 'Накопичувальний'),
        ('проточний', 'Проточний'),
    )
    BOILER_TYPES = (
        ('газовий', 'Газовий'),
        ('рідкопаливний', 'Рідкопаливний'),
        ('комбінований', 'Комбінований'),
        ('твердопаливний', 'Твердопаливний'),
        ('електричний', 'Електричний')
    )
    WORK_TYPES_OF_GAS_BOILER = (
        ('стандартний', 'Стандартний'),
        ('конденсаційний', 'Конденсаційний')
    )
    WORK_TYPES_OF_SOLID_FUEL_BOILER = (
        ('довготривалого горіння', 'Довготривалого горіння'),
        ('пелетний', 'Пелетний'),
        ('піролізний', 'Піролізний'),
        ('стандартний', 'Стандартний')
    )
    TYPES_OF_THRUST = (
        ('примусова', 'Примусова'),
        ('звичайна', 'Звичайна')
    )
    FUEL_TYPES = (
        ('дизель', 'Дизель'),
        ('деревина', 'Деревина'),
        ('кокс', 'Кокс'),
        ('пелети', 'Пелети'),
        ('природній газ', 'Природній газ'),
        ('скраплений газ', 'Скраплений газ'),
        ('солома', 'Солома'),
        ('торфобрикети', 'Торфобрикети/Торф'),
        ('вугілля', 'Вугілля'),
        ('електрика', 'Електрика')
    )
    HEAT_CARRIER_TYPES = (
        ('вода', 'Вода'),
        ('етиленгліколь', 'Етиленгліколь'),
        ('пропіленгліколь', 'Пропіленгліколь'),
        ('суміші', 'Суміші')
    )
    CONTROL_TYPES = (
        ('механічне', 'Механічне'),
        ('електронне', 'Електронне')
    )
    IGNITION_TYPES = (
        ('автоматичний', 'Автоматичний'),
        ('ручний', 'Ручний'),
        ('п\'єзоелектричний', 'П\'єзоелектричний')
    )
    HEATING_TYPES = (
        ('газовий', 'Газовий'),
        ('комбінований', 'Комбінований'),
        ('непрямий', 'Непрямий'),
        ('електричний', 'Електричний')
    )
    COMBUSTION_CHAMBER_TYPES = (
        ('відчинена', 'Відчинена'),
        ('зачинена', 'Зачинена')
    )
    TANK_FORMS = (
        ('циліндрична', 'Циліндрична'),
        ('плоска', 'Плоска')
    )
    HEATING_ELEMENTS = (
        ('трубчастий', 'Трубчастий'),
        ('спіральний', 'Спіральний'),
        ('сухий', 'Сухий'),
        ('мокрий', 'Мокрий')
    )
    TANK_TYPES = (
        ('безнапорний', 'Безнапорний'),
        ('напорний', 'Напорний')
    )
    BOILER_PURPOSES = [
        ('двоконтурний', 'Двоконтурний'),
        ('одноконтурний', 'Одноконтурний')
    ]
    INSTALLATION_METHODS = (
        ('навісний', 'Навісний'),
        ('підлоговий', 'Підлоговий'),
        ('вертикальний', 'Вертикальний'),
        ('горизонтальний', 'Горизонтальний')
    )
    HEAT_EXCHANGER_MATERIALS = (
        ('сталь', 'Сталь'),
        ('нержавіюча сталь', 'Нержавіюча сталь'),
        ('чавун', 'Чавун'),
        ('мідь', 'Мідь')
    )
    PUMP_TYPES = (
        ('глибинний', 'Глибинний'),
        ('дренажний', 'Дренажний'),
        ('поверхневий', 'Поверхневий'),
        ('занурювальний', 'Занурювальний'),
        ('каналізаційний', 'Каналізаційний'),
        ('циркуляційний', 'Циркуляційний'),
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

    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    title = models.CharField('Назва', max_length=300, help_text='Вкажіть назву продукту')
    category = models.ManyToManyField(Category)
    subcategory = models.ManyToManyField(SubCategory)
    subsubcategory = models.ManyToManyField(SubSubCategory)
    image = models.ImageField(upload_to='products', blank=False)
    article = models.CharField('Артикул', max_length=200, help_text='Вкажіть артикул продукту', blank=True)
    manufacturer = models.CharField('Виробник', max_length=200, help_text='Вкажіть виробника', blank=True)
    water_heater_type = models.CharField(
        'Тип водонагрівача',
        max_length=100,
        choices=HEATER_TYPES,
        blank=True,
    )
    boiler_type = models.CharField(
        'Тип котла',
        max_length=100,
        choices=BOILER_TYPES,
        blank=True,
    )
    work_type_of_gas_boiler = models.CharField(
        'Принцип роботи газового котла',
        max_length=100,
        choices=WORK_TYPES_OF_GAS_BOILER,
        blank=True,
    )
    work_type_of_solid_fuel_boiler = models.CharField(
        'Принцип роботи твердопаливного котла',
        max_length=100,
        choices=WORK_TYPES_OF_SOLID_FUEL_BOILER,
        blank=True,
    )
    type_of_thrust = models.CharField(
        'Вид тяги',
        max_length=100,
        choices=TYPES_OF_THRUST,
        blank=True,
    )
    fuel_type = models.CharField(
        'Вид палива',
        max_length=100,
        choices=FUEL_TYPES,
        blank=True,
    )
    heat_carrier_type = models.CharField(
        'Вид теплоносія',
        max_length=100,
        choices=HEAT_CARRIER_TYPES,
        blank=True,
    )
    coefficient_of_performance = models.CharField('ККД (%)', max_length=200, null=True, blank=True)
    max_fuel_consumption = models.CharField('Максимальна витрата палива (м3/год)', max_length=200, null=True, blank=True)
    heat_area = models.CharField('Максимальна площа обігріву (кв м)', max_length=200, null=True, blank=True)
    control_type = models.CharField(
        'Тип керування',
        max_length=100,
        choices=CONTROL_TYPES,
        blank=True,
    )
    ignition_type = models.CharField(
        'Тип розпалу',
        max_length=100,
        choices=IGNITION_TYPES,
        blank=True,
    )
    heat_range_temperature = models.CharField('Діапазон температури опалення (°С)', max_length=200, blank=True)
    water_range_temperature = models.CharField('Діапазон температури водопостачання (°С)', max_length=200, blank=True)
    heating_time = models.CharField('Час нагріву (хв)', max_length=200, blank=True)
    heating_type = models.CharField(
        'Тип опалення',
        max_length=100,
        choices=HEATING_TYPES,
        blank=True,
    )
    productivity = models.CharField('Продуктивність (л/хв)', max_length=200, null=True, blank=True)
    combustion_chamber_type = models.CharField(
        'Тип камери згорання',
        max_length=100,
        choices=COMBUSTION_CHAMBER_TYPES,
        blank=True,
    )
    tank_form = models.CharField(
        'Форма баку',
        max_length=100,
        choices=TANK_FORMS,
        blank=True,
    )
    heating_element = models.CharField(
        'Нагріваючий елемент',
        max_length=100,
        choices=HEATING_ELEMENTS,
        blank=True,
    )
    pressure_in_min = models.CharField('Тиск на вході (min атм)', max_length=200, null=True, blank=True)
    pressure_in_max = models.CharField('Тиск на вході (max атм)', max_length=200, null=True, blank=True)
    max_temperature_water_heating = models.CharField('Максимальна температура нагріва води (°С)', max_length=200, null=True, blank=True)
    power = models.CharField('Напруга (В)', max_length=10, blank=True)
    tank_type = models.CharField(
        'Тип баку',
        max_length=100,
        choices=TANK_TYPES,
        blank=True,
    )
    heating_power = models.CharField('Теплова потужність (кВт)', max_length=200, null=True, blank=True)
    electric_power = models.CharField('Електрична потужність (кВт)', max_length=200, null=True, blank=True)
    price = models.DecimalField('Ціна', blank=False, max_digits=8, decimal_places=2)
    show_price_in_hrn = models.BooleanField('Показувати ціну в гривнях', default=False)
    manufacturer_country = models.CharField('Країна виробник', max_length=200, blank=True)
    boiler_purpose = models.CharField(
        'Призначення котла',
        max_length=100,
        choices=BOILER_PURPOSES,
        blank=True,
    )
    installation_method = models.CharField(
        'Спосіб установки',
        max_length=100,
        choices=INSTALLATION_METHODS,
        blank=True,
    )
    heat_exchanger_material = models.CharField(
        'Матеріал теплообмінника',
        max_length=100,
        choices=HEAT_EXCHANGER_MATERIALS,
        blank=True,
    )
    boiler_capacity = models.CharField('Місткість водонагрівача (л)', max_length=200, null=True, blank=True)
    pump_type = models.CharField(
        'Тип насосу',
        max_length=100,
        choices=PUMP_TYPES,
        blank=True,
    )
    auto_ignition = models.BooleanField('Автозапалювання', default=False)
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
        'Підводка',
        max_length=100,
        choices=EYELINER_TYPES,
        blank=True,
    )
    water_level_defense = models.CharField(
        'Рівень захисту від води',
        max_length=100,
        choices=WATER_LEVEL_DEFENSE_TYPES,
        blank=True,
    )
    width = models.CharField('Ширина (мм)', max_length=10, null=True, blank=True)
    height = models.CharField('Висота (мм)', max_length=10, null=True, blank=True)
    length = models.CharField('Глибина (мм)', max_length=10, null=True, blank=True)
    weight = models.CharField('Вага (кг)', max_length=10, null=True, blank=True)
    description = HTMLField('Опис', max_length=999999, blank=True, null=True)
    warranty = models.CharField('Гарантія (міс)', max_length=10, blank=True)
    available = models.BooleanField('В наявності', default=True)
    hide_on_site = models.BooleanField('Приховувати на сайті', default=False)
    discount_price = models.DecimalField('Акційна ціна', max_digits=8, decimal_places=2, null=True, blank=True)
    discount_end_date = models.DateField('Кінець акції', null=True, blank=True)
    title_without_serial_number = models.CharField('Назва без серійного номеру', max_length=300,)
    created_at = models.DateTimeField('Дата створення')
    currency = models.ForeignKey(Currency, on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        ordering = ['created_at']

    indexes = [
        models.Index(fields=['title',])
    ]

    def get_actual_price(self):
        if (self.show_price_in_hrn):
            return f'{self.price:,}'
        else:
            rounded_price = round(self.price * self.currency.currency_value, 2)
            return f'{rounded_price:,}'

    def get_actual_discount_price(self):
        if self.discount_price:
            if (self.show_price_in_hrn):
                return f'{self.discount_price:,}'
            else:
                rounded_price = round(self.discount_price * self.currency.currency_value, 2)
                return f'{rounded_price:,}'

    def get_discount_in_percents(self):
        discount_percents = round(100 - (self.discount_price / self.price) * 100)
        if (discount_percents > 0):
            return f'-{discount_percents}%'
        return ''

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('product-detail', args=[str(self.id)])

    def first_image(self):
        if self.images:
            return self.images.first()
        else:
            return None

    def images_list(self):
        return self.images.all()

    def get_fields(self):
        not_allowed_keys = [
            'id',
            'Назва',
            'image',
            'Артикул',
            'Виробник',
            'Ціна',
            'Показувати ціну в гривнях',
            'Опис',
            'В наявності',
            'Приховувати на сайті',
            'Акційна ціна',
            'Кінець акції',
            'Назва без серійного номеру',
            'Дата створення',
            'currency'
        ]
        return [(field.verbose_name, field.value_from_object(self)) for field in self.__class__._meta.fields if field.verbose_name not in not_allowed_keys]

class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name="images", on_delete=models.SET_NULL, null=True, blank=True)
    image_url = models.ImageField(upload_to="products")

    # def __str__(self):
    #     return self.image_url

class Banner(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    brief_text = models.CharField('Опис', max_length=200)

    def __str__(self):
        return self.brief_text

class Customer(models.Model):
    name = models.CharField('ПІБ', max_length=100)
    email = models.EmailField(max_length = 254, default='', blank=True)
    phone_number = models.CharField('Телефон', max_length=50)
    created_at = models.DateTimeField(auto_now_add = True)
    shipping_address = models.CharField(max_length=200, default='', blank=True)
