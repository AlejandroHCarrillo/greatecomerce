import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  copyright =  `${ new Date().getFullYear() } greatecomerce, Inc. All rights reserved.`

  constructor() { }

  ngOnInit(): void {
  }

}
