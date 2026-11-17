'use client';

import { useParams } from 'next/navigation';
import { ContentEditor } from '@/components/admin/cms/ContentEditor';

export default function ContentEditorPage() {
  const params = useParams<{ key: string }>();
  const key = Array.isArray(params.key) ? params.key[0] : params.key;
  return <ContentEditor key={key} contentKey={key} />;
}
