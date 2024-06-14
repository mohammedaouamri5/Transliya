# Generated by Django 4.1 on 2024-06-14 15:25

from django.conf import settings
import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CarEmployer',
            fields=[
                ('matricule_car', models.IntegerField(primary_key=True, serialize=False)),
                ('is_deleted_CarEmployer', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='CarType',
            fields=[
                ('id_car_type', models.AutoField(primary_key=True, serialize=False)),
                ('name_car_type', models.CharField(max_length=255)),
                ('Kerya_prix_car_type', models.FloatField()),
                ('Tewsila_prix_car_type', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='NotificationType',
            fields=[
                ('id_notification_type', models.AutoField(primary_key=True, serialize=False)),
                ('name_notification_type', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Person',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('is_deleted_p', models.BooleanField(default=False)),
                ('phonenumberp', models.BigIntegerField(unique=True)),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            bases=('auth.user',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id_service', models.AutoField(primary_key=True, serialize=False)),
                ('name_service', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Employer',
            fields=[
                ('id_employer', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='API.person')),
                ('driving_license', models.IntegerField(unique=True)),
                ('ta9yim_employer', models.IntegerField(default=10)),
                ('is_allowed', models.BooleanField(default=False)),
                ('is_working', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Tewsila',
            fields=[
                ('id_Tewsila', models.AutoField(primary_key=True, serialize=False)),
                ('t_started', models.TimeField()),
                ('t_ended', models.TimeField()),
                ('from_lon', models.FloatField()),
                ('from_lat', models.FloatField()),
                ('to_lon', models.FloatField()),
                ('to_lat', models.FloatField()),
                ('distention', models.FloatField()),
                ('comment_Tewsila', models.TextField()),
                ('ta9yim_Tewsila', models.FloatField()),
                ('id_zaboun', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.person')),
                ('matricule_car', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.caremployer')),
            ],
        ),
        migrations.CreateModel(
            name='Notify',
            fields=[
                ('id_notify', models.AutoField(primary_key=True, serialize=False)),
                ('time', models.DateTimeField(auto_now_add=True)),
                ('is_readed', models.BooleanField(default=False)),
                ('id_from', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notifications_sent', to='API.person')),
                ('id_notification_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notification_types', to='API.notificationtype')),
                ('id_to', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notifications_received', to='API.person')),
            ],
        ),
        migrations.CreateModel(
            name='Kerya',
            fields=[
                ('id_Kerya', models.AutoField(primary_key=True, serialize=False)),
                ('t_started', models.TimeField()),
                ('t_ended', models.TimeField()),
                ('comment_Kerya', models.TextField()),
                ('ta9yim_Kerya', models.FloatField()),
                ('id_car_employer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.caremployer')),
                ('id_zaboun', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.person')),
            ],
        ),
        migrations.CreateModel(
            name='CarService',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_car', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.caremployer')),
                ('id_service', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.service')),
            ],
        ),
        migrations.AddField(
            model_name='caremployer',
            name='id_type_car',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.cartype'),
        ),
        migrations.CreateModel(
            name='GetPayed',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('prix', models.FloatField()),
                ('id_employer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.employer')),
            ],
        ),
        migrations.AddField(
            model_name='caremployer',
            name='id_employer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='API.employer'),
        ),
    ]
