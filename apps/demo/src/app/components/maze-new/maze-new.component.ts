import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StuffService } from '../../stuff/stuff.service';
import Swal from 'sweetalert2';
import { LoggingService } from '../../logging/logging.service';

@Component({
  selector: 'maze-new',
  templateUrl: './maze-new.component.html',
  styleUrls: ['./maze-new.component.scss'],
})
export class MazeNewComponent implements OnInit {
  public title = 'Maze new'; 
  public textarea: string = ''; 
  data: string[] = [];

  public get saveButtonIsDisabled(): boolean {
    return this.textarea === '' || this.textarea.trim() === '';
  } 

  @ViewChild('closeButton') buttonRef: ElementRef;

  constructor(private logger: LoggingService, private stuffService: StuffService){}

  ngOnInit() {
    
  }  

  save() {
    if (this.isValid()) {
      this.stuffService.postScenarios(this.data).subscribe({
        next: (response: string[]) => {
          Swal.fire('New maze save successfully!')
            .then((result)=> { 
              if (result.isConfirmed) {
                this.textarea = '';
                this.data = [];
                this.buttonRef.nativeElement.click();
              }
            });
        },
        error: (error) => {
          this.logger.error('Error posting scenarios: ', error);
        },
      });
    }
  }

  private isValid(): boolean {
    this.data = this.textareaToArray();    

    const horizontalLength = this.data[0].length;

    for (let i = 1; i < this.data.length; i++) {
      const line = this.data[i];

      if(horizontalLength !== line.length) {
        Swal.fire('All lines must have the same number of characters!');
        return false;
      }

      const regex = ['S','O','X','E'];

      for (let j = 0; j < line.length; j++) {
        const item = line[j].toUpperCase();
        
        if (regex.indexOf(item) < 0) {
          Swal.fire('This maze accept only the values: S, O, X or E!');
          return false;
        }
      }

    }

    return true;
  }

  private textareaToArray(): string[] {
    const text = this.textarea;
    const lines = text.split('\n');
    const trimmedLines = lines.map(line => line.trim());
    return trimmedLines;
  }
}
