from django.db import models
from cloudinary.models import CloudinaryField

# Create your models here.


class UserData(models.Model):
    category = models.CharField(max_length=50,  null=True, blank=True)
    item_name = models.CharField(max_length=50,  null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    #image = models.ImageField(upload_to='UserImages/')
    image = CloudinaryField('image')


    def __str__(self):
        return (f'{self.item_name}')