import pytest
from django.urls import resolve, reverse

pytestmark = pytest.mark.django_db


def test_sample_list():
    assert reverse("api:samples-list") == "/api/samples/"
    assert resolve("/api/samples/").view_name == "api:samples-list"


def test_workflow_sample_list():
    assert reverse("api:workflow_samples-list") == "/api/workflow_samples/"
    assert resolve("/api/workflow_samples/").view_name == "api:workflow_samples-list"


def test_workflow_batch_list():
    assert reverse("api:workflow_batches-list") == "/api/workflow_batches/"
    assert resolve("/api/workflow_batches/").view_name == "api:workflow_batches-list"


def test_labs_list():
    assert reverse("api:labs-list") == "/api/labs/"
    assert resolve("/api/labs/").view_name == "api:labs-list"


def test_projects_list():
    assert reverse("api:projects-list") == "/api/projects/"
    assert resolve("/api/projects/").view_name == "api:projects-list"
