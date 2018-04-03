import { Component, OnInit } from '@angular/core';

interface Solider {
  name: string;
  raca: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // drag and drop
  soliderList: Solider[];
  solidersDropped: Solider[];

  constructor() {

  }

  ngOnInit(): void {
    this.soliderList = [
      {
        name: 'Papa',
        raca: 'Capitão'
      },
      {
        name: 'Fabio',
        raca: 'Cabo'
      },
      {
        name: 'Pietro',
        raca: 'Cabo'
      },
      {
        name: 'Messy',
        raca: 'Cabo'
      }
    ];
    this.solidersDropped = [];
  }

  releaseDrop(item: Solider): void {
    console.log('realise drop');
    console.log(item);

    const index = this.soliderList.indexOf(item);
    this.soliderList.splice(index, 1);
    this.solidersDropped.push(item);
  }

  startDrag(item: Solider): void {
    console.log('start drag');
    console.log(item);
  }

  addDropItem(item: Solider): void {
    console.log('add drop item');
    console.log(item);
  }

  dropEventMouse(e: any): void {
    console.log('drop event mouse');
    console.log(e);
  }

  dragEnter(item: Solider): void {
    console.log('drag enter');
    console.log(item);
  }

  dragLeave(): void {
    console.log('drag leave');
  }

  dragoverMouse(e: any): void {
    console.log('drag over');
    console.log(e);
  }

}
