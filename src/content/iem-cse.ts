import type { ContentDefinition } from '@/lib/cms/types';
import { branchSections, type IemBranchContent } from './iem-branch.schema';
import { iemCseDefaults } from './iem-cse.defaults';

export const definition: ContentDefinition<IemBranchContent> = {
  key: 'iem-cse',
  title: 'IEM Kolkata CSE',
  group: 'Landing pages',
  previewPath: '/iem-kolkata-cse-admission',
  sections: branchSections,
  defaults: iemCseDefaults,
};
