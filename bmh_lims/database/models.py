from django.db import models

# Sensible field sizes for CharField columns
LG_CHAR = 1500
MD_CHAR = 500
SM_CHAR = 50


# Create your models here.
class TimeStampedModel(models.Model):
    """
    An abstract base class model that provides self-
    updating ``created`` and ``modified`` fields.
    """
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Sample(TimeStampedModel):
    """
    Model to store individual samples
    """
    sample_id = models.CharField(max_length=SM_CHAR)
    sample_name = models.CharField(max_length=SM_CHAR)

    def __str__(self):
        return f"{self.sample_id}: {self.sample_name}"

    class Meta:
        verbose_name = 'Sample'
        verbose_name_plural = 'Samples'


class WorkflowDefinition(TimeStampedModel):
    """
    Model to store workflows and their relevant data (e.g. DNA extraction)
    """
    workflow_name = models.CharField(max_length=SM_CHAR)

    def __str__(self):
        return f"{self.workflow_name}"

    class Meta:
        verbose_name = 'Workflow Definition'
        verbose_name_plural = 'Workflow Definitions'


class WorkflowBatch(TimeStampedModel):
    """
    Model to represent individual workflow batches that a user has assigned samples to
    """
    workflow = models.ForeignKey(WorkflowDefinition, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.id}: {self.workflow}"

    class Meta:
        verbose_name = 'Workflow Batch'
        verbose_name_plural = 'Workflow Batches'
