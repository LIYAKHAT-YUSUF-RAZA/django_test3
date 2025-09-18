from django.urls import path,include
from rest_framework import routers
from .views import DataViewSet
from . import views

router = routers.DefaultRouter()
router.register(r'data', DataViewSet)

""" urlpatterns = [
    path('testing1/', views.testing1, name='testing1'),
    path('index/', views.index, name='index')
] """

urlpatterns = [
    path('api/', include(router.urls)),
    path('index/', views.index, name='index')
]