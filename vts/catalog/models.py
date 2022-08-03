from django.db import models

# Create your models here.

class Category(models.Model):
    name = models.CharField('Назва', max_length=200, help_text='Вкажіть назву категорії')
    image = models.ImageField(upload_to='catalog/static/images/categories', blank = True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

class SubCategory(models.Model):
    name = models.CharField('Назва', max_length=200, help_text='Вкажіть назву субкатегорії')
    image = models.ImageField(upload_to='catalog/static/images/subcategories', blank = True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

class SubSubCategory(models.Model):
    name = models.CharField('Назва', max_length=200, help_text='Вкажіть назву суб-субкатегорії')
    image = models.ImageField(upload_to='catalog/static/images/subcategories', blank = True)
    subcategory = models.ForeignKey(SubCategory, on_delete=models.SET_NULL, null=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name