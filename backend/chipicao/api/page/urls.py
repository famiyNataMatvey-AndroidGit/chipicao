from django.urls import path, include, re_path

from chipicao.api.page.page import PageViewSet

urlpatterns = [
    path('<int:pk>/', PageViewSet.as_view({'delete': 'destroy'})),
    path('', PageViewSet.as_view({'post': 'create', 'get': 'list'})),
    path('<int:pk>/image/', PageViewSet.as_view({'patch': 'upload_file'})),
    re_path(r'^(?P<pk>\d+)/(?P<side>(previous|next))-page/$', PageViewSet.as_view({'patch': 'flip_page'})),
    re_path(r'^(?P<pk>\d+)/set-position/(?P<position>\d+)/$', PageViewSet.as_view({'patch': 'set_position'}))
]