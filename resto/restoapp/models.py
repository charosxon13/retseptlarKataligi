from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, verbose_name="Kategoriya nomi")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Kategoriya"
        verbose_name_plural = "Kategoriyalar"


class Ingredient(models.Model):
    name = models.CharField(max_length=100, verbose_name="Masalliq nomi")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Masalliq"
        verbose_name_plural = "Masalliqlar"


class Recipe(models.Model):
    title = models.CharField(max_length=200, verbose_name="Taom nomi")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="recipes", verbose_name="Taom turi")

    ingredients = models.ManyToManyField(Ingredient, related_name="recipes", verbose_name="Masalliqlar")
    description = models.TextField(verbose_name="Taom haqida qisqacha")
    instructions = models.TextField(verbose_name="Tayyorlash bosqichlari")
    image = models.ImageField(upload_to='recipes/', verbose_name="Taom rasmi", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Retsept"
        verbose_name_plural = "Retseptlar"
