from django.contrib.auth import get_user_model
from rest_framework import serializers
from bmh_lims.database import models

User = get_user_model()


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class SampleSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = models.Sample
        fields = '__all__'


class WorkflowDefinitionSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = models.WorkflowDefinition
        fields = '__all__'


class WorkflowBatchSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    workflow = WorkflowDefinitionSerializer()

    class Meta:
        model = models.WorkflowBatch
        fields = '__all__'
