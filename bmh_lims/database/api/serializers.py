from django.contrib.auth import get_user_model
from rest_framework import serializers

from bmh_lims.database import models

User = get_user_model()


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class WorkflowDefinitionSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = models.WorkflowDefinition
        fields = '__all__'


class WorkflowBatchSerializer(serializers.ModelSerializer):
    workflow = serializers.PrimaryKeyRelatedField(queryset=models.WorkflowDefinition.objects.all())

    class Meta:
        model = models.WorkflowBatch
        fields = ['id', 'workflow', 'status']
        extra_kwargs = {
            "id": {
                "read_only": False,
                "required": False,
            }
        }


class LabSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = models.Lab
        fields = '__all__'


class ProjectSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = models.Project
        fields = '__all__'


class SampleSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    # submitting_lab = LabSerializer()  # TODO: Bug, cannot display for some reason
    submitter_project = ProjectSerializer()

    class Meta:
        model = models.Sample
        fields = [
            'id',
            'sample_id',
            'sample_name',
            'well',
            # 'submitting_lab',
            'sample_type',
            'sample_volume_in_ul',
            'requested_services',
            'submitter_project',
            'strain',
            'isolate',
            'genus',
            'species',
            'subspecies_subtype_lineage',
            'approx_genome_size_in_bp',
            'comments',
            'culture_date',
            'culture_conditions',
            'dna_extraction_date',
            'dna_extraction_method',
            'qubit_concentration_in_ng_ul',
        ]


class WorkflowSampleSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    workflow_batch = WorkflowBatchSerializer(read_only=True)
    sample = serializers.PrimaryKeyRelatedField(queryset=models.Sample.objects.all())

    class Meta:
        model = models.WorkflowSample
        fields = '__all__'


class WorkflowSampleBatchSerializer(serializers.Serializer):
    """
    Serializer for the workflow_samplebatch_create endpoint which allows for a workflow batch to be automatically
    created upon submission of a list of samples assigned to a workflow
    """
    id = serializers.ReadOnlyField()
    workflow_batch = WorkflowBatchSerializer()
    sample = serializers.PrimaryKeyRelatedField(queryset=models.Sample.objects.all())

    class Meta:
        model = models.WorkflowSample
        fields = '__all__'

    def create(self, validated_data):
        """
        This method takes in validated_data sent over from WorkflowSampleBatchCreateViewSet.create() and then
        creates a WorkflowSample object using that information

        :param validated_data: Workflow Sample to create
        :return: created model instance
        """
        workflow_batch = models.WorkflowBatch.objects.get(id=validated_data['workflow_batch']['id'])
        workflow_sample = models.WorkflowSample.objects.create(sample=validated_data['sample'],
                                                               workflow_batch=workflow_batch)
        return workflow_sample

    def update(self, instance, validated_data):
        # TODO
        pass
