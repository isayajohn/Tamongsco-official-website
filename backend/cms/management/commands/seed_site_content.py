from django.core.management.base import BaseCommand

from cms import models


def upsert(model, lookup, defaults):
    obj, _ = model.objects.update_or_create(**lookup, defaults=defaults)
    return obj


class Command(BaseCommand):
    help = "Seed the editable TAMONGSCO site content used by the Angular frontend."

    def handle(self, *args, **options):
        upsert(
            models.SiteProfile,
            {"id": 1},
            {
                "name": "TAMONGSCO",
                "full_name": "Tanzania Managers and Owners of Non-Government Schools and Colleges Organization",
                "tagline": "Representing non-government education providers in Tanzania.",
                "location": "Dodoma, Tanzania 63088",
                "phone": "+255 569 316 570",
                "email": "info@tamongsco.tz",
                "website": "tamongsco.tz",
            },
        )
        upsert(
            models.NewsletterBanner,
            {"id": 1},
            {
                "title": "Stay Connected",
                "description": "Follow TAMONGSCO for education updates, member notices, and community news.",
            },
        )
        upsert(
            models.HomeHero,
            {"id": 1},
            {
                "badge": "National Education Network",
                "title_html": "Stronger representation for <span>Tanzania&apos;s schools and colleges</span>",
                "description": "TAMONGSCO connects non-government institutions, supports collaboration, and gives members a stronger voice in education.",
                "slider_images": ["img/bg-img/1.jpg", "img/bg-img/3.jpg", "img/bg-img/5.jpg"],
            },
        )

        self.seed_rows(
            models.HeroAction,
            [
                {"label": "Become a Member", "route": "/contact", "variant": "primary"},
                {"label": "Explore Services", "route": "/services", "variant": "ghost"},
            ],
            "label",
        )
        self.seed_rows(
            models.PartnerLogo,
            [
                {"name": "TAMONGSCO", "image": "img/partners/tamongsco-clean.jpeg"},
                {"name": "Office of the Attorney General Tanzania", "image": "img/partners/attorney-general-seal.png"},
                {"name": "United Republic of Tanzania", "image": "img/partners/tanzania-emblem.png"},
                {"name": "Afrigotech", "image": "img/partners/afrigotech-blue.png"},
            ],
            "name",
        )

        self.seed_text("trust", [
            "Representing non-government education providers in Tanzania",
            "Advocacy for educational excellence",
            "Collaboration with schools and colleges",
            "Communication with government bodies",
            "Membership and resource sharing",
            "News, updates, and community support",
            "Representing non-government education providers in Tanzania",
            "Advocacy for educational excellence",
        ])
        self.seed_text("footer_service", ["Advocacy", "Collaboration", "Resources", "Membership", "News & Updates"])
        self.seed_text("about_feature", [
            "Connects and represents non-government educational institutions across Tanzania",
            "Promotes educational excellence through advocacy and collaboration",
            "Enhances communication between schools, colleges, and government bodies",
            "Provides resources and updates that help members thrive",
        ])
        self.seed_text("contact_reason", [
            "Representation for non-government schools and colleges",
            "Collaboration between members and public stakeholders",
            "Access to timely resources and updates",
            "Membership support and peer networking",
            "A shared voice for educational excellence",
        ])
        self.seed_text("insight_tag", ["TAMONGSCO", "Education", "Schools", "Colleges", "Membership", "Advocacy", "Resources", "Events", "Updates"])
        self.seed_rows(
            models.TextItem,
            [
                {"group": "why_us", "title": "National Representation", "description": "We connect and represent non-government educational institutions across Tanzania."},
                {"group": "why_us", "title": "Government Engagement", "description": "We promote better communication between member institutions and government bodies."},
                {"group": "why_us", "title": "Useful Updates", "description": "We share timely resources, information, and community updates that help members move forward."},
            ],
            ("group", "title"),
        )

        self.seed_cards("home_service", [
            {"icon": "campaign", "title": "Advocacy", "description": "We advocate for the interests of our members in policy discussions so their voices are heard in educational matters.", "link": "/services", "delay": "100ms"},
            {"icon": "diversity_3", "title": "Collaboration", "description": "We foster collaboration between educational institutions and government agencies to strengthen the education framework.", "link": "/services", "delay": "200ms"},
            {"icon": "folder_open", "title": "Resources", "description": "We provide resources and information that help members improve educational practice and community engagement.", "link": "/elements", "delay": "300ms"},
        ])
        self.seed_cards("service_page", [
            {"icon": "campaign", "title": "Advocacy", "description": "TAMONGSCO represents non-government schools and colleges in policy conversations that affect education quality.", "delay": "100ms"},
            {"icon": "diversity_3", "title": "Collaboration", "description": "We create space for member institutions and public stakeholders to work together on practical education priorities.", "delay": "200ms"},
            {"icon": "folder_open", "title": "Resources", "description": "Members receive helpful updates, shared information, and practical guidance that support day-to-day institution management.", "delay": "300ms"},
            {"icon": "groups", "title": "Membership Support", "description": "Joining TAMONGSCO connects schools and colleges to a wider network of peers, support, and shared representation.", "delay": "400ms"},
            {"icon": "article", "title": "News & Updates", "description": "We help members stay informed about education developments, community news, and organization announcements.", "delay": "500ms"},
            {"icon": "forum", "title": "Community Connection", "description": "TAMONGSCO encourages institutions to learn from each other, exchange ideas, and build stronger relationships across Tanzania.", "delay": "600ms"},
        ])
        self.seed_cards("mission_vision_value", [
            {"icon": "checklist", "title": "Our Mission", "description": "To connect and represent non-government educational institutions across Tanzania while promoting excellence and collaboration.", "delay": "100ms"},
            {"icon": "visibility", "title": "Our Vision", "description": "A stronger education sector where schools and colleges work together, stay informed, and contribute to a brighter future.", "delay": "250ms"},
            {"icon": "favorite", "title": "Our Values", "description": "Advocacy, collaboration, practical support, and a shared commitment to improving education in Tanzania.", "delay": "400ms"},
        ])
        self.seed_cards("team_member", [
            {"title": "Advocacy Support", "description": "Representing member interests in education policy matters", "image": "img/bg-img/15.jpg", "delay": "100ms"},
            {"title": "Institution Collaboration", "description": "Strengthening the relationship between members and public stakeholders", "image": "img/bg-img/16.jpg", "delay": "200ms"},
            {"title": "Shared Resources", "description": "Providing practical information and updates for schools and colleges", "image": "img/bg-img/17.jpg", "delay": "300ms"},
            {"title": "Membership Growth", "description": "Building a connected network of non-government education providers", "image": "img/bg-img/18.jpg", "delay": "400ms"},
        ])
        self.seed_cards("resource", [
            {"icon": "folder_open", "title": "Member Guides & Templates", "description": "Access standard documents, templates, and policy guides designed for member institutions.", "link": "/resources"},
            {"icon": "description", "title": "Training & Workshop Materials", "description": "Find presentations, toolkits, and learning resources used in TAMONGSCO workshops and meetings.", "link": "/resources"},
            {"icon": "book", "title": "Advocacy & Regulatory Briefs", "description": "Review advocacy briefs, educational policy summaries, and important regulatory updates.", "link": "/resources"},
        ])

        self.seed_rows(models.CounterItem, [
            {"group": "shared", "icon": "star", "value": 3, "suffix": "", "label": "Core Service Areas", "delay": "100ms"},
            {"group": "shared", "icon": "link", "value": 5, "suffix": "", "label": "Quick Access Links", "delay": "200ms"},
            {"group": "shared", "icon": "forum", "value": 3, "suffix": "", "label": "Member Testimonials", "delay": "300ms"},
            {"group": "shared", "icon": "article", "value": 2, "suffix": "", "label": "Latest Updates Shown", "delay": "400ms"},
            {"group": "elements", "icon": "groups", "value": 150, "suffix": "+", "label": "Member Institutions"},
            {"group": "elements", "icon": "article", "value": 75, "suffix": "+", "label": "Shared Resources"},
            {"group": "elements", "icon": "forum", "value": 25, "suffix": "+", "label": "Annual Events"},
            {"group": "elements", "icon": "star", "value": 98, "suffix": "%", "label": "Member Satisfaction"},
        ], ("group", "label"))

        self.seed_rows(models.ProcessStep, [
            {"number": "01", "title": "Join the Network", "description": "Become part of TAMONGSCO to connect with peers and strengthen your institution’s voice.", "delay": "100ms"},
            {"number": "02", "title": "Access Resources", "description": "Receive timely updates, practical information, and shared materials relevant to non-government education.", "delay": "250ms"},
            {"number": "03", "title": "Engage in Collaboration", "description": "Work alongside other schools, colleges, and stakeholders to address education priorities together.", "delay": "400ms"},
            {"number": "04", "title": "Grow with Advocacy", "description": "Benefit from stronger representation in the conversations that shape the education environment.", "delay": "550ms"},
        ], "number")

        self.seed_faqs("services", [
            ("What does TAMONGSCO do?", "TAMONGSCO represents non-government schools and colleges in Tanzania through advocacy, collaboration, and resource sharing."),
            ("Who can join TAMONGSCO?", "The association is designed for managers and owners of non-government schools and colleges who want stronger representation and shared support."),
            ("What support do members receive?", "Members gain access to updates, networking opportunities, practical resources, and a collective voice in education matters."),
            ("How can I contact TAMONGSCO?", "You can reach the association through the contact section using the published phone number, email address, or Dodoma office details."),
        ])
        self.seed_faqs("elements_one", [
            ("Where can I start as a new member?", "Start with the membership section, then review the resources and updates shared by TAMONGSCO."),
            ("What kind of resources are available?", "The site highlights resources, updates, FAQs, and practical information intended to support member institutions."),
            ("Does TAMONGSCO work with government bodies?", "Yes. Collaboration with government bodies is part of the organization’s role in strengthening education delivery."),
        ])
        self.seed_faqs("elements_two", [
            ("How does TAMONGSCO support collaboration?", "It brings institutions together and helps strengthen communication across the education community."),
            ("What updates can members expect?", "Members can follow news, updates, and community information shared through the organization’s channels."),
            ("Can I contact TAMONGSCO directly?", "Yes. The organization publishes its phone number, email address, and Dodoma location for direct inquiries."),
        ])

        self.seed_rows(models.Testimonial, [
            {"quote": "The support from TAMONGSCO has greatly improved our school's operations. Their insights are invaluable.", "name": "Alice Mwangi", "role": "Principal", "image": "img/logo.jpeg", "delay": "100ms"},
            {"quote": "Working with TAMONGSCO has enabled us to access better resources and network with other institutions.", "name": "John Kisumu", "role": "Headmaster", "image": "img/logo.jpeg", "delay": "250ms"},
            {"quote": "TAMONGSCO's guidance on educational policy has been a game changer for our college's growth.", "name": "Grace Nduna", "role": "Director", "image": "img/logo.jpeg", "delay": "400ms"},
        ], "name")
        article_body = """
<p class="ve-article-lead">TAMONGSCO presents itself as a national platform for non-government schools and colleges, focused on collaboration, representation, and educational excellence across Tanzania.</p>
<h3>1. Empowering Education</h3>
<p>The homepage headline emphasizes uniting schools and colleges for a brighter future, positioning the association as a connector for education providers throughout the country.</p>
<h3>2. Representation and Collaboration</h3>
<p>The site highlights advocacy, collaboration, and resources as its public-facing support areas while also stressing communication with government bodies.</p>
<blockquote class="ve-blockquote"><p>"At TAMONGSCO, we connect and represent non-government educational institutions across Tanzania."</p><cite>- Homepage message</cite></blockquote>
<h3>3. Practical Member Support</h3>
<p>Membership is described as a way to access networking opportunities, resources, and support that help institutions thrive in a competitive environment.</p>
<h3>4. Community Voice</h3>
<p>Member feedback on the site points to better operations, stronger policy guidance, and improved access to helpful resources through the association.</p>
<h3>5. Staying Updated</h3>
<p>The news area and quick links show that updates, events, and member information are part of the organization’s ongoing communication.</p>
""".strip()
        self.seed_rows(models.InsightPost, [
            {"category": "Updates", "title": "Policy Dialogue Highlights for Member Institutions", "excerpt": "A quick look at the advocacy themes and education priorities currently shaping conversations with stakeholders.", "body_html": article_body, "image": "img/bg-img/10.jpg", "date": "January 28, 2026", "route": "/insights/latest-updates", "delay": "100ms"},
            {"category": "Resources", "title": "Preparing Schools and Colleges for the New Term", "excerpt": "Practical reminders and shared guidance to help institutions plan confidently and communicate clearly.", "body_html": article_body, "image": "img/bg-img/11.jpg", "date": "January 28, 2026", "route": "/insights/latest-updates", "delay": "250ms"},
            {"category": "Membership", "title": "Become a Member of the National Education Network", "excerpt": "Join TAMONGSCO to access networking, shared resources, and stronger representation for your institution.", "body_html": article_body, "image": "img/bg-img/12.jpg", "date": "January 28, 2026", "route": "/insights/latest-updates", "delay": "400ms"},
        ], "title")
        self.seed_rows(models.InsightCategory, [
            {"label": "Updates", "count": 1}, {"label": "Membership", "count": 1}, {"label": "Resources", "count": 1},
            {"label": "Advocacy", "count": 1}, {"label": "Community", "count": 1}, {"label": "Events", "count": 1},
        ], "label")
        self.seed_rows(models.ArticleComment, [
            {"name": "Alice Mwangi", "date": "January 28, 2026", "text": "The support from TAMONGSCO has greatly improved our school's operations. Their insights are invaluable.", "image": "img/logo.jpeg"},
            {"name": "John Kisumu", "date": "January 28, 2026", "text": "Working with TAMONGSCO has enabled us to access better resources and network with other institutions.", "image": "img/logo.jpeg", "is_reply": True},
            {"name": "Grace Nduna", "date": "January 28, 2026", "text": "TAMONGSCO's guidance on educational policy has been a game changer for our college's growth.", "image": "img/logo.jpeg"},
        ], "name")
        self.seed_rows(models.ContactInfoCard, [
            {"icon": "call", "title": "Call Us", "text": "+255 569 316 570"},
            {"icon": "mail", "title": "Email Us", "text": "info@tamongsco.tz"},
            {"icon": "location_on", "title": "Visit Our Office", "text": "Dodoma, Tanzania 63088"},
        ], "title")
        self.seed_rows(models.ContactAccessLink, [
            {"label": "Membership", "value": "Join and connect with peers"},
            {"label": "Resources", "value": "Access updates and practical information"},
            {"label": "News & Updates", "value": "Follow organization announcements"},
        ], "label")
        self.seed_rows(models.SocialLink, [
            {"label": "Facebook", "icon": "public", "href": "javascript:void(0)"},
            {"label": "Instagram", "icon": "photo_camera", "href": "javascript:void(0)"},
            {"label": "Twitter", "icon": "forum", "href": "javascript:void(0)"},
            {"label": "LinkedIn", "icon": "business_center", "href": "javascript:void(0)"},
        ], "label")
        self.seed_rows(models.FooterQuickLink, [
            {"label": "Home", "route": "/"},
            {"label": "About TAMONGSCO", "route": "/about"},
            {"label": "Our Services", "route": "/services"},
            {"label": "News & Updates", "route": "/insights"},
            {"label": "Contact Us", "route": "/contact"},
        ], "label")

        self.stdout.write(self.style.SUCCESS("Seeded TAMONGSCO site content."))

    def seed_text(self, group, titles):
        rows = [{"group": group, "title": title} for title in titles]
        self.seed_rows(models.TextItem, rows, ("group", "title"))

    def seed_cards(self, group, rows):
        self.seed_rows(models.ContentCard, [{**row, "group": group} for row in rows], ("group", "title"))

    def seed_faqs(self, group, rows):
        self.seed_rows(
            models.FaqItem,
            [{"group": group, "question": question, "answer": answer} for question, answer in rows],
            ("group", "question"),
        )

    def seed_rows(self, model, rows, lookup_field):
        for index, row in enumerate(rows):
            row = {**row, "order": index, "is_active": True}
            if isinstance(lookup_field, tuple):
                lookup = {field: row[field] for field in lookup_field}
            else:
                lookup = {lookup_field: row[lookup_field]}
            defaults = {key: value for key, value in row.items() if key not in lookup}
            upsert(model, lookup, defaults)
