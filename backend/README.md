# TAMONGSCO Django backend

This backend gives the Angular site editable content through Django admin and PostgreSQL.

## Setup

1. Install Python dependencies:

   ```bash
   python3 -m pip install -r ../requirements.txt
   ```

2. Create a local PostgreSQL database. The project defaults match the local Homebrew setup below, but you can still override them in your shell:

   ```bash
   export POSTGRES_DB=tamongsco
   export POSTGRES_USER=mac
   export POSTGRES_PASSWORD=
   export POSTGRES_HOST=127.0.0.1
   export POSTGRES_PORT=5433
   ```

3. Apply migrations and seed the current site content:

   ```bash
   python3 manage.py migrate
   python3 manage.py seed_site_content
   python3 manage.py createsuperuser
   ```

4. Start the API/admin server:

   ```bash
   python3 manage.py runserver 127.0.0.1:8000
   ```

## URLs

- Site content API: `http://127.0.0.1:8000/api/site-content/`
- Superuser login API: `POST http://127.0.0.1:8000/api/auth/login/`
- Superuser session API: `GET http://127.0.0.1:8000/api/auth/me/`
- Dashboard summary API: `GET http://127.0.0.1:8000/api/dashboard/summary/`
- Dashboard resources API: `GET http://127.0.0.1:8000/api/dashboard/resources/`
- Contact submissions API: `POST http://127.0.0.1:8000/api/contact/`
- Newsletter API: `POST http://127.0.0.1:8000/api/newsletter/`

The Angular frontend reads from `src/environments/environment.ts`. If Django is not running, Angular falls back to the existing static content.

Angular admin routes:

- Login: `http://localhost:4200/admin/login`
- Dashboard: `http://localhost:4200/admin/dashboard`

Use the Angular dashboard for day-to-day management. It provides the themed interface for content, news, FAQs, organization details, messages, and subscribers.
