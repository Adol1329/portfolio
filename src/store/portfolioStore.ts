import type { PortfolioStore, Project, SkillCategory, Profile, CVInfo } from './types';
import { initialData } from './initialData';

const STORE_KEY = 'portfolio_data';

export function getStore(): PortfolioStore {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return initialData;
    return JSON.parse(raw) as PortfolioStore;
  } catch {
    return initialData;
  }
}

function saveStore(data: PortfolioStore): void {
  data.lastUpdated = new Date().toISOString();
  localStorage.setItem(STORE_KEY, JSON.stringify(data));
}

// ── Projects ──────────────────────────────────────────────────────────────────

export function getPublishedProjects(): Project[] {
  return getStore()
    .projects.filter((p) => p.published)
    .sort((a, b) => a.order - b.order);
}

export function getAllProjects(): Project[] {
  return getStore().projects.sort((a, b) => a.order - b.order);
}

export function saveProject(project: Project): void {
  const store = getStore();
  const idx = store.projects.findIndex((p) => p.id === project.id);
  project.updatedAt = new Date().toISOString();
  if (idx >= 0) {
    store.projects[idx] = project;
  } else {
    project.createdAt = new Date().toISOString();
    store.projects.push(project);
  }
  saveStore(store);
}

export function deleteProject(id: string): void {
  const store = getStore();
  store.projects = store.projects.filter((p) => p.id !== id);
  saveStore(store);
}

// ── Skills ────────────────────────────────────────────────────────────────────

export function getSkillCategories(): SkillCategory[] {
  return getStore().skillCategories;
}

export function saveSkillCategories(categories: SkillCategory[]): void {
  const store = getStore();
  store.skillCategories = categories;
  saveStore(store);
}

// ── Profile ───────────────────────────────────────────────────────────────────

export function getProfile(): Profile {
  return getStore().profile;
}

export function saveProfile(profile: Profile): void {
  const store = getStore();
  store.profile = profile;
  saveStore(store);
}

// ── CV ────────────────────────────────────────────────────────────────────────

export function getCVInfo(): CVInfo {
  return getStore().cv;
}

export function saveCVInfo(cv: CVInfo): void {
  const store = getStore();
  store.cv = cv;
  saveStore(store);
}

// ── Reset (dev utility) ───────────────────────────────────────────────────────

export function resetStore(): void {
  localStorage.removeItem(STORE_KEY);
}
