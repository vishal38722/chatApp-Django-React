"""
URL configuration for chatapp project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from rest_framework.authtoken import views
from paralaxiom_auth.views import Register_api,login_api
from api.views import get_user_list,change_password,get_user_data

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api-token-auth/', views.obtain_auth_token),
    path("register/",Register_api),
    path("user/",get_user_data),
    path("login/",login_api),
    path("api/exclude_user/",get_user_list),
    path('api/change-password/', change_password),
]
