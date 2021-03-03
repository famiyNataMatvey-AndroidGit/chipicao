import re

from rest_framework import viewsets, mixins, status, generics
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import Sketchbook, SketchbookCreateSerializer, SketchbookRetrieveSerializer


class SketchbookCreateViewSet(mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    """
        CUD Альбома
    """
    queryset = Sketchbook.objects.all()
    serializer_class = SketchbookCreateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        sketchbook = serializer.save()
        sketchbook.author = self.request.user
        sketchbook.save()

    def toggle_status(self, request, *args, **kwargs):
        sketchbook = self.get_object()
        if kwargs['status'] == 'create':
            sketchbook.toggle_created()
        else:
            sketchbook.toggle_deactivated()
        sketchbook.save()
        return Response(status=status.HTTP_200_OK)

    def upload_file(self, request, *args, **kwargs):
        if 'file' not in request.FILES:
            raise ValidationError({'file': ['This field is required.']})
        agreement = self.get_object()
        setattr(agreement, re.sub('-', '_', kwargs['side_cover']), request.FILES['file'])
        agreement.save()
        return Response(status=status.HTTP_200_OK)


class SketchbookRetrieveViewSet(viewsets.ReadOnlyModelViewSet):
    """
        Просмотр Альбома
    """
    queryset = Sketchbook.objects.all()
    serializer_class = SketchbookRetrieveSerializer
    permission_classes = [IsAuthenticated]
