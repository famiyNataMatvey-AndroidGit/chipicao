from chipicao.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password', 'is_superuser', 'username', 'is_staff', 'date_joined')


class CurrentUserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'avatar', 'coins', 'full_name')

    @staticmethod
    def get_full_name(obj):
        return obj.get_full_name()
