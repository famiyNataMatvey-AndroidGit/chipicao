from .sketchbook import SketchbookCreateViewSet, SketchbookRetrieveViewSet
from django.urls import path, re_path

create_urls = [
    path('', SketchbookCreateViewSet.as_view({'post': 'create'})),
    path('<int:pk>/', SketchbookCreateViewSet.as_view({'patch': 'partial_update'})),
    re_path(r'^(?P<pk>\d+)/(?P<side_cover>(front|back)-cover)/$', SketchbookCreateViewSet.as_view({'patch': 'upload_file'})),
    re_path(r'^(?P<pk>\d+)/toggle-(?P<status>(create|deactivate))/$', SketchbookCreateViewSet.as_view({'patch': 'toggle_status'}))
]

retrieve_urls = [
    path('list/', SketchbookRetrieveViewSet.as_view({'get': 'list'})),
    path('<int:pk>/retrieve/', SketchbookRetrieveViewSet.as_view({'get': 'retrieve'}))
]

urlpatterns = [*create_urls, *retrieve_urls]
