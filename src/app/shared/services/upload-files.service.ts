import { Injectable } from '@angular/core';
import { FileItem } from 'shared/models/file-item';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { ProductService } from './product.service';


@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {
  private IMAGES_FOLDER = "images";

  constructor(private db:AngularFirestore, 
              private _productService: ProductService) { }

  uploadImages(files: FileItem[], productId: string = ""): string[]{
    let imageUrls: string[] = [];
    const storageRef = firebase.storage().ref();

    this._productService.clearProductImages(productId);

    for (const item of files) {
      item.estaSubiendo = true;
      if(item.progress>= 100) continue;

      const uploadTask: firebase.storage.UploadTask = 
                        storageRef.child(`${ this.IMAGES_FOLDER }/${ item.name }`)
                                  .put( item.archivo );
      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
                     ( snapshot ) => item.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                     ( error ) => console.log("Error uploading the image:", error, item.name),
                     () => {                       
                      //  console.log("Image uploaded successfully");

                       uploadTask.snapshot.ref.getDownloadURL()
                       .then( downloadURL => {
                        imageUrls.push(downloadURL);

                        this._productService.saveProductImage(productId, downloadURL);
                        
                        item.url = downloadURL;
                        item.estaSubiendo = false;

                        if(item){ 
                          this.saveImage({nombre: item.name, url: item.url})
                        }
                      });
                     }
                     
        )
    }
    return imageUrls;
  }

  private saveImage(image: { nombre: string, url: string } ){  
    this.db.collection(`/${ this.IMAGES_FOLDER }`)
    .add(image);
  }

}
