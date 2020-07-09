import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FileItem } from 'shared/models/file-item';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {
  private IMAGES_FOLDER = "images";

  constructor(db:AngularFirestore) { }

  uploadImages(files: FileItem[]){
    // console.log("files: ", files);
    const storageRef = firebase.storage().ref();

    for (const item of files) {
      item.estaSubiendo = true;
      if(item.progress>= 100) continue;

      const uploadTask: firebase.storage.UploadTask = 
                        storageRef.child(`${ this.IMAGES_FOLDER }/${ item.name }`)
                                  .put( item.archivo );
      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
                     ( snapshot ) => item.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                     ( error ) => console.log("Error uploading the image:", item.name),
                     () => {                       
                       console.log("Image uploaded successfully");

                       uploadTask.snapshot.ref.getDownloadURL()
                       .then(function(downloadURL) {
                        console.log('File available at', downloadURL);
                                                
                        item.url = downloadURL;
                        // console.log("item.url: ", item.url);                       
                        console.log("item.name: ", item.name);                       
                        item.estaSubiendo = false;
                        if(item){ 
                          // this.saveImage2( { nombre: 'item.name', url: 'downloadURL' });
                          // this.saveImage2( item.name, item.url );
                              this.db.collection(`/${ this.IMAGES_FOLDER }`)
                              .add({nombre: item.name, url: item.url });
                        }
                      });
                        
                     }
                     
        )
    }
    
  }

  saveImage2(nombre: string, url: string){
    console.log(nombre);
    console.log(url);
    
  }
    private saveImage(image: { nombre: string, url: string } ){
    console.log("saving :", image);
    
    // this.db.collection(`/${ this.IMAGES_FOLDER }`)
    // .add(image)
    // .then(x=>{ console.log( x )} )
    // .catch(e => console.log( "Error: ", e ))
    // .finally( () => console.log("Fin") );
  }

}
