from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class FrontendConfig(AppConfig):
    name = 'bmh_lims.frontend'
    verbose_name = _("Frontend")
