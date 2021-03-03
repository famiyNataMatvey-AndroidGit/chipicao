from rest_framework import viewsets

from chipicao.serializers import Page, PageSerializer


class PageViewSet(viewsets.ModelViewSet):
    """
    """
    queryset = Page.objects.all()
    serializer_class = PageSerializer
    permission_classes = []
