export type Task = {
    id: number;
    title: string;
    description: string;
    status: 'TO_DO' | 'IN_PROGRESS' | 'DONE';
    priority: 'LOW' | 'MED' | 'HIGH';
    version: number;
};