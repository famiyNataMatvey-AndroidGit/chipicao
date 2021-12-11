from rest_framework import viewsets, status
from rest_framework.exceptions import ValidationError, NotFound
from rest_framework.response import Response

from .serializers import Page, PageSerializer
from .services import get_filter_position_params


class PageViewSet(viewsets.ModelViewSet):
    """
    """
    queryset = Page.objects.all()
    serializer_class = PageSerializer

    def create(self, request, *args, **kwargs):
        last_page = self.queryset.filter(sketchbook_id=request.data.get('sketchbook', 0)).last()
        request.data['number_of_page'] = last_page.number_of_page + 1 if last_page else 0
        return super(PageViewSet, self).create(request, *args, **kwargs)

    def upload_file(self, request, *args, **kwargs):
        if 'file' not in request.FILES:
            raise ValidationError({'file': ['This field is required.']})
        instance = self.get_object()
        instance.image = request.FILES['file']
        instance.save()
        return Response(status=status.HTTP_200_OK)

    def flip_page(self, request, side, *args, **kwargs):
        instance = self.get_object()
        if side == 'next':
            page = instance.next_page()
        else:
            page = instance.previous_page()

        if not page:
            raise NotFound()
        return Response(self.get_serializer(page).data, status=status.HTTP_200_OK)

    def set_position(self, request, position, *args, **kwargs):
        instance = self.get_object()
        filter_position, number_of_page = get_filter_position_params(instance.number_of_page, position)
        self.queryset.filter(sketchbook_id=instance.sketchbook_id, *filter_position).update(number_of_page=number_of_page)
        instance.number_of_pag = position
        instance.save()
        return Response(self.get_serializer(instance).data, status=status.HTTP_200_OK)

    def perform_destroy(self, instance):
        position = self.queryset.filter(sketchbook_id=instance.sketchbook_id).last().number_of_page
        filter_position, number_of_page = get_filter_position_params(instance.number_of_page, position)
        self.queryset.filter(sketchbook_id=instance.sketchbook_id, *filter_position).update(number_of_page=number_of_page)
        instance.delete()
