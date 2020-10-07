import pytest

from bmh_lims.users.models import User
from bmh_lims.users.tests.factories import UserFactory
from bmh_lims.database.models import Sample
from bmh_lims.database.tests.factories import SampleFactory


@pytest.fixture(autouse=True)
def media_storage(settings, tmpdir):
    settings.MEDIA_ROOT = tmpdir.strpath


@pytest.fixture
def user() -> User:
    return UserFactory()


@pytest.fixture
def sample() -> Sample:
    return SampleFactory()
