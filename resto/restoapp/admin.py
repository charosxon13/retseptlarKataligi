from django.contrib import admin

from django.contrib import admin
from .models import Recipe,Category,Ingredient

admin.site.register(Recipe)

admin.site.register(Ingredient)
admin.site.register(Category)

