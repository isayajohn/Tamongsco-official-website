from django.db import models


class OrderedModel(models.Model):
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        abstract = True
        ordering = ["order", "id"]

    def __str__(self) -> str:
        return str(getattr(self, "title", getattr(self, "label", getattr(self, "name", self.pk))))


class SiteProfile(models.Model):
    name = models.CharField(max_length=120, default="TAMONGSCO")
    full_name = models.CharField(max_length=255)
    tagline = models.CharField(max_length=255, blank=True)
    location = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=80, blank=True)
    email = models.EmailField(blank=True)
    website = models.CharField(max_length=120, blank=True)

    class Meta:
        verbose_name = "site profile"
        verbose_name_plural = "site profile"

    def __str__(self) -> str:
        return self.name


class NewsletterBanner(models.Model):
    title = models.CharField(max_length=180)
    description = models.TextField()

    class Meta:
        verbose_name = "newsletter banner"
        verbose_name_plural = "newsletter banner"

    def __str__(self) -> str:
        return self.title


class HomeHero(models.Model):
    badge = models.CharField(max_length=160)
    title_html = models.TextField()
    description = models.TextField()
    slider_images = models.JSONField(default=list, help_text="List of image paths used by the homepage slider.")

    class Meta:
        verbose_name = "home hero"
        verbose_name_plural = "home hero"

    def __str__(self) -> str:
        return self.badge


class HeroAction(OrderedModel):
    VARIANT_CHOICES = [("primary", "Primary"), ("ghost", "Ghost")]

    label = models.CharField(max_length=100)
    route = models.CharField(max_length=160)
    variant = models.CharField(max_length=20, choices=VARIANT_CHOICES, default="primary")


class PartnerLogo(OrderedModel):
    name = models.CharField(max_length=120)
    image = models.CharField(max_length=255)


class TextItem(OrderedModel):
    GROUP_CHOICES = [
        ("trust", "Trust bar"),
        ("why_us", "Homepage why us"),
        ("about_feature", "About feature"),
        ("footer_service", "Footer service"),
        ("contact_reason", "Contact reason"),
        ("insight_tag", "Insight tag"),
    ]

    group = models.CharField(max_length=40, choices=GROUP_CHOICES)
    title = models.CharField(max_length=180)
    description = models.TextField(blank=True)


class ContentCard(OrderedModel):
    GROUP_CHOICES = [
        ("home_service", "Home service"),
        ("service_page", "Services page service"),
        ("mission_vision_value", "Mission / vision / value"),
        ("team_member", "About team/member block"),
        ("resource", "Resource card"),
    ]

    group = models.CharField(max_length=40, choices=GROUP_CHOICES)
    icon = models.CharField(max_length=80, blank=True)
    title = models.CharField(max_length=180)
    description = models.TextField(blank=True)
    link = models.CharField(max_length=160, blank=True)
    image = models.CharField(max_length=255, blank=True)
    delay = models.CharField(max_length=40, blank=True)


class CounterItem(OrderedModel):
    GROUP_CHOICES = [("shared", "Shared counters"), ("elements", "Resources page counters")]

    group = models.CharField(max_length=40, choices=GROUP_CHOICES, default="shared")
    icon = models.CharField(max_length=80)
    value = models.PositiveIntegerField(default=0)
    suffix = models.CharField(max_length=20, blank=True)
    label = models.CharField(max_length=180)
    delay = models.CharField(max_length=40, blank=True)


class FaqItem(OrderedModel):
    GROUP_CHOICES = [
        ("services", "Services page FAQ"),
        ("elements_one", "Resources FAQ column one"),
        ("elements_two", "Resources FAQ column two"),
    ]

    group = models.CharField(max_length=40, choices=GROUP_CHOICES)
    question = models.CharField(max_length=255)
    answer = models.TextField()


class ProcessStep(OrderedModel):
    number = models.CharField(max_length=20)
    title = models.CharField(max_length=180)
    description = models.TextField()
    delay = models.CharField(max_length=40, blank=True)


class Testimonial(OrderedModel):
    quote = models.TextField()
    name = models.CharField(max_length=120)
    role = models.CharField(max_length=160, blank=True)
    image = models.CharField(max_length=255, blank=True)
    delay = models.CharField(max_length=40, blank=True)


class InsightPost(OrderedModel):
    category = models.CharField(max_length=120)
    title = models.CharField(max_length=220)
    excerpt = models.TextField()
    body_html = models.TextField(blank=True)
    image = models.CharField(max_length=255, blank=True)
    date = models.CharField(max_length=80)
    route = models.CharField(max_length=180)
    delay = models.CharField(max_length=40, blank=True)


class InsightCategory(OrderedModel):
    label = models.CharField(max_length=120)
    count = models.PositiveIntegerField(default=0)


class ArticleComment(OrderedModel):
    name = models.CharField(max_length=120)
    date = models.CharField(max_length=80)
    text = models.TextField()
    image = models.CharField(max_length=255, blank=True)
    is_reply = models.BooleanField(default=False)


class ContactInfoCard(OrderedModel):
    icon = models.CharField(max_length=80)
    title = models.CharField(max_length=180)
    text = models.CharField(max_length=255)


class ContactAccessLink(OrderedModel):
    label = models.CharField(max_length=120)
    value = models.CharField(max_length=255)


class SocialLink(OrderedModel):
    label = models.CharField(max_length=120)
    icon = models.CharField(max_length=80)
    href = models.CharField(max_length=255)


class FooterQuickLink(OrderedModel):
    label = models.CharField(max_length=120)
    route = models.CharField(max_length=160)



class ContactSubmission(models.Model):
    name = models.CharField(max_length=160)
    email = models.EmailField()
    subject = models.CharField(max_length=220, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_handled = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.name} <{self.email}>"


class NewsletterSubscription(models.Model):
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return self.email
