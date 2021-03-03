from rest_framework import serializers

from chipicao.models import Sticker


class StickerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sticker
        exclude = ()
