import { Component, OnInit } from '@angular/core';
import { carouselItem } from 'shared/models/carousel-item.model';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styles: [ ` .container { margin-bottom: 3rem; }`  ]
})
export class HomeComponent implements OnInit {

  headerSlides: carouselItem[] = [
    {
      title: "Bienvenido",
      description: "Esta es la descripcion ",
      bgImgUrl: "assets/images/carousel/Banner00.jpg"
    },
    {
      title: "First slide label",
      description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
      bgImgUrl: "assets/images/carousel/Banner01.jpg"
    },
    {
      title: "2 Second slide label",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      bgImgUrl: "assets/images/carousel/Banner02.jpg"
    },
    {
      title: "III Third slide label",
      description: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
      bgImgUrl: "assets/images/carousel/Banner03.jpg"
    },
    {
      title: "IV Last ",
      description: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
      bgImgUrl: "assets/images/carousel/Banner_1200x200.jpg"
    }
  ];

  testimonialSlides: carouselItem[] = [
    {
      title: "Abigail",
      description: `Por mi rutina de entrenamiento y la sensibilidad de mi piel no puedo ni debo maquillarme tanto, 
                    me encanta que no necesito nada mas, mis ojos se ven muy bien, un toque de brillo en los labios 
                    y estoy lista para lo que sea!`,
      bgImgUrl: "assets/images/testimonials/testimonial-background.png",
      imgUrl: "assets/images/testimonials/testimonial01.jpg"
    },
    {
      title: "Ilany",
      description: `Mis pestañas se ven WOW mis ojos se ven como nunca! 
                    Es increíble que sean mis pestañas. 
                    Amo la Keratina, se ven maravillosas.`,
      bgImgUrl: "assets/images/testimonials/testimonial-background.png",
      imgUrl: "assets/images/testimonials/testimonial02.png"
    },
    {
      title: "",
      description: `Es genial estar arregalada sin dedicar tanto tiempo, 
                    la mitad de mi arreglo ya esta listo! 
                    Tardo mucho menos tiempo en maquillarme 
                    y no me preocupa retocarme constantemente.`,
      bgImgUrl: "assets/images/testimonials/testimonial-background.png",
      imgUrl: "assets/images/testimonials/testimonial03.png"
    },
    {
      title: "",
      description: ``,
      bgImgUrl: "assets/images/testimonials/testimonial-background.png",
      imgUrl: "assets/images/testimonials/testimonial04.png"
    },
    {
      title: "Last testimonial",
      description: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
      bgImgUrl: "assets/images/testimonials/testimonial-background.png",
      imgUrl: "assets/images/testimonials/testimonial05.png"
    }
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
