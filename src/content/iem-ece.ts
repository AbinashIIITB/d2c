import type { ContentDefinition } from '@/lib/cms/types';
import { branchSections, type IemBranchContent } from './iem-branch.schema';
import { iemEceDefaults } from './iem-ece.defaults';

export const definition: ContentDefinition<IemBranchContent> = {
  key: 'iem-ece',
  title: 'IEM Kolkata ECE',
  group: 'Landing pages',
  previewPath: '/iem-kolkata-ece-admission',
  sections: branchSections,
  defaults: iemEceDefaults,
};
