from rest_framework import viewsets, status
from bmh_lims.database import models
from bmh_lims.database.api import serializers
from django.contrib.auth import get_user_model
from rest_framework.mixins import UpdateModelMixin
from rest_framework.response import Response
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from django.forms.models import model_to_dict

User = get_user_model()


# Keep this here to give React access to the CSRF token
@method_decorator(ensure_csrf_cookie, name='dispatch')
class SampleViewSet(viewsets.ModelViewSet, UpdateModelMixin):
    """
    ViewSet for retrieving Sample objects from the database
    """
    serializer_class = serializers.SampleSerializer
    queryset = models.Sample.objects.all()
    filter_backends = (filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter,)
    filterset_fields = {
        'sample_id': ['iexact'],
        'sample_name': ['iexact', 'icontains'],
        'sample_type': ['iexact'],
        'submitting_lab__lab_name': ['iexact', 'icontains'],
        'submitter_project__project_name': ['iexact', 'icontains'],
        'genus': ['iexact', 'icontains'],
        'species': ['iexact', 'icontains'],
        'strain': ['iexact', 'icontains'],
        'isolate': ['iexact', 'icontains'],
        'comments': ['icontains'],
        'created': ['date__range'],
        'dna_extraction_date': ['range'],
        'culture_date': ['range']
    }

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=isinstance(request.data, list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def get_queryset(self):
        queryset = models.Sample.objects.all().order_by('-created')
        return queryset


class WorkflowSampleBatchCreateViewSet(viewsets.ModelViewSet, UpdateModelMixin):
    """
    ## Overview
    Viewset that allows for a list of samples to be submitted along with a workflow type, this will then
    create a new workflow batch and assign newly created workflow samples to that batch.

    Default status of the automatically created workflow_batch is `IN_PROGRESS`

    ### Expected JSON structure:
    ```json
    {
        "samples": [
            {
                "sample": 10,
                "parents": []
            },
            {
                "sample": 11,
                "parents": []
            }
        ],
        "batch_type": "DNA Extraction"
    }
    ```
    """
    serializer_class = serializers.WorkflowSampleBatchSerializer
    queryset = models.WorkflowSample.objects.all()
    pagination_class = None

    def create(self, request, *args, **kwargs):
        batch_type = request.data['batch_type']
        data = request.data['samples']

        # Create a new workflow batch
        workflow_batch = models.WorkflowBatch.objects.create(
            workflow=models.WorkflowDefinition.objects.get(name=batch_type), status='IN_PROGRESS')

        # Update the workflow_batch value for each sample to be created
        workflow_batch_dict = model_to_dict(workflow_batch)
        for entry in data:
            entry['workflow_batch'] = workflow_batch_dict

        # Pass prepared data to serializer
        serializer = self.get_serializer(data=data, many=isinstance(data, list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        # Setup the response for the user to work with
        response_data = {
            'workflow_samples': serializer.data,
            'workflow_batch_id': workflow_batch.id
        }

        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)

    def get_queryset(self):
        queryset = models.WorkflowSample.objects.all().order_by('-created')
        return queryset


class WorkflowSampleViewSet(viewsets.ModelViewSet, UpdateModelMixin):
    """
    ViewSet for retrieving Sample objects from the database
    """
    serializer_class = serializers.WorkflowSampleSerializer
    queryset = models.WorkflowSample.objects.all()
    filter_backends = (filters.SearchFilter, DjangoFilterBackend,)
    filterset_fields = {
        'sample__sample_id': ['iexact'],
        'sample__sample_name': ['iexact'],
        'workflow_batch__status': ['iexact']
    }

    def get_queryset(self):
        queryset = models.WorkflowSample.objects.all().order_by('-created')
        return queryset


class WorkflowBatchViewSet(viewsets.ModelViewSet, UpdateModelMixin):
    """
    ViewSet for retrieving Sample objects from the database
    """
    serializer_class = serializers.WorkflowBatchSerializer
    filter_backends = (filters.SearchFilter, DjangoFilterBackend,)
    filterset_fields = {
        'status': ['iexact'],
    }

    def get_queryset(self):
        queryset = models.WorkflowBatch.objects.all().order_by('-created')
        return queryset


class WorkflowDefinitionViewSet(viewsets.ModelViewSet, UpdateModelMixin):
    """
    ViewSet for retrieving Sample objects from the database
    """
    serializer_class = serializers.WorkflowDefinitionSerializer
    queryset = models.WorkflowDefinition.objects.all()
    filter_backends = (filters.SearchFilter, DjangoFilterBackend,)
    filterset_fields = {
        'name': ['iexact'],
        'description': ['icontains'],
    }

    def get_queryset(self):
        queryset = models.WorkflowDefinition.objects.all().order_by('-created')
        return queryset


class ProjectViewSet(viewsets.ModelViewSet):
    """
    ViewSet for retrieving Sample objects from the database
    """
    serializer_class = serializers.ProjectSerializer
    filter_backends = (filters.SearchFilter, DjangoFilterBackend,)
    filterset_fields = {
        'project_name': ['iexact'],
        'project_description': ['icontains'],
    }

    def get_queryset(self):
        queryset = models.Project.objects.all().order_by('-created')
        return queryset


class LabViewSet(viewsets.ModelViewSet):
    """
    ViewSet for retrieving Sample objects from the database
    """
    serializer_class = serializers.LabSerializer
    pagination_class = None
    filter_backends = (filters.SearchFilter, DjangoFilterBackend,)
    filterset_fields = {
        'lab_name': ['iexact'],
        'lab_contact': ['iexact'],
        'lab_notes': ['icontains']
    }

    def get_queryset(self):
        queryset = models.Lab.objects.all().order_by('-created')
        return queryset
