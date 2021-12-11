import re

from django.db.models import Case, When, Value, BooleanField
from rest_framework import viewsets, status
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import Sketchbook, SketchbookCreateSerializer


class SketchbookViewSet(viewsets.ModelViewSet):
    """
        CRUD Альбома
    """
    queryset = Sketchbook.objects.all()
    serializer_class = SketchbookCreateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return super().get_queryset().annotate(
            is_purchased=Case(
                When(users=self.request.user_id, then=Value(True)),
                default=Value(False),
                output_field=BooleanField()
            )
        )

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
        instance = self.get_object()
        cover_field_name = re.sub('-', '_', kwargs['side_cover'])
        setattr(instance, cover_field_name, request.FILES['file'])
        instance.save()
        return Response({'cover': getattr(instance, cover_field_name)}, status=status.HTTP_200_OK)

    def buy(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.user.coins >= self.queryset.model.COST and not instance.users.filter(id=request.user_id).exists():
            request.user.sketchbooks.add(instance)
            return Response({'is_purchased': True}, status=status.HTTP_200_OK)
        return Response({'is_purchased': False}, status=status.HTTP_200_OK)
