from django.http import JsonResponse
from .models import Task

def get_tasks(request):
    # Queries database entries and transforms them to an array of objects
    tasks = list(Task.objects.values('id', 'title', 'completed'))
    return JsonResponse(tasks, safe=False)
