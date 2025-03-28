# Generated by Django 2.2.6 on 2021-01-22 17:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('assets', '0028_auto_20210122_0410'),
    ]

    operations = [
        # migrations.RemoveField(
        #     model_name='asset',
        #     name='attached_to_assist_id',
        # ),
        # migrations.RemoveField(
        #     model_name='asset',
        #     name='handed_over_assist',
        # ),
        # migrations.AddField(
        #     model_name='asset',
        #     name='attached_to_asset_id',
        #     field=models.CharField(blank=True, max_length=100),
        # ),
        # migrations.AddField(
        #     model_name='asset',
        #     name='handed_over_asset',
        #     field=models.CharField(blank=True, max_length=100),
        # ),
        # migrations.AddField(
        #     model_name='asset',
        #     name='location_id',
        #     field=models.CharField(blank=True, max_length=100),
        # ),
        # migrations.AddField(
        #     model_name='assetlocation',
        #     name='postal',
        #     field=models.CharField(blank=True, max_length=100),
        # ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='asset_status',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='bottom_water_level',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='capacity_size',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='closing_torque',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='communication_protocol',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='coverage_range',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='dimention',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='environmental_performance',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='flow_rate',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='frequency',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='horse_power',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='hysteresis',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='infrastructure_status',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='infrastructure_status_reason',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='inlet_diameter',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='installation',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='insulation',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='legal_name',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='manufacture_part_number',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='manufacturer',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='manufacturer_year',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='material_type',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='model',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='motor_current',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='no_of_channel',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='no_of_phases',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='no_of_stage',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='opening_torque',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='outlet_diameter',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='power_supply_type',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='pump_head',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='revolutions_per_minute',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='source_from',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='staging_height',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='supply_location',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='temperature',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='top_water_level',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='type',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='valve_diameter',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='valve_pressure_rating',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='vehicle_chasis_number',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='vehicle_engine_capacity',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='vehicle_engine_number',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='vehicle_insurance_auto_windscreen_insured',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='vehicle_insurance_cover_note_number',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='vehicle_insurance_date_period_from',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='vehicle_insurance_date_period_to',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='vehicle_insurance_no_claim_discount',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='vehicle_insurance_policy_type',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='vehicle_insurance_sum_insured',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='vehicle_insurance_total_premium',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='vehicle_insurance_vendor',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='vehicle_model',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='vehicle_owner_status',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='vehicle_puspakom_date_inspection',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='vehicle_puspakom_expired_date',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='vehicle_register_date',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='vehicle_registration_owner',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='vehicle_roadtax_expired_date',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='vehicle_roadtax_rate',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='vehicle_roadtax_renew_date',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='vehicle_seating_capacity',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='vehicle_spad_no_license_operator',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='vehicle_spad_permit_date_period_from',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='vehicle_spad_permit_date_period_to',
            field=models.CharField(default='false', max_length=100),
        ),
        migrations.AlterField(
            model_name='assetattributecolumn',
            name='voltage',
            field=models.CharField(default='false', max_length=100),
        ),
    ]
