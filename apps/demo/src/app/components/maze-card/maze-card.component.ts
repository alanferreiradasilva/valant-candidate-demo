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

  isFirstLoad: boolean;

  ngOnInit() { }

  openMazeCardModal(value: string[]) {
    this.maze = [];

    for (let i = 0; i < value.length; i++) {
      const item = value[i].split('');
      this.maze.push(item);
    }    

    this.buttonRef.nativeElement.click();
    this.startPosition();
    this.openMazeModal.emit();
  }

  revertPlayerPosition(x: number, y: number){
    this.playerPosition = {
      x: y,
      y: x,
    };
  }
  
  private startPosition() {
    
    const maze = this.maze;
    for (let x = 0; x < maze.length; x++) {
      for (let y = 0; y < maze[0].length; y++) {
        const element = maze[x][y].toUpperCase();
        
        if (element === 'S') {
          const axis = (xAxis: number, yAxis: number) => ({ x: xAxis, y: yAxis }) as any;
          this.currentCellValue = element;
          this.initialPosition = axis(x ,y);
          this.previousPosition = axis(x ,y);          
          this.revertPlayerPosition(x, y);
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

  setPreviousPosition() { 
    this.previousPosition = { x: this.playerPosition.x, y: this.playerPosition.y };
  }

  moveYaxis(y: number){
    this.setPreviousPosition();
    this.changeYaxis(this.playerPosition.y + y);
    this.updateMazeState();
  }

  moveXaxis(x: number){
    this.setPreviousPosition();
    this.changeXaxis(this.playerPosition.x + x);
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