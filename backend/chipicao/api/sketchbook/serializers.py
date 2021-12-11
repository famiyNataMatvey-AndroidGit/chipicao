from rest_framework import serializers

from ...models import Sketchbook


class SketchbookCreateSerializer(serializers.ModelSerializer):
    back_cover = serializers.FileField(read_only=True)
    front_cover = serializers.FileField(read_only=True)
    is_purchased = serializers.BooleanField(read_only=True)

    class Meta:
        model = Sketchbook
        fields = ('id', 'name', 'description', 'front_cover', 'back_cover', 'is_purchased')
