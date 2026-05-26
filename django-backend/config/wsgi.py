import os
from django.core.wsgi import get_wsgi_application

# Tells Django where your settings are located
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

application = get_wsgi_application()
