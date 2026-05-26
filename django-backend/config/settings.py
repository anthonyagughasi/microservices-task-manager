import os
from pathlib import Path
import dj_database_url

BASE_DIR = Path(__file__).resolve().parent.parent

# Quick production settings
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-prod-key-123')
DEBUG = True
ALLOWED_HOSTS = ['*'] # Allows Render to access the service safely

INSTALLED_APPS = [
    'django.contrib.contenttypes',
    'django.contrib.auth',
    'corsheaders',
    'api',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]

ROOT_URLCONF = 'config.urls'
WSGI_APPLICATION = 'config.wsgi.application'

# Connects directly to your Neon PostgreSQL database via Render environment variables
DATABASES = {
    'default': dj_database_url.config(
        default=os.environ.get('DATABASE_URL'),
        conn_max_age=600
    )
}

# Simple CORS settings to allow your upcoming frontend/gateway to connect
CORS_ALLOW_ALL_ORIGINS = True
