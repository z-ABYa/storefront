from django.shortcuts import render
from django.http import HttpResponse
from django.core.exceptions import ObjectDoesNotExist
from store.models import Customer, OrderItem, Product, Order


def say_hello(request):
    queryset = Customer.objects.filter(first_name__istartswith='h')
    # queryset = OrderItem.objects.values('product_id__title').order_by('product_id__title')

    # order_queryset = OrderItem.objects.values('product_id').distinct()
    # queryset = Product.objects.filter(id__in=order_queryset).order_by('title')

    q = OrderItem.objects.values('order__customer__first_name', 'product__title')
    return render(request, 'hello.html', {'name': 'Abhishek', 'order_items': list(q)})

    q = Customer.objects.only('first_name', 'membership')
    return render(request, 'hello.html', {'name': 'Abhishek', 'customers': list(q)})

