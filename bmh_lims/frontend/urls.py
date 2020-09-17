from django.views.generic import TemplateView
from django.urls import re_path
from . import views

app_name = "frontend"

urlpatterns = [
    re_path('^.*$', views.IndexView.as_view(), name="index")
    # allow any URL after frontend
]
