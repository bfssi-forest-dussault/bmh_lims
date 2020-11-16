from django.conf import settings
from rest_framework.routers import DefaultRouter, SimpleRouter

from bmh_lims.users.api.views import UserViewSet
from bmh_lims.database.api.views import SampleViewSet, WorkflowBatchViewSet, LabViewSet, ProjectViewSet, \
    WorkflowSampleViewSet, WorkflowDefinitionViewSet, WorkflowSampleBatchCreateViewSet

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()

router.register("users", UserViewSet)
router.register("samples", SampleViewSet, basename='samples')
router.register("workflow_samples", WorkflowSampleViewSet, basename='workflow_samples')
router.register("workflow_batches", WorkflowBatchViewSet, basename='workflow_batches')
router.register("workflow_samplebatch_create", WorkflowSampleBatchCreateViewSet, basename='workflow_samplebatch_create')
router.register("workflow_definitions", WorkflowDefinitionViewSet, basename='workflow_definitions')
router.register("labs", LabViewSet, basename='labs')
router.register("projects", ProjectViewSet, basename='projects')

app_name = "api"
urlpatterns = router.urls
