from rest_framework import serializers

from ...models import Sketchbook


class SketchbookCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sketchbook
        fields = ('id', 'name', 'description')


class SketchbookRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sketchbook
        fields = ('id', 'name', 'description', 'front_cover', 'back_cover')
