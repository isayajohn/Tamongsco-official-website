import { Routes } from '@angular/router';

import { AboutPageComponent } from './pages/about/about-page.component';
import { ContactPageComponent } from './pages/contact/contact-page.component';
import { ElementsPageComponent } from './pages/elements/elements-page.component';
import { HomePageComponent } from './pages/home/home-page.component';
import { InsightsPageComponent } from './pages/insights/insights-page.component';
import { ServicesPageComponent } from './pages/services/services-page.component';
import { SinglePostPageComponent } from './pages/single-post/single-post-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'services', component: ServicesPageComponent },
  { path: 'insights', component: InsightsPageComponent },
  { path: 'insights/latest-updates', component: SinglePostPageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'elements', component: ElementsPageComponent },
  { path: 'resources', component: ElementsPageComponent },
  { path: '**', redirectTo: '' },
];
