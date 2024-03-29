import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'maze-new',
  templateUrl: './maze-new.component.html',
  styleUrls: ['./maze-new.component.scss'],
})
export class MazeNewComponent implements OnInit {
  public title = 'Maze new';  

  @Input('open') open: boolean = false;

  ngOnInit() {
    
  }  
}
