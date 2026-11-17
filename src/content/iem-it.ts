import type { ContentDefinition } from '@/lib/cms/types';
import { branchSections, type IemBranchContent } from './iem-branch.schema';
import { iemItDefaults } from './iem-it.defaults';

export const definition: ContentDefinition<IemBranchContent> = {
  key: 'iem-it',
  title: 'IEM Kolkata IT',
  group: 'Landing pages',
  previewPath: '/iem-kolkata-it-admission',
  sections: branchSections,
  defaults: iemItDefaults,
};
