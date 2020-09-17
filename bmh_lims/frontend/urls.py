from django.views.generic import TemplateView
from django.urls import re_path

app_name = "frontend"

urlpatterns = [
    re_path('^.*$', TemplateView.as_view(template_name='frontend/index.html'))  # allow any URL after frontend
]
