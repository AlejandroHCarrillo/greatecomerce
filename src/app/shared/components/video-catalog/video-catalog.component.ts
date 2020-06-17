import { Component, OnInit } from '@angular/core';
import { VideoService } from 'shared/services/video.service';
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'video-catalog',
  templateUrl: './video-catalog.component.html',
  styleUrls: ['./video-catalog.component.css']
})
export class VideoCatalogComponent implements OnInit {
  videos: any[] = [];
  videoSel: any;

  constructor(public videoService: VideoService) {
    this.videoService.getVideos().subscribe( videos => {
      if(videos){
        this.videos = videos;
      }
    });
   }

  ngOnInit() {
    console.log("video catalog on init");
    
  }

  verVideo(video:any){
    console.log("ver video", video);
    
    this.videoSel = video;
    $('#myModal').modal();
  }

  cerrarModal(){
    this.videoSel = null;
    $('#myModal').modal('hide');
  }

  cargarMasVideos(){
    console.log("Cargando videos");
    
    this.videoService.getVideos().subscribe( videos => {
      console.log(videos);
      
      if(videos){
        this.videos.push(...videos);
      }
    });

  }

  onScroll() {
    this.cargarMasVideos();
  }
}
