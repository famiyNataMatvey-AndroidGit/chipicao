from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    Пользователь с расширенными полями
    """
    avatar = models.ImageField(null=True)
    birthday = models.DateField(null=True)
    coins = models.PositiveIntegerField(default=0)
    sketchbooks = models.ManyToManyField('Sketchbook', related_name='users')

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'


class Sketchbook(models.Model):
    """
        Альбом с наклейками
    """

    class StatusChoice(models.TextChoices):
        CREATED = 'Created'
        ACTIVATED = 'Activated'
        DEACTIVATED = 'Deactivated'

    COST = 300

    name = models.CharField(max_length=255, unique=True)
    description = models.CharField(max_length=4095)
    front_cover = models.ImageField('Передняя обложка для альбома', null=True, blank=True)
    back_cover = models.ImageField('Задняя обложка для альбома', null=True, blank=True)
    status = models.CharField(max_length=15, choices=StatusChoice.choices, default=StatusChoice.CREATED)
    author = models.ForeignKey('User', null=True, on_delete=models.SET_NULL, related_name='author_sketchbooks')

    class Meta:
        verbose_name = 'Sketchbook'
        verbose_name_plural = 'Sketchbooks'

    def toggle_created(self):
        if self.status == self.StatusChoice.CREATED:
            self.status = self.StatusChoice.ACTIVATED
        elif self.status == self.StatusChoice.ACTIVATED:
            self.status = self.StatusChoice.CREATED

    def toggle_deactivated(self):
        if self.status == self.StatusChoice.ACTIVATED:
            self.status = self.StatusChoice.DEACTIVATED
        elif self.status == self.StatusChoice.DEACTIVATED:
            self.status = self.StatusChoice.ACTIVATED


class Page(models.Model):
    """
    Страница в альбоме
    """
    number_of_page = models.PositiveIntegerField()
    image = models.ImageField('Фоновое изображение страницы')
    author = models.ForeignKey('User', null=True, on_delete=models.SET_NULL, related_name='pages')
    sketchbook = models.ForeignKey('Sketchbook', on_delete=models.CASCADE, related_name='pages')

    class Meta:
        verbose_name = 'Page'
        verbose_name_plural = 'Pages'
        ordering = ('number_of_page',)

    def nex_page(self):
        return Page.objects.filter(sketchbook_id=self.sketchbook_id, number_of_page__gt=self.number_of_page).first()

    def previous_page(self):
        return Page.objects.filter(sketchbook_id=self.sketchbook_id, number_of_page__lt=self.number_of_page).last()


class Sticker(models.Model):
    """
    Наклейка в коллекционный альбом
    """
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=2047)
    sticker = models.ImageField()
    animated_sticker = models.ImageField()
    rarity = models.CharField(max_length=15, choices=())
    animation_cost = models.PositiveIntegerField(choices=())
    page = models.ForeignKey('Page', on_delete=models.CASCADE, related_name='stickers')
    author = models.ForeignKey('User', null=True, on_delete=models.SET_NULL, related_name='stickers')

    class Meta:
        verbose_name = 'Sticker'
        verbose_name_plural = 'Stickers'


class UserSticker(models.Model):
    """
    Связь между Пользователем и Наклейкой
    """
    status = models.CharField(max_length=15, choices=())
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    sticker = models.ForeignKey('Sticker', on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'User Sticker'
        verbose_name_plural = 'User Stickers'
