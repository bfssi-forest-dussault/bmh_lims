from django.contrib import admin
from bmh_lims.database import models
from simple_history.admin import SimpleHistoryAdmin

# Register your models here.
admin.site.register(models.Sample, SimpleHistoryAdmin)
admin.site.register(models.WorkflowDefinition, SimpleHistoryAdmin)
admin.site.register(models.WorkflowBatch, SimpleHistoryAdmin)
admin.site.register(models.Project, SimpleHistoryAdmin)
admin.site.register(models.Lab, SimpleHistoryAdmin)
admin.site.register(models.DNAExtractionResults, SimpleHistoryAdmin)
