// Registry of every editable content document. One file per key in src/content/.
import type { ContentDefinition } from './types';
import { definition as site } from '@/content/site';
import { definition as navbar } from '@/content/navbar';
import { definition as footer } from '@/content/footer';
import { definition as floating } from '@/content/floating';
import { definition as modals } from '@/content/modals';
import { definition as home } from '@/content/home';
import { definition as testimonials } from '@/content/testimonials';
import { definition as about } from '@/content/about';
import { definition as contact } from '@/content/contact';
import { definition as mba } from '@/content/mba';
import { definition as privacy } from '@/content/privacy';
import { definition as terms } from '@/content/terms';
import { definition as collegesIndex } from '@/content/colleges-index';
import { definition as examsIndex } from '@/content/exams-index';
import { definition as blogIndex } from '@/content/blog-index';
import { definition as iemHub } from '@/content/iem-hub';
import { definition as iemBtech } from '@/content/iem-btech';
import { definition as iemCse } from '@/content/iem-cse';
import { definition as iemCseAiMl } from '@/content/iem-cse-ai-ml';
import { definition as iemEce } from '@/content/iem-ece';
import { definition as iemIt } from '@/content/iem-it';
import { definition as iemElectrical } from '@/content/iem-electrical';
import { definition as iemMechanical } from '@/content/iem-mechanical';
import { definition as collegePage } from '@/content/college-page';
import { definition as examPage } from '@/content/exam-page';
import { definition as blogPost } from '@/content/blog-post';

export const CONTENT_DEFINITIONS: ContentDefinition[] = [
  site,
  navbar,
  footer,
  floating,
  modals,
  home,
  testimonials,
  about,
  contact,
  mba,
  privacy,
  terms,
  collegesIndex,
  examsIndex,
  blogIndex,
  iemHub,
  iemBtech,
  iemCse,
  iemCseAiMl,
  iemEce,
  iemIt,
  iemElectrical,
  iemMechanical,
  collegePage,
  examPage,
  blogPost,
];

const BY_KEY = new Map(CONTENT_DEFINITIONS.map((d) => [d.key, d]));

export function getDefinition(key: string): ContentDefinition | undefined {
  return BY_KEY.get(key);
}

export type ContentKey = (typeof CONTENT_DEFINITIONS)[number]['key'];
