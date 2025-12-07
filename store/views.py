from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Product, Collection
from .serializers import ProductSerializer, CollectionSerializer

@api_view()
def product_list(request):
    queryset = Product.objects.all()
    serializer = ProductSerializer(queryset, many=True)
    return Response(serializer.data)

@api_view()
def product_details(request, id):
    # Longer method*
    # try:
    #     product = Product.objects.get(pk=id)
    #     serializer = ProductSerializer(product)
    #     return Response(serializer.data)
    # except Product.DoesNotExist:
    #     return Response(status=status.HTTP_404_NOT_FOUND)

    # Using django shortcuts*
    product = get_object_or_404(Product, pk=id)
    serializer = ProductSerializer(product)
    return Response(serializer.data)

@api_view()
def collection_details(request, id):
    collection = get_object_or_404(Collection, pk=id)
    serializer = CollectionSerializer(collection)
    return Response(serializer.data)
