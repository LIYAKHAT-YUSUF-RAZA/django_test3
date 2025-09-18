from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .models import UserData
from .serializers import DataSerializer

# Create your views here.

""" def testing1(request):
    return HttpResponse('testing')
 """
def index(request):
    data = UserData.objects.all()
    return render(request, 'index.html', {
        'displayedData': data
    })



class DataViewSet(viewsets.ModelViewSet):
    queryset = UserData.objects.all()
    serializer_class = DataSerializer