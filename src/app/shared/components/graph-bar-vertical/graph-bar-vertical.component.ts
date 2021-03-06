import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { GraphItem } from 'shared/models/graph-item.model';
import { GraphsService } from 'shared/services/graphs.service';
import { GraphSummary } from 'shared/models/graph-summary.model';

@Component({
  selector: 'graph-bar-vertical',
  templateUrl: './graph-bar-vertical.component.html',
  styleUrls: ['./graph-bar-vertical.component.css']
})
export class GraphBarVerticalComponent implements OnInit {
  @Input('data') results: Observable <GraphItem[]>;
  data: GraphItem[] = [];
  summary = new GraphSummary();
  order: 'asc';

  selectControl:FormControl = new FormControl()

  constructor(private graphService: GraphsService ) { }

  ngOnInit() {
    this.results.subscribe( results => {
      if(results){        
        this.data = results;
        if(this.order!=="asc") { this.data = this.graphService.reverseArrayOrder(this.data); }      
        this.summary = this.graphService.getSummaryValues(this.data);
      }
    });
    this.selectControl.setValue(this.order);
  }

  calcBarHeight(value: number, maxValue: number): number{
    console.log("maxValue: ", this.summary.maxValue);
    
    if(this.summary.maxValue==0) return 0;
    return Math.round((value/this.summary.maxValue)*100);
  }

  setStyleVBar(value: number, index: number){
    const colorsLen = this.graphService.colorSchema.length;
    let indexColor = 0;

    if(index<colorsLen){
      indexColor = index;
    } else {
      let times = Math.floor(index/colorsLen);
      indexColor = index-(times*colorsLen);
    }

    let retObj = { 'height': (this.calcBarHeight(value, 7))+'%',
                   'background-color': this.graphService.colorSchema[indexColor],
                   'color': 'whitesmoke',
                   'vertical-align': 'bottom',
                   'text-align': 'center'
                 }
    if (value === 0) {
      retObj.color = 'gray';
    }
    return retObj;
  }

  changeOrder(){
    if (!this.data) return;
    this.order = this.selectControl.value;
    this.data = this.graphService.reverseArrayOrder(this.data);    
  }

}
