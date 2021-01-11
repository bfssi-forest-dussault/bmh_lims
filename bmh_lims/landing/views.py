from django.views.generic import RedirectView
from django.http import HttpResponseRedirect


class IndexView(RedirectView):
    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return HttpResponseRedirect("/lims/")
        return HttpResponseRedirect("/accounts/login/")
