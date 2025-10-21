from django.shortcuts import render
from store.models import Product, Order, OrderItem
from tags.models import TaggedItem


def say_hello(request):

    return render(request, 'hello.html', {"name": 'abhishek'})