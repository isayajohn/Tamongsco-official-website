from django.contrib import admin

from . import models


class OrderedAdmin(admin.ModelAdmin):
    list_display = ("__str__", "order", "is_active")
    list_editable = ("order", "is_active")
    list_filter = ("is_active",)
    search_fields = ("title", "label", "name", "description", "text")


@admin.register(models.SiteProfile)
class SiteProfileAdmin(admin.ModelAdmin):
    list_display = ("name", "phone", "email", "location")


@admin.register(models.NewsletterBanner)
class NewsletterBannerAdmin(admin.ModelAdmin):
    list_display = ("title",)


@admin.register(models.HomeHero)
class HomeHeroAdmin(admin.ModelAdmin):
    list_display = ("badge",)


@admin.register(models.HeroAction)
class HeroActionAdmin(OrderedAdmin):
    list_display = ("label", "route", "variant", "order", "is_active")
    list_filter = ("variant", "is_active")
    search_fields = ("label", "route")


@admin.register(models.PartnerLogo)
class PartnerLogoAdmin(OrderedAdmin):
    list_display = ("name", "image", "order", "is_active")
    search_fields = ("name", "image")


@admin.register(models.TextItem)
class TextItemAdmin(OrderedAdmin):
    list_display = ("title", "group", "order", "is_active")
    list_filter = ("group", "is_active")
    search_fields = ("title", "description")


@admin.register(models.ContentCard)
class ContentCardAdmin(OrderedAdmin):
    list_display = ("title", "group", "icon", "link", "order", "is_active")
    list_filter = ("group", "is_active")
    search_fields = ("title", "description", "link", "image")


@admin.register(models.CounterItem)
class CounterItemAdmin(OrderedAdmin):
    list_display = ("label", "group", "value", "suffix", "order", "is_active")
    list_filter = ("group", "is_active")
    search_fields = ("label", "icon")


@admin.register(models.FaqItem)
class FaqItemAdmin(OrderedAdmin):
    list_display = ("question", "group", "order", "is_active")
    list_filter = ("group", "is_active")
    search_fields = ("question", "answer")


@admin.register(models.ProcessStep)
class ProcessStepAdmin(OrderedAdmin):
    list_display = ("number", "title", "order", "is_active")
    search_fields = ("number", "title", "description")


@admin.register(models.Testimonial)
class TestimonialAdmin(OrderedAdmin):
    list_display = ("name", "role", "order", "is_active")
    search_fields = ("quote", "name", "role")


@admin.register(models.InsightPost)
class InsightPostAdmin(OrderedAdmin):
    list_display = ("title", "category", "date", "route", "order", "is_active")
    list_filter = ("category", "is_active")
    search_fields = ("title", "excerpt", "category")


@admin.register(models.InsightCategory)
class InsightCategoryAdmin(OrderedAdmin):
    list_display = ("label", "count", "order", "is_active")
    search_fields = ("label",)


@admin.register(models.ArticleComment)
class ArticleCommentAdmin(OrderedAdmin):
    list_display = ("name", "date", "is_reply", "order", "is_active")
    list_filter = ("is_reply", "is_active")
    search_fields = ("name", "text")


@admin.register(models.ContactInfoCard)
class ContactInfoCardAdmin(OrderedAdmin):
    list_display = ("title", "icon", "text", "order", "is_active")
    search_fields = ("title", "text", "icon")


@admin.register(models.ContactAccessLink)
class ContactAccessLinkAdmin(OrderedAdmin):
    list_display = ("label", "value", "order", "is_active")
    search_fields = ("label", "value")


@admin.register(models.SocialLink)
class SocialLinkAdmin(OrderedAdmin):
    list_display = ("label", "icon", "href", "order", "is_active")
    search_fields = ("label", "href", "icon")


@admin.register(models.FooterQuickLink)
class FooterQuickLinkAdmin(OrderedAdmin):
    list_display = ("label", "route", "order", "is_active")
    search_fields = ("label", "route")


@admin.register(models.ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "created_at", "is_handled")
    list_editable = ("is_handled",)
    list_filter = ("is_handled", "created_at")
    search_fields = ("name", "email", "subject", "message")
    readonly_fields = ("created_at",)


@admin.register(models.NewsletterSubscription)
class NewsletterSubscriptionAdmin(admin.ModelAdmin):
    list_display = ("email", "created_at")
    search_fields = ("email",)
    readonly_fields = ("created_at",)
