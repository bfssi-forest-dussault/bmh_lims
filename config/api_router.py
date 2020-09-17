from django.conf import settings
from rest_framework.routers import DefaultRouter, SimpleRouter

from bmh_lims.users.api.views import UserViewSet
from bmh_lims.database.api.views import SampleViewSet

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()

router.register("users", UserViewSet)
router.register("samples", SampleViewSet, basename='samples')

app_name = "api"
urlpatterns = router.urls
