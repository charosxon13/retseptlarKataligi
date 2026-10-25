from django.shortcuts import render, get_object_or_404
from .models import Recipe, Category

# Bosh sahifa uchun kod
def index(request):
    recipes = Recipe.objects.all().order_by('-created_at')
    categories = Category.objects.all()
    context = {
        'recipes': recipes,
        'categories': categories
    }
    return render(request, 'index.html', context)

# Batafsil sahifa uchun kod
def detail(request, pk):
    recipe = get_object_or_404(Recipe, pk=pk)
    return render(request, 'detail.html', {'recipe': recipe})
