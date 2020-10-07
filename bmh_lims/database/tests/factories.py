from factory import Faker
from bmh_lims.database import models
from factory.django import DjangoModelFactory


class SampleFactory(DjangoModelFactory):
    sample_id = Faker(provider='ssn')

    class Meta:
        model = models.Sample
        django_get_or_create = ["sample_id"]
