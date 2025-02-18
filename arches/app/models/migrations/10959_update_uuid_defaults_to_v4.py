# Generated by Django 5.2a1 on 2025-02-18 13:58

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("models", "10958_restore_pk_defaults"),
    ]

    operations = [
        migrations.AlterField(
            model_name="editlog",
            name="transactionid",
            field=models.UUIDField(default=uuid.uuid4),
        ),
        migrations.AlterField(
            model_name="etlmodule",
            name="etlmoduleid",
            field=models.UUIDField(
                default=uuid.uuid4, primary_key=True, serialize=False
            ),
        ),
        migrations.AlterField(
            model_name="graphxpublishedgraph",
            name="publicationid",
            field=models.UUIDField(
                default=uuid.uuid4, primary_key=True, serialize=False
            ),
        ),
        migrations.AlterField(
            model_name="publishedgraphedit",
            name="edit_id",
            field=models.UUIDField(
                default=uuid.uuid4, primary_key=True, serialize=False
            ),
        ),
        migrations.AlterField(
            model_name="resourcerevisionlog",
            name="resourceid",
            field=models.UUIDField(default=uuid.uuid4),
        ),
        migrations.AlterField(
            model_name="spatialview",
            name="spatialviewid",
            field=models.UUIDField(
                default=uuid.uuid4, primary_key=True, serialize=False
            ),
        ),
    ]
