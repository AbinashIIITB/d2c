import type { ContentDefinition } from '@/lib/cms/types';
import { branchSections, type IemBranchContent } from './iem-branch.schema';
import { iemElectricalDefaults } from './iem-electrical.defaults';

export const definition: ContentDefinition<IemBranchContent> = {
  key: 'iem-electrical',
  title: 'IEM Kolkata Electrical',
  group: 'Landing pages',
  previewPath: '/iem-kolkata-electrical-engineering-admission',
  sections: branchSections,
  defaults: iemElectricalDefaults,
};
