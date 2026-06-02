import json

from django.contrib.auth import authenticate, get_user_model, login, logout
from django.db import IntegrityError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST

from . import models

User = get_user_model()


def active(queryset):
    return queryset.filter(is_active=True)


def superuser_required(request):
    return request.user.is_authenticated and request.user.is_superuser


def user_payload(user):
    return {
        "id": user.id,
        "username": user.get_username(),
        "email": user.email,
        "isSuperuser": user.is_superuser,
    }


DASHBOARD_RESOURCES = {
    "homeHero": {
        "label": "Homepage Hero",
        "model": models.HomeHero,
        "singleton": True,
        "fields": [
            {"name": "badge", "label": "Badge", "type": "text"},
            {"name": "title_html", "label": "Title HTML", "type": "textarea"},
            {"name": "description", "label": "Description", "type": "textarea"},
            {"name": "slider_images", "label": "Slider Images", "type": "json"},
        ],
    },
    "heroActions": {
        "label": "Hero Actions",
        "model": models.HeroAction,
        "fields": [
            {"name": "label", "label": "Label", "type": "text"},
            {"name": "route", "label": "Route", "type": "text"},
            {"name": "variant", "label": "Variant", "type": "text"},
            {"name": "order", "label": "Order", "type": "number"},
            {"name": "is_active", "label": "Active", "type": "boolean"},
        ],
    },
    "partnerLogos": {
        "label": "Partner Logos",
        "model": models.PartnerLogo,
        "fields": [
            {"name": "name", "label": "Name", "type": "text"},
            {"name": "image", "label": "Image", "type": "text"},
            {"name": "order", "label": "Order", "type": "number"},
            {"name": "is_active", "label": "Active", "type": "boolean"},
        ],
    },
    "contentCards": {
        "label": "Cards and Sections",
        "model": models.ContentCard,
        "fields": [
            {"name": "group", "label": "Group", "type": "text"},
            {"name": "icon", "label": "Icon", "type": "text"},
            {"name": "title", "label": "Title", "type": "text"},
            {"name": "description", "label": "Description", "type": "textarea"},
            {"name": "link", "label": "Link", "type": "text"},
            {"name": "image", "label": "Image", "type": "text"},
            {"name": "delay", "label": "Delay", "type": "text"},
            {"name": "order", "label": "Order", "type": "number"},
            {"name": "is_active", "label": "Active", "type": "boolean"},
        ],
    },
    "textItems": {
        "label": "Text Lists",
        "model": models.TextItem,
        "fields": [
            {"name": "group", "label": "Group", "type": "text"},
            {"name": "title", "label": "Text / Title", "type": "text"},
            {"name": "description", "label": "Description", "type": "textarea"},
            {"name": "order", "label": "Order", "type": "number"},
            {"name": "is_active", "label": "Active", "type": "boolean"},
        ],
    },
    "counters": {
        "label": "Counters",
        "model": models.CounterItem,
        "fields": [
            {"name": "group", "label": "Group", "type": "text"},
            {"name": "icon", "label": "Icon", "type": "text"},
            {"name": "value", "label": "Value", "type": "number"},
            {"name": "suffix", "label": "Suffix", "type": "text"},
            {"name": "label", "label": "Label", "type": "text"},
            {"name": "delay", "label": "Delay", "type": "text"},
            {"name": "order", "label": "Order", "type": "number"},
            {"name": "is_active", "label": "Active", "type": "boolean"},
        ],
    },
    "faqs": {
        "label": "FAQs",
        "model": models.FaqItem,
        "fields": [
            {"name": "group", "label": "Group", "type": "text"},
            {"name": "question", "label": "Question", "type": "text"},
            {"name": "answer", "label": "Answer", "type": "textarea"},
            {"name": "order", "label": "Order", "type": "number"},
            {"name": "is_active", "label": "Active", "type": "boolean"},
        ],
    },
    "processSteps": {
        "label": "Process Steps",
        "model": models.ProcessStep,
        "fields": [
            {"name": "number", "label": "Number", "type": "text"},
            {"name": "title", "label": "Title", "type": "text"},
            {"name": "description", "label": "Description", "type": "textarea"},
            {"name": "delay", "label": "Delay", "type": "text"},
            {"name": "order", "label": "Order", "type": "number"},
            {"name": "is_active", "label": "Active", "type": "boolean"},
        ],
    },
    "testimonials": {
        "label": "Testimonials",
        "model": models.Testimonial,
        "fields": [
            {"name": "quote", "label": "Quote", "type": "textarea"},
            {"name": "name", "label": "Name", "type": "text"},
            {"name": "role", "label": "Role", "type": "text"},
            {"name": "image", "label": "Image", "type": "text"},
            {"name": "delay", "label": "Delay", "type": "text"},
            {"name": "order", "label": "Order", "type": "number"},
            {"name": "is_active", "label": "Active", "type": "boolean"},
        ],
    },
    "insightPosts": {
        "label": "News Posts",
        "model": models.InsightPost,
        "fields": [
            {"name": "category", "label": "Category", "type": "text"},
            {"name": "title", "label": "Title", "type": "text"},
            {"name": "excerpt", "label": "Excerpt", "type": "textarea"},
            {"name": "body_html", "label": "Body HTML", "type": "textarea"},
            {"name": "image", "label": "Image", "type": "text"},
            {"name": "date", "label": "Date", "type": "text"},
            {"name": "route", "label": "Route", "type": "text"},
            {"name": "delay", "label": "Delay", "type": "text"},
            {"name": "order", "label": "Order", "type": "number"},
            {"name": "is_active", "label": "Active", "type": "boolean"},
        ],
    },
    "insightCategories": {
        "label": "News Categories",
        "model": models.InsightCategory,
        "fields": [
            {"name": "label", "label": "Label", "type": "text"},
            {"name": "count", "label": "Count", "type": "number"},
            {"name": "order", "label": "Order", "type": "number"},
            {"name": "is_active", "label": "Active", "type": "boolean"},
        ],
    },
    "articleComments": {
        "label": "Article Comments",
        "model": models.ArticleComment,
        "fields": [
            {"name": "name", "label": "Name", "type": "text"},
            {"name": "date", "label": "Date", "type": "text"},
            {"name": "text", "label": "Comment", "type": "textarea"},
            {"name": "image", "label": "Image", "type": "text"},
            {"name": "is_reply", "label": "Reply", "type": "boolean"},
            {"name": "order", "label": "Order", "type": "number"},
            {"name": "is_active", "label": "Active", "type": "boolean"},
        ],
    },
    "siteProfile": {
        "label": "Organization Profile",
        "model": models.SiteProfile,
        "singleton": True,
        "fields": [
            {"name": "name", "label": "Name", "type": "text"},
            {"name": "full_name", "label": "Full Name", "type": "text"},
            {"name": "tagline", "label": "Tagline", "type": "text"},
            {"name": "location", "label": "Location", "type": "text"},
            {"name": "phone", "label": "Phone", "type": "text"},
            {"name": "email", "label": "Email", "type": "text"},
            {"name": "website", "label": "Website", "type": "text"},
        ],
    },
    "newsletterBanner": {
        "label": "Newsletter Banner",
        "model": models.NewsletterBanner,
        "singleton": True,
        "fields": [
            {"name": "title", "label": "Title", "type": "text"},
            {"name": "description", "label": "Description", "type": "textarea"},
        ],
    },
    "contactInfoCards": {
        "label": "Contact Info Cards",
        "model": models.ContactInfoCard,
        "fields": [
            {"name": "icon", "label": "Icon", "type": "text"},
            {"name": "title", "label": "Title", "type": "text"},
            {"name": "text", "label": "Text", "type": "text"},
            {"name": "order", "label": "Order", "type": "number"},
            {"name": "is_active", "label": "Active", "type": "boolean"},
        ],
    },
    "contactAccessLinks": {
        "label": "Contact Access Links",
        "model": models.ContactAccessLink,
        "fields": [
            {"name": "label", "label": "Label", "type": "text"},
            {"name": "value", "label": "Value", "type": "text"},
            {"name": "order", "label": "Order", "type": "number"},
            {"name": "is_active", "label": "Active", "type": "boolean"},
        ],
    },
    "socialLinks": {
        "label": "Social Links",
        "model": models.SocialLink,
        "fields": [
            {"name": "label", "label": "Label", "type": "text"},
            {"name": "icon", "label": "Icon", "type": "text"},
            {"name": "href", "label": "URL", "type": "text"},
            {"name": "order", "label": "Order", "type": "number"},
            {"name": "is_active", "label": "Active", "type": "boolean"},
        ],
    },
    "footerQuickLinks": {
        "label": "Footer Links",
        "model": models.FooterQuickLink,
        "fields": [
            {"name": "label", "label": "Label", "type": "text"},
            {"name": "route", "label": "Route", "type": "text"},
            {"name": "order", "label": "Order", "type": "number"},
            {"name": "is_active", "label": "Active", "type": "boolean"},
        ],
    },
}


def serialize_resource_item(item, fields):
    data = {"id": item.id, "display": str(item)}
    for field in fields:
        data[field["name"]] = getattr(item, field["name"])
    return data


def clean_resource_payload(payload, fields):
    cleaned = {}
    for field in fields:
        name = field["name"]
        if name not in payload:
            continue
        value = payload[name]
        if field["type"] == "number" and value != "":
            value = int(value)
        elif field["type"] == "boolean":
            value = bool(value)
        elif field["type"] == "json" and isinstance(value, str):
            value = json.loads(value or "[]")
        cleaned[name] = value
    return cleaned


USER_RESOURCE_FIELDS = [
    {"name": "username", "label": "Username", "type": "text"},
    {"name": "email", "label": "Email", "type": "text"},
    {"name": "first_name", "label": "First Name", "type": "text"},
    {"name": "last_name", "label": "Last Name", "type": "text"},
    {"name": "is_active", "label": "Active", "type": "boolean"},
    {"name": "is_staff", "label": "Staff", "type": "boolean"},
    {"name": "is_superuser", "label": "Superuser", "type": "boolean"},
    {"name": "password", "label": "New Password", "type": "text"},
]


def serialize_user(user):
    return {
        "id": user.id,
        "display": user.get_username(),
        "username": user.get_username(),
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "is_active": user.is_active,
        "is_staff": user.is_staff,
        "is_superuser": user.is_superuser,
        "password": "",
        "date_joined": user.date_joined.isoformat(),
    }


def save_user_from_payload(payload, item_id=None):
    password = payload.get("password", "")
    fields = {
        "username": payload.get("username", "").strip(),
        "email": payload.get("email", "").strip(),
        "first_name": payload.get("first_name", "").strip(),
        "last_name": payload.get("last_name", "").strip(),
        "is_active": bool(payload.get("is_active", True)),
        "is_staff": bool(payload.get("is_staff", False)),
        "is_superuser": bool(payload.get("is_superuser", False)),
    }
    if not fields["username"]:
        raise ValueError("Username is required.")

    if item_id is None:
        if not password:
            raise ValueError("Password is required for new users.")
        user = User(**fields)
        user.set_password(password)
        user.save()
        return user

    user = User.objects.get(id=item_id)
    for field, value in fields.items():
        setattr(user, field, value)
    if password:
        user.set_password(password)
    user.save()
    return user


def card(item):
    data = {
        "icon": item.icon,
        "title": item.title,
        "description": item.description,
    }
    if item.link:
        data["link"] = item.link
    if item.image:
        data["image"] = item.image
    if item.delay:
        data["delay"] = item.delay
    return data


def text_group(group):
    rows = active(models.TextItem.objects.filter(group=group))
    if group in {"why_us"}:
        return [{"title": row.title, "description": row.description} for row in rows]
    return [row.title for row in rows]


def card_group(group):
    return [card(row) for row in active(models.ContentCard.objects.filter(group=group))]


def counter_group(group):
    return [
        {
            "icon": row.icon,
            "value": row.value,
            "suffix": row.suffix,
            "label": row.label,
            **({"delay": row.delay} if row.delay else {}),
        }
        for row in active(models.CounterItem.objects.filter(group=group))
    ]


def faq_group(group):
    return [
        {"question": row.question, "answer": row.answer}
        for row in active(models.FaqItem.objects.filter(group=group))
    ]


@require_GET
def site_content(request):
    profile = models.SiteProfile.objects.first()
    newsletter = models.NewsletterBanner.objects.first()
    hero = models.HomeHero.objects.first()

    payload = {
        "organizationProfile": {
            "name": profile.name,
            "fullName": profile.full_name,
            "tagline": profile.tagline,
            "location": profile.location,
            "phone": profile.phone,
            "email": profile.email,
            "website": profile.website,
        }
        if profile
        else None,
        "newsletterBannerContent": {
            "title": newsletter.title,
            "description": newsletter.description,
        }
        if newsletter
        else None,
        "homeHero": {
            "badge": hero.badge,
            "titleHtml": hero.title_html,
            "description": hero.description,
            "sliderImages": hero.slider_images,
            "actions": [
                {"label": row.label, "route": row.route, "variant": row.variant}
                for row in active(models.HeroAction.objects.all())
            ],
        }
        if hero
        else None,
        "heroPartners": [
            {"name": row.name, "image": row.image}
            for row in active(models.PartnerLogo.objects.all())
        ],
        "homeServices": card_group("home_service"),
        "servicesPageServices": card_group("service_page"),
        "missionVisionValues": card_group("mission_vision_value"),
        "teamMembers": [
            {
                "name": row.title,
                "role": row.description,
                "image": row.image,
                **({"delay": row.delay} if row.delay else {}),
            }
            for row in active(models.ContentCard.objects.filter(group="team_member"))
        ],
        "resourceCards": card_group("resource"),
        "whyUsItems": text_group("why_us"),
        "aboutFeatures": text_group("about_feature"),
        "trustItems": text_group("trust"),
        "footerServices": text_group("footer_service"),
        "insightTags": text_group("insight_tag"),
        "contactReasons": text_group("contact_reason"),
        "sharedCounters": counter_group("shared"),
        "elementsCounters": counter_group("elements"),
        "processSteps": [
            {
                "number": row.number,
                "title": row.title,
                "description": row.description,
                **({"delay": row.delay} if row.delay else {}),
            }
            for row in active(models.ProcessStep.objects.all())
        ],
        "serviceFaqs": faq_group("services"),
        "elementsFaqColumnOne": faq_group("elements_one"),
        "elementsFaqColumnTwo": faq_group("elements_two"),
        "testimonials": [
            {
                "quote": row.quote,
                "name": row.name,
                "role": row.role,
                "image": row.image,
                **({"delay": row.delay} if row.delay else {}),
            }
            for row in active(models.Testimonial.objects.all())
        ],
        "insightPosts": [
            {
                "category": row.category,
                "title": row.title,
                "excerpt": row.excerpt,
                "bodyHtml": row.body_html,
                "image": row.image,
                "date": row.date,
                "route": row.route,
                **({"delay": row.delay} if row.delay else {}),
            }
            for row in active(models.InsightPost.objects.all())
        ],
        "insightCategories": [
            {"label": row.label, "count": row.count}
            for row in active(models.InsightCategory.objects.all())
        ],
        "articleComments": [
            {
                "name": row.name,
                "date": row.date,
                "text": row.text,
                "image": row.image,
                **({"isReply": row.is_reply} if row.is_reply else {}),
            }
            for row in active(models.ArticleComment.objects.all())
        ],
        "contactInfoCards": [
            {"icon": row.icon, "title": row.title, "text": row.text}
            for row in active(models.ContactInfoCard.objects.all())
        ],
        "contactAccessLinks": [
            {"label": row.label, "value": row.value}
            for row in active(models.ContactAccessLink.objects.all())
        ],
        "socialLinks": [
            {"label": row.label, "icon": row.icon, "href": row.href}
            for row in active(models.SocialLink.objects.all())
        ],
        "footerQuickLinks": [
            {"label": row.label, "route": row.route}
            for row in active(models.FooterQuickLink.objects.all())
        ],
    }
    return JsonResponse(payload)


@csrf_exempt
@require_POST
def auth_login(request):
    try:
        data = json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON body."}, status=400)

    username = data.get("username", "")
    password = data.get("password", "")
    user = authenticate(request, username=username, password=password)
    if user is None or not user.is_superuser:
        return JsonResponse({"error": "Invalid superuser credentials."}, status=401)
    if not user.is_active:
        return JsonResponse({"error": "This account is inactive."}, status=403)

    login(request, user)
    return JsonResponse({"user": user_payload(user)})


@csrf_exempt
@require_POST
def auth_logout(request):
    logout(request)
    return JsonResponse({"status": "signed_out"})


@require_GET
def auth_me(request):
    if not superuser_required(request):
        return JsonResponse({"user": None}, status=401)
    return JsonResponse({"user": user_payload(request.user)})


@require_GET
def dashboard_summary(request):
    if not superuser_required(request):
        return JsonResponse({"error": "Superuser login required."}, status=401)

    return JsonResponse(
        {
            "counts": {
                "posts": models.InsightPost.objects.count(),
                "services": models.ContentCard.objects.filter(group__in=["home_service", "service_page"]).count(),
                "faqs": models.FaqItem.objects.count(),
                "submissions": models.ContactSubmission.objects.count(),
                "unhandledSubmissions": models.ContactSubmission.objects.filter(is_handled=False).count(),
                "subscriptions": models.NewsletterSubscription.objects.count(),
                "users": User.objects.count(),
                "editableSections": len(DASHBOARD_RESOURCES),
            },
            "recentSubmissions": [
                {
                    "name": item.name,
                    "email": item.email,
                    "subject": item.subject,
                    "createdAt": item.created_at.isoformat(),
                    "isHandled": item.is_handled,
                }
                for item in models.ContactSubmission.objects.all()[:5]
            ],
        }
    )


@require_GET
def dashboard_resources(request):
    if not superuser_required(request):
        return JsonResponse({"error": "Superuser login required."}, status=401)

    resources = {}
    for key, config in DASHBOARD_RESOURCES.items():
        fields = config["fields"]
        field_names = {field.name for field in config["model"]._meta.fields}
        ordering = ["order", "id"] if "order" in field_names else ["id"]
        resources[key] = {
            "label": config["label"],
            "singleton": config.get("singleton", False),
            "fields": fields,
            "items": [
                serialize_resource_item(item, fields)
                for item in config["model"].objects.all().order_by(*ordering)
            ],
        }

    resources["contactSubmissions"] = {
        "label": "Contact Messages",
        "readOnly": True,
        "fields": [
            {"name": "name", "label": "Name", "type": "text"},
            {"name": "email", "label": "Email", "type": "text"},
            {"name": "subject", "label": "Subject", "type": "text"},
            {"name": "message", "label": "Message", "type": "textarea"},
            {"name": "is_handled", "label": "Handled", "type": "boolean"},
        ],
        "items": [
            {
                "id": item.id,
                "display": str(item),
                "name": item.name,
                "email": item.email,
                "subject": item.subject,
                "message": item.message,
                "is_handled": item.is_handled,
                "created_at": item.created_at.isoformat(),
            }
            for item in models.ContactSubmission.objects.all()
        ],
    }
    resources["newsletterSubscriptions"] = {
        "label": "Newsletter Subscribers",
        "readOnly": True,
        "fields": [{"name": "email", "label": "Email", "type": "text"}],
        "items": [
            {"id": item.id, "display": item.email, "email": item.email, "created_at": item.created_at.isoformat()}
            for item in models.NewsletterSubscription.objects.all()
        ],
    }
    resources["users"] = {
        "label": "User Management",
        "fields": USER_RESOURCE_FIELDS,
        "items": [serialize_user(user) for user in User.objects.all().order_by("username")],
    }

    return JsonResponse({"resources": resources})


@csrf_exempt
def dashboard_resource_detail(request, resource_key, item_id=None):
    if not superuser_required(request):
        return JsonResponse({"error": "Superuser login required."}, status=401)
    if resource_key == "users":
        if request.method not in {"POST", "DELETE"}:
            return JsonResponse({"error": "Method not allowed."}, status=405)
        if request.method == "DELETE":
            if item_id is None:
                return JsonResponse({"error": "Item id is required."}, status=400)
            if item_id == request.user.id:
                return JsonResponse({"error": "You cannot delete your own account."}, status=400)
            User.objects.get(id=item_id).delete()
            return JsonResponse({"status": "deleted"})
        try:
            payload = json.loads(request.body.decode("utf-8"))
            user = save_user_from_payload(payload, item_id)
        except (json.JSONDecodeError, ValueError, IntegrityError) as exc:
            return JsonResponse({"error": f"Invalid user payload: {exc}"}, status=400)
        return JsonResponse({"item": serialize_user(user)})

    if resource_key not in DASHBOARD_RESOURCES:
        return JsonResponse({"error": "Unknown dashboard resource."}, status=404)

    config = DASHBOARD_RESOURCES[resource_key]
    model = config["model"]
    fields = config["fields"]

    if request.method not in {"POST", "DELETE"}:
        return JsonResponse({"error": "Method not allowed."}, status=405)

    if request.method == "DELETE":
        if item_id is None:
            return JsonResponse({"error": "Item id is required."}, status=400)
        model.objects.get(id=item_id).delete()
        return JsonResponse({"status": "deleted"})

    try:
        payload = json.loads(request.body.decode("utf-8"))
        cleaned = clean_resource_payload(payload, fields)
    except (json.JSONDecodeError, ValueError) as exc:
        return JsonResponse({"error": f"Invalid payload: {exc}"}, status=400)

    if item_id is None:
        item = model.objects.create(**cleaned)
    else:
        item = model.objects.get(id=item_id)
        for field, value in cleaned.items():
            setattr(item, field, value)
        item.save()

    return JsonResponse({"item": serialize_resource_item(item, fields)})


@csrf_exempt
@require_POST
def contact_submission(request):
    try:
        data = json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON body."}, status=400)

    required = ["name", "email", "message"]
    missing = [field for field in required if not data.get(field)]
    if missing:
        return JsonResponse({"error": f"Missing required field(s): {', '.join(missing)}."}, status=400)

    submission = models.ContactSubmission.objects.create(
        name=data["name"],
        email=data["email"],
        subject=data.get("subject", ""),
        message=data["message"],
    )
    return JsonResponse({"id": submission.id, "status": "received"}, status=201)


@csrf_exempt
@require_POST
def newsletter_subscription(request):
    try:
        data = json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON body."}, status=400)

    email = data.get("email")
    if not email:
        return JsonResponse({"error": "Email is required."}, status=400)

    subscription, _ = models.NewsletterSubscription.objects.get_or_create(email=email)
    return JsonResponse({"id": subscription.id, "status": "subscribed"}, status=201)
