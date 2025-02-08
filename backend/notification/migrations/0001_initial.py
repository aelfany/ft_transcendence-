# Generated by Django 4.2.16 on 2025-02-08 16:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=255)),
                ('message', models.CharField(max_length=255)),
                ('receiver_notif', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='receiver_notif', to=settings.AUTH_USER_MODEL)),
                ('sender_notif', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='sender_notif', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'Notification',
            },
        ),
    ]
