from django.urls import path
from . import views

urlpatterns = [
    path('programs/', views.GovernmentProgramListView.as_view(), name='programs'),
    path('check/', views.check_eligibility, name='check_eligibility'),
    path('history/', views.get_eligibility_history, name='eligibility_history'),
    path('applications/', views.ApplicationStatusListCreateView.as_view(), name='applications'),
    path('applications/<int:pk>/', views.ApplicationStatusDetailView.as_view(), name='application_detail'),
    path('statistics/', views.get_program_statistics, name='statistics'),
]