import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'maze-card',
  templateUrl: './maze-card.component.html',
  styleUrls: ['./maze-card.component.scss'],
})
export class MazeCardComponent implements OnInit {
  public title = 'Maze Card demo';
  public data: string[];

  playerPosition: { x: number, y: number };
  initialPosition: { x: number, y: number };
  previousPosition: { x: number, y: number };
  
  currentCellValue: string;
  
  public maze: string [][] = [
    ['S','O','X','X','X','X','X','X','X','X'], 
    ['O','O','O','X','X','X','X','X','X','X'], 
    ['O','X','O','O','O','X','O','O','O','O'], 
    ['X','X','X','X','O','X','O','X','X','O'], 
    ['O','O','O','O','O','O','O','X','X','O'], 
    ['O','X','X','O','X','X','X','X','X','O'], 
    ['O','O','O','O','X','X','X','X','X','E']
  ];

  constructor(/*private logger: LoggingService, private stuffService: StuffService*/) {}

  ngOnInit() {
    this.playerPosition = this.startPosition();
  }
  
  private startPosition() {
    const maze = this.maze;
    for (let x = 0; x < maze.length; x++) {
      for (let y = 0; y < maze[x].length; y++) {
        const element = maze[x][y].toUpperCase();
        
        if (element === 'S') {
          this.currentCellValue = element;
          this.initialPosition = { x: x, y: y };
          this.previousPosition = { x: x, y: y };
          return { x: x, y: y };
        }
      }
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {

    this.previousPosition = { x: this.playerPosition.x, y: this.playerPosition.y };

    switch (event.key) {
      case 'ArrowUp':
        this.playerPosition.y--;
        break;
      case 'ArrowDown':
        this.playerPosition.y++;
        break;
      case 'ArrowLeft':
        this.playerPosition.x--;
        break;
      case 'ArrowRight':
        this.playerPosition.x++;
        break;
    }

    this.updateMazeState();
  }

  private updateMazeState() {    
    let x = this.playerPosition.x;
    let y = this.playerPosition.y;

    console.log('PlayerPosition: ' + JSON.stringify(this.playerPosition));

    this.currentCellValue = this.maze[y][x];

    if (this.currentCellValue === 'E') {
      const answer = confirm("END GAME!!!");
      if (answer){
        this.playerPosition = { x: this.initialPosition.x, y: this.initialPosition.y };
      }

    } else if (this.currentCellValue === 'X') {
      this.playerPosition = { x: this.previousPosition.x, y: this.previousPosition.y };
    }
  }

  public getCellClass(row: number, column: number): string {
    if (this.maze[row][column] === 'X') {
      return 'wall';
    } else if (this.maze[row][column] === 'E') {
      return 'goal';
    } else {
      return 'path';
    }
  }
}
