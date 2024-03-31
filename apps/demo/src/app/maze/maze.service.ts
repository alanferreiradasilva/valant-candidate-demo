import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MazeService {
    private mazeList = new BehaviorSubject<string[][]>([]);
    mazeList$ = this.mazeList.asObservable();

    constructor() {}

    updateMazeList(value: string[][]) {
        this.mazeList.next(value);
    }
}