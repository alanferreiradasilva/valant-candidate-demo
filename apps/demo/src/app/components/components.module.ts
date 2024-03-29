import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MazeCardComponent } from './maze-card/maze-card.component';

@NgModule({
  declarations: [MazeCardComponent],
  imports: [BrowserModule, HttpClientModule],
  exports: [MazeCardComponent],
})
export class ComponentsModule {}
