from rest_framework import viewsets

from chipicao.api.user.serializers import User, UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = []
