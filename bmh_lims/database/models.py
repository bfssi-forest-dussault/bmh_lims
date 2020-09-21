from django.db import models
from bmh_lims.users.models import User

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


class Lab(TimeStampedModel):
    """
    Model to store labs that submit to the LIMS
    """
    lab_name = models.CharField(max_length=SM_CHAR)  # e.g. Virology, Salmonella
    lab_contact = models.EmailField(max_length=SM_CHAR)
    lab_notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.lab_name}"

    class Meta:
        verbose_name = 'Lab'
        verbose_name_plural = 'Labs'


class Project(TimeStampedModel):
    project_name = models.CharField(max_length=SM_CHAR)
    project_lead = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    project_description = models.TextField(blank=True, null=True)
    supporting_lab = models.ForeignKey(Lab, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f"{self.project_name} (Lab: {self.supporting_lab})"

    class Meta:
        verbose_name = 'Project'
        verbose_name_plural = 'Projects'


class Sample(TimeStampedModel):
    """
    Model to store individual samples
    """
    sample_id = models.CharField(max_length=SM_CHAR)  # TODO: autogenerate and follow a standard format LIMS-2020-000001
    sample_name = models.CharField(max_length=SM_CHAR)
    well = models.CharField(max_length=SM_CHAR, blank=True, null=True)
    submitting_lab = models.ForeignKey(Lab, on_delete=models.SET_NULL, null=True, blank=True),

    submission_format = models.CharField(max_length=SM_CHAR, blank=True, null=True)
    sample_volume_in_ul = models.FloatField(null=True, blank=True)
    requested_services = models.TextField(null=True, blank=True)
    submitter_project = models.ForeignKey(Project, on_delete=models.CASCADE, blank=True, null=True)

    strain = models.CharField(max_length=SM_CHAR, null=True, blank=True)
    isolate = models.CharField(max_length=SM_CHAR, null=True, blank=True)
    genus = models.CharField(max_length=SM_CHAR, null=True, blank=True)
    species = models.CharField(max_length=SM_CHAR, null=True, blank=True)
    subspecies_subtype_lineage = models.CharField(max_length=SM_CHAR, null=True, blank=True)
    approx_genome_size_in_bp = models.IntegerField(blank=True, null=True)
    comments = models.TextField(blank=True, null=True)
    culture_date = models.DateField(blank=True, null=True)
    culture_conditions = models.TextField(blank=True, null=True)
    dna_extraction_date = models.DateField(blank=True, null=True)
    dna_extraction_method = models.CharField(max_length=SM_CHAR, blank=True, null=True)
    qubit_concentration_in_ng_ul = models.FloatField(blank=True, null=True)

    def __str__(self):
        return f"{self.sample_id}: {self.sample_name}"

    def verify_sample_id(self):
        pass

    def generate_sample_id(self):
        pass

    class Meta:
        verbose_name = 'Sample'
        verbose_name_plural = 'Samples'


class WorkflowDefinition(TimeStampedModel):
    """
    Model to store workflows and their relevant data (e.g. DNA extraction)
    """
    workflow_name = models.CharField(max_length=SM_CHAR)
    workflow_description = models.TextField(null=True, blank=True)

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
    samples = models.ManyToManyField(Sample)

    def __str__(self):
        return f"{self.id}: {self.workflow}"

    class Meta:
        verbose_name = 'Workflow Batch'
        verbose_name_plural = 'Workflow Batches'


class DNAExtractionResults(TimeStampedModel):
    """
    DNA extraction results for a single sample linked to a specific workflow are stored here
    """
    workflow_batch = models.ForeignKey(WorkflowBatch, on_delete=models.CASCADE)
    sample = models.ForeignKey(Sample, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.sample} - DNA Extraction Results"

    class Meta:
        verbose_name = 'DNA Extraction Result'
        verbose_name_plural = 'DNA Extraction Results'
