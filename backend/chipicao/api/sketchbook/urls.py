from django.urls import path, re_path

from .sketchbook import SketchbookViewSet

urlpatterns = [
    path('<int:pk>/buy/', SketchbookViewSet.as_view({'patch': 'buy'})),
    path('', SketchbookViewSet.as_view({'post': 'create', 'get': 'list'})),
    path('<int:pk>/', SketchbookViewSet.as_view({'patch': 'partial_update', 'get': 'retrieve'})),
    re_path(r'^(?P<pk>\d+)/(?P<side_cover>(front|back)-cover)/$', SketchbookViewSet.as_view({'patch': 'upload_file'})),
    re_path(r'^(?P<pk>\d+)/toggle-(?P<status>(create|deactivate))/$', SketchbookViewSet.as_view({'patch': 'toggle_status'}))
]
