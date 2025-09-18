from rest_framework import serializers
from .models import UserData

class DataSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)  # ensures full URL

    class Meta:
        model = UserData
        fields = '__all__'
