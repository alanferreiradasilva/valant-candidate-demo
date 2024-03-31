import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { StuffService } from '../stuff/stuff.service';
import { LoggingService } from '../logging/logging.service';
import { MazeCardComponent } from './maze-card/maze-card.component';
import { MazeService } from '../maze/maze.service';

@Component({
  selector: 'maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.scss'],
})
export class MazeComponent implements OnInit {
  public title = 'Maze Card demo';
  
  public data: string[];

  @ViewChild(MazeCardComponent) mazeCard!: MazeCardComponent;

  playerPosition: { x: number, y: number };
  initialPosition: { x: number, y: number };
  previousPosition: { x: number, y: number };
  
  public mazeList: string [][] = [];

  constructor(private logger: LoggingService, private stuffService: StuffService, private mazeService: MazeService) {}

  ngOnInit() {
    this.stuffService.getScenarios().subscribe({
      next: (response: string[][]) => {
        this.mazeList = response;
        this.mazeService.updateMazeList(this.mazeList);
      },
      error: (error) => {
        this.logger.error('Error getting stuff: ', error);
      },
    });

    this.mazeService.mazeList$.subscribe(val=>{ this.mazeList = val; });
  }  

  openMaze(i: number) {
    const maze = this.mazeList[i];
    this.mazeCard.openMazeCardModal(maze);
  }
}
