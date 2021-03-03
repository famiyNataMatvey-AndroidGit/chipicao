from django.urls import path, include

urlpatterns = [
    path('user/', include('chipicao.api.user.urls')),
    path('page/', include('chipicao.api.page.urls')),
    path('sticker/', include('chipicao.api.sticker.urls')),
    path('sketchbook/', include('chipicao.api.sketchbook.urls'))
]
