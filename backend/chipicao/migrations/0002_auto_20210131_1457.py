# Generated by Django 3.1.3 on 2021-01-31 11:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chipicao', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sketchbook',
            name='back_cover',
            field=models.ImageField(blank=True, null=True, upload_to='', verbose_name='Задняя обложка для альбома'),
        ),
        migrations.AlterField(
            model_name='sketchbook',
            name='front_cover',
            field=models.ImageField(blank=True, null=True, upload_to='', verbose_name='Передняя обложка для альбома'),
        ),
        migrations.AlterField(
            model_name='sketchbook',
            name='status',
            field=models.CharField(choices=[('Created', 'Created'), ('Activated', 'Activated'), ('Deactivated', 'Deactivated')], default='Created', max_length=15),
        ),
        migrations.AlterField(
            model_name='user',
            name='birthday',
            field=models.DateField(null=True),
        ),
    ]
