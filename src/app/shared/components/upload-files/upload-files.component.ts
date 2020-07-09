import { Component, OnInit } from '@angular/core';
import { FileItem } from 'shared/models/file-item';
import { UploadFilesService } from 'shared/services/upload-files.service';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: [ './upload-files.component.scss'
  ]
})
export class UploadFilesComponent implements OnInit {
  // files: FileItem[] = [];
  archivos: FileItem[] = [];
  isOverDropZone: boolean= false;

  constructor(public _uploadfiles: UploadFilesService) {

   }

  ngOnInit(): void {
    console.log("ngOnInit");
  }

  uploadFiles(){
    console.log('running uploadFiles...');
    // alert('uploadFiles');
    this._uploadfiles.uploadImages(this.archivos);
  }

  // files: any[] = [];

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    console.log("onFileDropped", $event);    
    // this.prepareFilesList($event);
  }

  onMouseOver($event) {
    console.log($event);    
    // this.prepareFilesList($event);
    this.isOverDropZone = $event;
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    console.log("fileBrowseHandler files: ", files);
    this._extractFiles(files);
    console.log("archivos:", this.archivos);    
    // this.prepareFilesList(this.archivos);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.archivos.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  // uploadFilesSimulator(index: number) {
  //   setTimeout(() => {
  //     if (index === this.archivos.length) {
  //       return;
  //     } else {
  //       const progressInterval = setInterval(() => {
  //         if (this.archivos[index].progress === 100) {
  //           clearInterval(progressInterval);
  //           this.uploadFilesSimulator(index + 1);
  //         } else {
  //           this.archivos[index].progress += 5;
  //         }
  //       }, 200);
  //     }
  //   }, 1000);
  // }

  /**
   * Convert Files list to normal array list
   * @param archivos (Files List)
   */
  // prepareFilesList(files: Array<any>) {
    // for (const item of files) {
    //   item.progress = 0;
    //   this.archivos.push(item);
    // }
  //   this.uploadFilesSimulator(0);
  // }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals=0) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }


  private _extractFiles(fileList: FileList){
    for (const propiedad in Object.getOwnPropertyNames( fileList )) {
      if (fileList.hasOwnProperty(propiedad)) {
        const elementFile = fileList[propiedad];
        console.log(elementFile);
        
        if(this._isValidFile(elementFile)){
          const newFile = new FileItem(elementFile);
          this.archivos.push(newFile);
        }        
      }
    }
    console.log(this.archivos);
  }

  private _isValidFile( file: File): boolean{
    if (!this._fileAlreadyIn(file.name) && this._isImage(file.type)) {
      return true;
    }
    return false;
  }

  private _fileAlreadyIn(fileName: string): boolean{
    for (const item of this.archivos) {
      if(item.name == fileName){
        console.log(`El archivo ya ${ fileName } esta agregado.`);
        return true;
      }      
    }
    return false;
  }

  private _isImage( fileType: string ) : boolean {
    return (fileType == '' || fileType == undefined ) ? false: fileType.startsWith('image');
  }
  
}
