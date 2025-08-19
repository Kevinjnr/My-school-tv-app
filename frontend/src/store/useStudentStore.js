import { create } from "zustand";

const useStudentStore = create((set) => ({
  student: null,
  setStudent: (student) => set((state) => ({ student })),
}));

export default useStudentStore;
