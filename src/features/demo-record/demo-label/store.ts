import { useCallback, useState } from "react";

export function useDemoLabelUiStore() {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openCreate = useCallback(() => {
    setEditingId(null);
    setIsFormOpen(true);
  }, []);

  const openEdit = useCallback((id: number) => {
    setEditingId(id);
    setIsFormOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setIsFormOpen(false);
    setEditingId(null);
  }, []);

  return {
    editingId,
    isFormOpen,
    openCreate,
    openEdit,
    closeForm,
  };
}
