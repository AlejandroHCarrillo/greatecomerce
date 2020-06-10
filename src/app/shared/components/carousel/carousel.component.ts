import { Component, OnInit, Input } from '@angular/core';
import { carouselItem } from 'shared/models/carousel-item.model';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  @Input('slides') slides;
  @Input('bgblur') blurBackground = false;

  defaultSlide: carouselItem;

  constructor() { }

  ngOnInit(): void {
    if(this.slides.length>0){
      this.defaultSlide = this.slides[0];
      this.slides = this.slides.slice(1);
    }
  }

}
