import pytest
from django.test import RequestFactory

from bmh_lims.database.api.views import SampleViewSet
from bmh_lims.database.models import Sample

pytestmark = pytest.mark.django_db


class TestSampleViewSet:
    def test_get_queryset(self, sample: Sample, rf: RequestFactory):
        view = SampleViewSet()
        request = rf.get("/fake-url/")
        request.sample = sample
        view.request = request
        assert sample in view.get_queryset()
