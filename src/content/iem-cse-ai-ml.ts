import type { ContentDefinition } from '@/lib/cms/types';
import { branchSections, type IemBranchContent } from './iem-branch.schema';
import { iemCseAiMlDefaults } from './iem-cse-ai-ml.defaults';

export const definition: ContentDefinition<IemBranchContent> = {
  key: 'iem-cse-ai-ml',
  title: 'IEM Kolkata CSE AI & ML',
  group: 'Landing pages',
  previewPath: '/iem-kolkata-cse-ai-ml-admission',
  sections: branchSections,
  defaults: iemCseAiMlDefaults,
};
