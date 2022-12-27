from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import Todo
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status, permissions



class TodoView(viewsets.ModelViewSet):
    permission_classes = (permissions.AllowAny,)

    serializer_class = TodoSerializer
    queryset = Todo.objects.all()

    