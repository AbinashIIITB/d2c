import type { ContentDefinition } from '@/lib/cms/types';
import { branchSections, type IemBranchContent } from './iem-branch.schema';
import { iemMechanicalDefaults } from './iem-mechanical.defaults';

export const definition: ContentDefinition<IemBranchContent> = {
  key: 'iem-mechanical',
  title: 'IEM Kolkata Mechanical',
  group: 'Landing pages',
  previewPath: '/iem-kolkata-mechanical-engineering-admission',
  sections: branchSections,
  defaults: iemMechanicalDefaults,
};
