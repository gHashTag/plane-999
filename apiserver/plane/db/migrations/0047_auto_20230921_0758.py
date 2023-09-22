# Generated by Django 4.2.3 on 2023-09-21 07:58


from django.db import migrations


def update_priority_history(apps, schema_editor):
    IssueActivity = apps.get_model("db", "IssueActivity")
    updated_issue_activity = []
    for obj in IssueActivity.objects.all():
        if obj.field == "priority":
            obj.new_value = obj.new_value or "none"
            obj.old_value = obj.old_value or "none"
        updated_issue_activity.append(obj)
    IssueActivity.objects.bulk_update(
        updated_issue_activity, ["new_value", "old_value"], batch_size=100
    )


class Migration(migrations.Migration):
    dependencies = [
        ("db", "0046_auto_20230919_1421"),
    ]

    operations = [
        migrations.RunPython(update_priority_history),
    ]