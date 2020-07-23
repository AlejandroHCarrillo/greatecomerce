import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gallery',
  templateUrl: './gallery.component.html',
  styleUrls: [ './gallery.component.css'  ]
})
export class GalleryComponent implements OnInit {
  @Input('direction') direction: string = "m";
  @Input('title') title: string = "";
  @Input('pictures') pictures: any[] = [
    "http://www.publicdomainpictures.net/pictures/170000/velka/spinach-leaves-1461774375kTU.jpg",
    "https://www.pcrm.org/sites/default/files/ensalada-mango-espinaca-6_0.jpg",
    "https://i.ndtvimg.com/i/2016-11/spinach_620x350_81477995047.jpg",
    "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/spinach-1296x728-feature.jpg?w=1155&amp;h=1528",

    "https://www.pcrm.org/sites/default/files/ensalada-mango-espinaca-6_0.jpg",
    "https://i.ndtvimg.com/i/2016-11/spinach_620x350_81477995047.jpg",
    "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/spinach-1296x728-feature.jpg?w=1155&amp;h=1528",
    "http://www.publicdomainpictures.net/pictures/170000/velka/spinach-leaves-1461774375kTU.jpg",

    "https://i.ndtvimg.com/i/2016-11/spinach_620x350_81477995047.jpg",
    "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/spinach-1296x728-feature.jpg?w=1155&amp;h=1528",
    "http://www.publicdomainpictures.net/pictures/170000/velka/spinach-leaves-1461774375kTU.jpg",
    "https://www.pcrm.org/sites/default/files/ensalada-mango-espinaca-6_0.jpg",

    "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/spinach-1296x728-feature.jpg?w=1155&amp;h=1528",
    "http://www.publicdomainpictures.net/pictures/170000/velka/spinach-leaves-1461774375kTU.jpg",
    "https://www.pcrm.org/sites/default/files/ensalada-mango-espinaca-6_0.jpg",
    "https://i.ndtvimg.com/i/2016-11/spinach_620x350_81477995047.jpg",
  ];
  
  currentImage: string;

  constructor() { }

  ngOnInit(): void {
  }

  setCurrentImg(url: string){
    this.currentImage = url;
  }
}
