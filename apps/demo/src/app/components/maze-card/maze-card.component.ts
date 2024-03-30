import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'maze-card',
  templateUrl: './maze-card.component.html',
  styleUrls: ['./maze-card.component.scss'],
})
export class MazeCardComponent implements OnInit {
  public title = 'Maze Card demo';
  
  @Output() openMazeModal = new EventEmitter();

  @ViewChild('openButton') buttonRef: ElementRef;
  @ViewChild('mazeModal') mazeModalRef: ElementRef;
  @ViewChild('mazeContainer') mazeContainerRef: ElementRef;

  playerPosition: { x: number, y: number };
  initialPosition: { x: number, y: number };
  previousPosition: { x: number, y: number };
  
  currentCellValue: string;
  
  public maze: string [][] = [];

  ngOnInit() { }

  openMazeCardModal(value: string[]) {
    this.maze = [];

    for (let i = 0; i < value.length; i++) {
      const item = value[i].split('');
      this.maze.push(item);
    }    

    this.buttonRef.nativeElement.click();
    this.playerPosition = this.startPosition();
    this.openMazeModal.emit();
  }
  
  private startPosition() {
    const maze = this.maze;
    for (let x = 0; x < maze.length; x++) {
      for (let y = 0; y < maze[x].length; y++) {
        const element = maze[y][x].toUpperCase();
        
        if (element === 'S') {
          this.currentCellValue = element;
          this.initialPosition = { x: x, y: y };
          this.previousPosition = { x: x, y: y };
          return { x: x, y: y };
        }
      }
    }
  }

  changeXaxis(x: number) {    
    if (x >= 0 && x < this.maze[0].length) {
      this.playerPosition.x = x;
    }
  }

  changeYaxis(y: number) {    
    if (y >= 0 && y < this.maze.length) {
      this.playerPosition.y = y;
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {

    if (this.previousPosition == undefined) return;

    this.previousPosition = { x: this.playerPosition.x, y: this.playerPosition.y };

    switch (event.key) {
      case 'ArrowUp':
        this.changeYaxis(this.playerPosition.y - 1);
        break;
      case 'ArrowDown':
        this.changeYaxis(this.playerPosition.y + 1);
        break;
      case 'ArrowLeft':
        this.changeXaxis(this.playerPosition.x - 1);
        break;
      case 'ArrowRight':
        this.changeXaxis(this.playerPosition.x + 1);
        break;
    }

    this.updateMazeState();
  }

  private updateMazeState() {    
    const x = this.playerPosition.x;
    const y = this.playerPosition.y;

    this.currentCellValue = this.maze[y][x];

    if (this.currentCellValue === 'E') {

      this.playerPosition = { x: this.initialPosition.x, y: this.initialPosition.y };

      Swal.fire("Game finished successfully!").then((result)=>{
        if (result.isConfirmed) {
          this.startPosition();
          return;
        }
      });

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
