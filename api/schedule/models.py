from django.db import models

import uuid
class Event(models.Model):
 
    STATUS = [
        ('NE', 'New'),
        ('AC', 'Active'),
        ('IP', 'In Progress'),
        ('BL', 'BackLog')
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    event_title = models.CharField(max_length=100, default='NA')
    description = models.CharField(max_length=100, default='NA')
    status = models.CharField(max_length=2, choices=STATUS, default='NE')
    created_at = models.DateTimeField(auto_now_add=True)

    class meta:
        ordering = ['created_at']


class WorkOrderActivityCompletion(models.Model):
    
    id = models.UUIDField(primary_key=True,default=uuid.uuid4, editable=False)
    activityid = models.CharField(max_length=100, blank=True)
    completiondatetime = models.DateTimeField(null=True)

    bo_status_cd = models.CharField(max_length=100, blank=True)
    user_id_1 = models.CharField(max_length=100, blank=True)
    act_type_cd = models.CharField(max_length=100, blank=True)
    wo_id = models.CharField(max_length=100, blank=True)
    act_dpos_flg = models.CharField(max_length=100, blank=True)
    service_class_cd = models.CharField(max_length=100, blank=True)
    requestor_id = models.CharField(max_length=100, blank=True)
    required_by_dt = models.CharField(max_length=100, blank=True)
    work_priority_flg = models.CharField(max_length=100, blank=True)
    descr100 = models.CharField(max_length=225, blank=True)
    descrlong = models.CharField(max_length=225, blank=True)
    w1_descr100_upr = models.CharField(max_length=225, blank=True)
    held_for_parts_flg = models.CharField(max_length=100, blank=True)
    anniversary_value = models.CharField(max_length=100, blank=True)
    emergency_flg = models.CharField(max_length=100, blank=True)
    act_num = models.CharField(max_length=100, blank=True)
    planner_cd = models.CharField(max_length=100, blank=True)
    total_priority = models.CharField(max_length=100, blank=True)
    total_priority_src_flg = models.CharField(max_length=100, blank=True)
    node_id_1 = models.CharField(max_length=12, blank=True)
    asset_id_1 = models.CharField(max_length=12, blank=True)
    percentage = models.CharField(max_length=100, blank=True)
    seqno = models.CharField(max_length=100, blank=True)
    participation_flg = models.CharField(max_length=100, blank=True)
    cost_center_cd = models.CharField(max_length=100, blank=True)
    percentage_2 = models.CharField(max_length=100, blank=True)
    act_resrc_reqmt_id = models.CharField(max_length=100, blank=True)
    descrlong_1 = models.CharField(max_length=100, blank=True)
    resrc_src_flg = models.CharField(max_length=100, blank=True)
    resrc_type_id = models.CharField(max_length=100, blank=True)
    w1_quantity = models.CharField(max_length=100, blank=True)
    unit_price = models.CharField(max_length=100, blank=True)
    w1_duration = models.CharField(max_length=100, blank=True)
    crew_shift_id = models.CharField(max_length=100, blank=True)
    sched_duration = models.CharField(max_length=100, blank=True)
    break_in_dttm = models.CharField(max_length=100, blank=True)
    actvn_dttm = models.CharField(max_length=100, blank=True)
    tmpl_act_id = models.CharField(max_length=100, blank=True)
    maint_sched_id = models.CharField(max_length=100, blank=True)
    maint_trigger_id = models.CharField(max_length=100, blank=True)
    status = models.CharField(max_length=100, blank=True)
    owning_organization = models.CharField(max_length=100, blank=True)

    field_1 = models.CharField(max_length=100, blank=True)
    field_2 = models.CharField(max_length=100, blank=True)

    submitted_datetime = models.DateTimeField(null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class meta:
        ordering = ['-created_date']

 
