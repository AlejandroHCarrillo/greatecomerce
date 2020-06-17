import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'video'
})
export class VideoPipe implements PipeTransform {
  constructor(private domSan: DomSanitizer ){

  }

  transform(value: string): any {
    let url = "https://www.youtube.com/embed/";
    return this.domSan.bypassSecurityTrustResourceUrl( url + value);
  }

}
