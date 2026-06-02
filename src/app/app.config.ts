import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { withInMemoryScrolling } from '@angular/router';
import {
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  ChevronDown,
  FileText,
  FolderOpen,
  Globe,
  Languages,
  LayoutDashboard,
  LucideAngularModule,
  Mail,
  Megaphone,
  MessageCircleQuestion,
  Newspaper,
  Search,
  UsersRound,
} from 'lucide-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    importProvidersFrom(
      LucideAngularModule.pick({
        ArrowRight,
        Bell,
        BriefcaseBusiness,
        ChevronDown,
        FileText,
        FolderOpen,
        Globe,
        Languages,
        LayoutDashboard,
        Mail,
        Megaphone,
        MessageCircleQuestion,
        Newspaper,
        Search,
        UsersRound,
      }),
    ),
  ],
};
