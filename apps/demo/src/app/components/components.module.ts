import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MazeCardComponent } from './maze-card/maze-card.component';
import { MazeComponent } from './maze.component';
import { MazeNewComponent } from './maze-new/maze-new.component';
import { FormsModule } from '@angular/forms';

const sharedComponents = [MazeComponent, MazeCardComponent, MazeNewComponent];

@NgModule({
  declarations: [...sharedComponents],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  exports: [...sharedComponents],
})
export class ComponentsModule {}
