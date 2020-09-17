from rest_framework import viewsets, filters
from bmh_lims.database import models
from bmh_lims.database.api import serializers
from django.contrib.auth import get_user_model
from rest_framework.mixins import UpdateModelMixin

User = get_user_model()


# Create your views here.
class SampleViewSet(viewsets.ModelViewSet, UpdateModelMixin):
    """
    ViewSet for retrieving Sample objects from the database
    """
    serializer_class = serializers.SampleSerializer

    def get_queryset(self):
        query_params = self.request.query_params
        queryset = models.Sample.objects.all().order_by('-created')
        return queryset
