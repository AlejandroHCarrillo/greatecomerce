import { Injectable } from '@angular/core';
import { GraphItem } from 'shared/models/graph-item.model';
import { GraphSummary } from 'shared/models/graph-summary.model';

@Injectable({
  providedIn: 'root'
})
export class GraphsService {

  colorSchema: string[] = [ '#FFC312', '#F79F1F', '#EE5A24', '#EA2027',
                            '#C4E538', '#A3CB38', '#009432', '#006266',
                            '#12CBC4', '#1289A7', '#0652DD', '#1B1464',
                            '#FDA7DF', '#D980FA', '#9980FA', '#5758BB',
                          ]

  constructor() { }

  getMaxValue(dataArray : GraphItem[]): number{
    if (!dataArray || dataArray.length === 0){
      return 0;
    }
    return Math.max.apply(Math, dataArray.map(function(o) { return o.value; }));
  }

  getMinValue(dataArray : GraphItem[]): number{
    if (!dataArray || dataArray.length === 0){
      return 0;
    }
    return Math.min.apply(Math, dataArray.map(function(o) { return o.value; }));
  }

  getSummaryValues(dataArray : GraphItem[]): GraphSummary{
    let summaryValues = new GraphSummary();
    if (!dataArray || dataArray.length === 0){
      return summaryValues;
    }
    summaryValues.sum = dataArray.reduce((acc, v)=> acc + v.value, 0 );
    summaryValues.minValue = Math.min.apply(Math, dataArray.map(function(o) { return o.value; }));
    summaryValues.maxValue = Math.max.apply(Math, dataArray.map(function(o) { return o.value; }));
    summaryValues.counter = dataArray.length;
    summaryValues.average = summaryValues.counter === 0 ? 0 : summaryValues.sum/summaryValues.counter;

    return summaryValues;

  }

  reverseArrayOrder(dataArray : GraphItem[]){
    let tempData = [];
    for (const item of dataArray) {
      tempData.unshift(item);
    }
    return tempData;
  }

}
