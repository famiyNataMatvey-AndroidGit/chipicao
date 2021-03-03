from django.urls import path, include

from chipicao.api.user.user import UserViewSet

urlpatterns = [
    path('', UserViewSet.as_view({'get': 'list'})),
    path('<int:pk>/', UserViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update'}))
]