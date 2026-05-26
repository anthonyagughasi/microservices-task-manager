from django.urls import path
from api.views import get_tasks

urlpatterns = [
    path('api/tasks/', get_tasks, name='get_tasks'),
]
