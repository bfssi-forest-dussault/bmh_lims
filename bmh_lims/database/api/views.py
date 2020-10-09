from rest_framework import viewsets, status
from bmh_lims.database import models
from bmh_lims.database.api import serializers
from django.contrib.auth import get_user_model
from rest_framework.mixins import UpdateModelMixin
from rest_framework.response import Response
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie

User = get_user_model()


# Create your views here.

# Keep this here to give React access to the CSRF token
@method_decorator(ensure_csrf_cookie, name='dispatch')
class SampleViewSet(viewsets.ModelViewSet, UpdateModelMixin):
    """
    ViewSet for retrieving Sample objects from the database
    """
    serializer_class = serializers.SampleSerializer
    queryset = models.Sample.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=isinstance(request.data, list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

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
