# Generated by Django 4.0.6 on 2023-01-14 11:31

import catalog.models
from django.db import migrations, models
import django.db.models.deletion
import tinymce.models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0041_banner'),
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100, verbose_name='ПІБ')),
                ('email', models.EmailField(blank=True, default='', max_length=254)),
                ('phone_number', models.CharField(max_length=50, verbose_name='Телефон')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('shipping_address', models.CharField(blank=True, default='', max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('number', models.IntegerField(blank=True, default=catalog.models.Order.default_order_number, null=True)),
                ('name', models.CharField(max_length=100, verbose_name='ПІБ')),
                ('email', models.EmailField(blank=True, default='', max_length=254)),
                ('phone_number', models.CharField(max_length=50, verbose_name='Телефон')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('shipping_address', models.CharField(blank=True, default='', max_length=200)),
                ('description', tinymce.models.HTMLField(blank=True, max_length=999999, null=True, verbose_name='Деталі')),
                ('customer', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='catalog.customer')),
            ],
        ),
    ]
