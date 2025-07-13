import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type HistoryItem = {
    expression: string;
    result: string | number;
};

type State = {
    total: number;
    currentExpression: string;
    lastExpression: string;
    history: HistoryItem[];
    setLastExpression: (expression: string) => void;
    setCurrentExpression: (expression: string) => void;
    setHistory: (item: HistoryItem) => void;
    reset: () => void;
    setTotal: (value: number) => void;
};

const useStore = create<State>()(
    persist(
        (set) => ({
            total: 0,
            currentExpression: '',
            lastExpression: '',
            history: [],
            setLastExpression: (expression: string) =>
                set(() => ({ lastExpression: expression })),
            setCurrentExpression: (expression: string) =>
                set(() => ({ currentExpression: expression })),
            setHistory: (item: HistoryItem) =>
                set((state) => ({ history: [...state.history, item] })),
            reset: () =>
                set({ history: [] }),
            setTotal: (value: number) =>
                set(() => ({ total: value })),
        }),
        {
            name: 'calc-store',
            partialize: (state) => ({
                total: state.total,
                lastExpression: state.lastExpression,
                history: state.history,
            }),
        }
    )
);

export default useStore;
