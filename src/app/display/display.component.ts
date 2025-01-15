import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent implements OnInit {

  data: any[] = [];
  vango : any;

  constructor(private dataServices: DataService) { }

  ngOnInit(): void {
    this.dataServices.getData().subscribe((response: any) => {
      console.log("ykuyuuuuuu",response);
      this.data = response;
    });

    this.dataServices.getData1().subscribe((response: any) => {
      console.log("ooooooooooo",response);
      this.vango = response;
    });


  }
}