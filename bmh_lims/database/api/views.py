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
    queryset = models.Sample.objects.all()

    def get_queryset(self):
        queryset = models.Sample.objects.all().order_by('-created')
        return queryset


class WorkflowSampleViewSet(viewsets.ModelViewSet, UpdateModelMixin):
    """
    ViewSet for retrieving Sample objects from the database
    """
    serializer_class = serializers.WorkflowSampleSerializer
    queryset = models.WorkflowSample.objects.all()

    def get_queryset(self):
        queryset = models.WorkflowSample.objects.all().order_by('-created')
        return queryset


class WorkflowBatchViewSet(viewsets.ModelViewSet, UpdateModelMixin):
    """
    ViewSet for retrieving Sample objects from the database
    """
    serializer_class = serializers.WorkflowBatchSerializer

    def get_queryset(self):
        queryset = models.WorkflowBatch.objects.all().order_by('-created')
        return queryset


class ProjectViewSet(viewsets.ModelViewSet):
    """
    ViewSet for retrieving Sample objects from the database
    """
    serializer_class = serializers.ProjectSerializer

    def get_queryset(self):
        queryset = models.Project.objects.all().order_by('-created')
        return queryset


class LabViewSet(viewsets.ModelViewSet):
    """
    ViewSet for retrieving Sample objects from the database
    """
    serializer_class = serializers.LabSerializer

    def get_queryset(self):
        queryset = models.Lab.objects.all().order_by('-created')
        return queryset
