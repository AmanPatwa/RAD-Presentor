from django.db import models

class presentor(models.Model):
    name = models.CharField(max_length=75)
    email = models.EmailField(max_length=75)