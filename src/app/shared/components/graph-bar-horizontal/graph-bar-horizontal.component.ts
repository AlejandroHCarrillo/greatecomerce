import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { Observable } from 'rxjs';
import { max } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'graph-bar-horizontal',
  templateUrl: './graph-bar-horizontal.component.html',
  styleUrls: ['./graph-bar-horizontal.component.css']
})
export class GraphBarHorizontalComponent implements OnInit {
  @Input('data') results: Observable <{ name:string, value:number }[]>;

  data:{ name:string, value:number }[] = [];
  maxValue : number = 0;
  minValue : number = 0;
  order: 'asc';

  colorSchema: string[] = 
  [ '#FFC312', '#F79F1F', '#EE5A24', '#EA2027', 
    '#C4E538', '#A3CB38', '#009432', '#006266', 
    '#12CBC4', '#1289A7', '#0652DD', '#1B1464', 
    '#FDA7DF', '#D980FA', '#9980FA', '#5758BB',  
  ]

  selectControl:FormControl = new FormControl()
    
  constructor() { }

  ngOnInit() {
    this.results.subscribe( results => {
      this.data = results;
      this.maxValue = this.getMaxValue();
      this.minValue = this.getMinValue();
      
    });
    this.selectControl.setValue(this.order);
  }

  private getMaxValue(){
    if (!this.data || this.data.length === 0){
      return 0;
    }
    return Math.max.apply(Math, this.data.map(function(o) { return o.value; }));
  }

  private getMinValue(){
    if (!this.data || this.data.length === 0){
      return 0;
    }
    return Math.min.apply(Math, this.data.map(function(o) { return o.value; }));
  }


  calcWidth(value: number, maxValue: number): number{
    if(maxValue==0) return 0;    
    return Math.round((value/maxValue)*100);
  }

  setStyleBar(value: number, index: number){

    const colorsLen = this.colorSchema.length;
    let indexColor = 0;

    if(index<colorsLen){
      indexColor = index;
    } else {
      let times = Math.floor(index/colorsLen);
      indexColor = index-(times*colorsLen);
    }

    let retObj = { 'width': (this.calcWidth(value, 7))+'%',
                   'background-color': this.colorSchema[indexColor],
                   'color': 'whitesmoke'
                 }
    if (value === 0) {
      retObj.color = 'gray';
    }
    return retObj;
  }

  changeOrder(){
    if (!this.data) return;
    this.order = this.selectControl.value;
    
    let tempData = [];
    for (const item of this.data) {
      tempData.unshift(item);
    }
    this.data = tempData;

  }

}
