from django.contrib import admin
from bmh_lims.database import models

# Register your models here.
admin.site.register(models.Sample)
admin.site.register(models.WorkflowDefinition)
admin.site.register(models.WorkflowBatch)
admin.site.register(models.Project)
admin.site.register(models.Lab)
admin.site.register(models.DNAExtractionResults)
