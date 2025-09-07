import { Routes } from '@angular/router';
import { TaskBoardView } from './views/task-board-view/task-board-view';
import { AuthView } from './views/auth-view/auth-view';

export const routes: Routes = [
    { path: '', component: TaskBoardView },
    { path: 'auth', component: AuthView }
];
