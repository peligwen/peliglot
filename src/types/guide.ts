import type { ComponentType } from 'react';

export interface GuideMeta {
  id: number;
  title: string;
  subtitle?: string;
  cat: string;
  color: string;
  icon: string;
}

export type GuideComponents = Array<ComponentType>;
export type CategoryColors = Record<string, string>;
