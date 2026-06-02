from django.urls import path

from . import views

urlpatterns = [
    path("site-content/", views.site_content, name="site-content"),
    path("auth/login/", views.auth_login, name="auth-login"),
    path("auth/logout/", views.auth_logout, name="auth-logout"),
    path("auth/me/", views.auth_me, name="auth-me"),
    path("dashboard/summary/", views.dashboard_summary, name="dashboard-summary"),
    path("dashboard/resources/", views.dashboard_resources, name="dashboard-resources"),
    path("dashboard/resources/<str:resource_key>/", views.dashboard_resource_detail, name="dashboard-resource-create"),
    path("dashboard/resources/<str:resource_key>/<int:item_id>/", views.dashboard_resource_detail, name="dashboard-resource-detail"),
    path("contact/", views.contact_submission, name="contact-submission"),
    path("newsletter/", views.newsletter_subscription, name="newsletter-subscription"),
]
