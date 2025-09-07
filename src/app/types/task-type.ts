import { PriorityType } from "./priority-type";
import { ProgressionType } from "./progression-type";

export type Task = {
    id: number;
    title: string;
    description: string;
    status: ProgressionType;
    priority: PriorityType;
    version: number;
};