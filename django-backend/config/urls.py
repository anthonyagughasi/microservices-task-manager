from django.urls import path
from django.views.generic import RedirectView
from api.views import get_tasks

urlpatterns = [
    # This catches the empty primary URL and redirects it to the tasks endpoint
    path('', RedirectView.as_view(url='api/tasks/', permanent=False)),
    
    # Your actual data endpoint
    path('api/tasks/', get_tasks, name='get_tasks'),
]
