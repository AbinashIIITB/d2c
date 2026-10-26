'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

interface DeleteExamButtonProps {
  id: string;
  name: string;
}

export function DeleteExamButton({ id, name }: DeleteExamButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(`/api/admin/exams/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Failed to delete exam');
    }

    router.refresh();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        title="Delete exam"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      <ConfirmDeleteModal
        isOpen={isOpen}
        title="Delete Exam"
        itemName={name}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
