import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';

import { AuthService, DashboardField, DashboardResource, DashboardSummary } from '../../services/auth.service';

interface DashboardNavItem {
  key: string;
  label: string;
  icon: string;
  hint: string;
}

interface DashboardNavGroup {
  key: string;
  label: string;
  icon: string;
  items: DashboardNavItem[];
}

@Component({
  selector: 'app-admin-dashboard-page',
  imports: [FormsModule, RouterLink, LucideAngularModule],
  templateUrl: './admin-dashboard-page.component.html',
  styleUrl: './admin-dashboard-page.component.scss',
})
export class AdminDashboardPageComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected user = this.auth.user;
  protected summary: DashboardSummary | null = null;
  protected resources: Record<string, DashboardResource> = {};
  protected selectedResourceKey = 'overview';
  protected editingItem: Record<string, any> | null = null;
  protected loading = true;
  protected saving = false;
  protected saveMessage = '';
  protected sidebarCollapsed = signal(false);
  protected mobileSidebarOpen = signal(false);
  protected openNavigationGroups = signal(new Set<string>(['management']));
  protected readonly overviewNav: DashboardNavItem = {
    key: 'overview',
    label: 'Dashboard',
    icon: 'layout-dashboard',
    hint: 'Overview',
  };
  protected readonly navigationGroups: DashboardNavGroup[] = [
    {
      key: 'management',
      label: 'Management',
      icon: 'layout-dashboard',
      items: [this.overviewNav],
    },
    {
      key: 'siteFoundation',
      label: 'Site Foundation',
      icon: 'globe',
      items: [
        { key: 'siteProfile', label: 'Organization', icon: 'languages', hint: 'Public profile' },
        { key: 'homeHero', label: 'Homepage Hero', icon: 'megaphone', hint: 'Hero copy and slider' },
        { key: 'heroActions', label: 'Hero Actions', icon: 'arrow-right', hint: 'Primary buttons' },
        { key: 'partnerLogos', label: 'Partners', icon: 'globe', hint: 'Partner logos' },
        { key: 'newsletterBanner', label: 'Newsletter', icon: 'mail', hint: 'Signup banner' },
      ],
    },
    {
      key: 'pageContent',
      label: 'Page Content',
      icon: 'folder-open',
      items: [
        { key: 'contentCards', label: 'Cards and Sections', icon: 'folder-open', hint: 'Services and blocks' },
        { key: 'textItems', label: 'Text Lists', icon: 'file-text', hint: 'Trust bar and lists' },
        { key: 'counters', label: 'Counters', icon: 'file-text', hint: 'Stats and metrics' },
        { key: 'processSteps', label: 'Process Steps', icon: 'file-text', hint: 'How-it-works flow' },
        { key: 'testimonials', label: 'Testimonials', icon: 'message-circle-question', hint: 'Member feedback' },
        { key: 'faqs', label: 'FAQs', icon: 'message-circle-question', hint: 'Question lists' },
      ],
    },
    {
      key: 'newsResources',
      label: 'News and Resources',
      icon: 'newspaper',
      items: [
        { key: 'insightPosts', label: 'News Posts', icon: 'newspaper', hint: 'Articles and updates' },
        { key: 'insightCategories', label: 'News Categories', icon: 'newspaper', hint: 'Category counts' },
        { key: 'articleComments', label: 'Article Comments', icon: 'message-circle-question', hint: 'Post comments' },
      ],
    },
    {
      key: 'contactFooter',
      label: 'Contact and Footer',
      icon: 'mail',
      items: [
        { key: 'contactInfoCards', label: 'Contact Cards', icon: 'mail', hint: 'Phone, email, office' },
        { key: 'contactAccessLinks', label: 'Access Links', icon: 'arrow-right', hint: 'Contact quick links' },
        { key: 'socialLinks', label: 'Social Links', icon: 'globe', hint: 'Social profiles' },
        { key: 'footerQuickLinks', label: 'Footer Links', icon: 'globe', hint: 'Footer navigation' },
      ],
    },
    {
      key: 'operations',
      label: 'Operations',
      icon: 'briefcase-business',
      items: [
        { key: 'contactSubmissions', label: 'Messages', icon: 'mail', hint: 'Contact inbox' },
        { key: 'newsletterSubscriptions', label: 'Subscribers', icon: 'users-round', hint: 'Newsletter list' },
        { key: 'users', label: 'Users', icon: 'briefcase-business', hint: 'Admin access' },
      ],
    },
  ];
  protected readonly navigation = this.navigationGroups.flatMap((group) => group.items);

  ngOnInit(): void {
    this.auth.getDashboardSummary().subscribe({
      next: (summary) => {
        this.summary = summary;
        this.loading = false;
        this.loadResources();
      },
      error: () => {
        this.loading = false;
        this.router.navigateByUrl('/admin/login');
      },
    });
  }

  protected logout(): void {
    this.auth.logout().subscribe(() => this.router.navigateByUrl('/admin/login'));
  }

  protected toggleSidebar(): void {
    this.sidebarCollapsed.update((value) => !value);
  }

  protected openMobileSidebar(): void {
    this.mobileSidebarOpen.set(true);
  }

  protected closeMobileSidebar(): void {
    this.mobileSidebarOpen.set(false);
  }

  protected toggleNavigationGroup(groupKey: string): void {
    this.openNavigationGroups.update((openGroups) => {
      const nextGroups = new Set(openGroups);
      if (nextGroups.has(groupKey)) {
        nextGroups.delete(groupKey);
      } else {
        nextGroups.add(groupKey);
      }
      return nextGroups;
    });
  }

  protected isNavigationGroupOpen(groupKey: string): boolean {
    return this.openNavigationGroups().has(groupKey);
  }

  protected isNavigationGroupActive(group: DashboardNavGroup): boolean {
    return group.items.some((item) => item.key === this.selectedResourceKey);
  }

  protected selectResource(key: string): void {
    this.selectedResourceKey = key;
    this.editingItem = null;
    this.saveMessage = '';
    this.openNavigationGroupForResource(key);
    this.closeMobileSidebar();
    if (key !== 'overview' && !this.resources[key]) {
      this.loadResources();
    }
  }

  protected selectedResource(): DashboardResource | null {
    return this.resources[this.selectedResourceKey] ?? null;
  }

  protected selectedNavItem(): DashboardNavItem {
    return this.navigation.find((item) => item.key === this.selectedResourceKey) ?? this.overviewNav;
  }

  protected canCreateSelectedResource(): boolean {
    const resource = this.selectedResource();
    if (!resource || resource.readOnly) {
      return false;
    }
    return !resource.singleton || resource.items.length === 0;
  }

  protected startCreate(): void {
    if (!this.canCreateSelectedResource()) {
      return;
    }
    const resource = this.selectedResource();
    if (!resource) {
      return;
    }
    this.editingItem = Object.fromEntries(resource.fields.map((field) => [field.name, this.defaultValue(field)]));
  }

  protected startEdit(item: Record<string, any>): void {
    this.editingItem = { ...item };
  }

  protected cancelEdit(): void {
    this.editingItem = null;
  }

  protected saveItem(event: Event): void {
    event.preventDefault();
    const resource = this.selectedResource();
    if (!this.editingItem || this.saving || resource?.readOnly) {
      return;
    }

    this.saving = true;
    this.saveMessage = '';
    this.auth.saveDashboardResource(this.selectedResourceKey, this.editingItem).subscribe({
      next: () => {
        this.saving = false;
        this.editingItem = null;
        this.saveMessage = 'Saved successfully.';
        this.loadResources();
        this.refreshSummary();
      },
      error: () => {
        this.saving = false;
        this.saveMessage = 'Could not save. Check required fields and try again.';
      },
    });
  }

  protected deleteItem(item: Record<string, any>): void {
    const resource = this.selectedResource();
    const id = item['id'];
    if (!id || resource?.readOnly) {
      return;
    }
    this.auth.deleteDashboardResource(this.selectedResourceKey, id).subscribe(() => {
      this.loadResources();
      this.refreshSummary();
    });
  }

  protected displayValue(item: Record<string, any>, field: DashboardField): string {
    const value = item[field.name];
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    if (value && typeof value === 'object') {
      return JSON.stringify(value);
    }
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    return value ?? '';
  }

  protected fieldValue(field: DashboardField): any {
    const value = this.editingItem?.[field.name];
    return field.type === 'json' ? JSON.stringify(value ?? [], null, 2) : value;
  }

  protected setFieldValue(field: DashboardField, value: any): void {
    if (!this.editingItem) {
      return;
    }
    if (field.type === 'number') {
      this.editingItem[field.name] = value === '' ? '' : Number(value);
      return;
    }
    if (field.type === 'boolean') {
      this.editingItem[field.name] = Boolean(value);
      return;
    }
    if (field.type === 'json') {
      try {
        this.editingItem[field.name] = JSON.parse(value || '[]');
      } catch {
        this.editingItem[field.name] = value;
      }
      return;
    }
    this.editingItem[field.name] = value;
  }

  private loadResources(): void {
    this.auth.getDashboardResources().subscribe(({ resources }) => {
      this.resources = resources;
    });
  }

  private refreshSummary(): void {
    this.auth.getDashboardSummary().subscribe((summary) => (this.summary = summary));
  }

  private openNavigationGroupForResource(key: string): void {
    const group = this.navigationGroups.find((navGroup) => navGroup.items.some((item) => item.key === key));
    if (!group || this.openNavigationGroups().has(group.key)) {
      return;
    }
    this.openNavigationGroups.update((openGroups) => new Set(openGroups).add(group.key));
  }

  private defaultValue(field: DashboardField): any {
    if (field.type === 'number') {
      return 0;
    }
    if (field.type === 'boolean') {
      return true;
    }
    if (field.type === 'json') {
      return [];
    }
    return '';
  }
}
