import { Directive, Output, Input, EventEmitter, HostBinding, HostListener
} from '@angular/core';
import { FileItem } from 'shared/models/file-item';
// import { retry } from 'rxjs/operators';

@Directive({
  selector: '[ngDragDropFiles]'
})
export class NgDragDropFilesDirective {
  @Input ('archivos') archivos: FileItem[] = [];
  @HostBinding('class.fileover') fileOver: boolean;
  @Output() fileDropped = new EventEmitter<any>();
  @Output() mouseOver = new EventEmitter<boolean>();
// constructor() { }
  
  @HostListener('dragover', ['$event'])
  public onDragEnter(evt: any){
      console.log("estoy en la directiva emitiendo true");
      // event.preventDefault();
      // event.stropPropagation();
      this.mouseOver.emit(true);
      this.preventAndStop(evt);
    }
    
    // @HostListener('dragleave', ['$event'])
    // public onDragLeave(event: any){
      //   this.mouseOver.emit(false);
      // }

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    console.log("dragover here:");
    
    // event.preventDefault();
    // event.stropPropagation();
    this.preventAndStop(evt);
    this.mouseOver.emit(true);
    this.fileOver = true;
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    console.log('dragleave');
    
    // event.preventDefault();
    // event.stropPropagation();
    this.preventAndStop(evt);
    this.mouseOver.emit(false);

    this.fileOver = false;
  }

  // Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt) {
    console.log("Ya calleron!!!");
    
    // evt.preventDefault();
    // evt.stopPropagation();
    this.preventAndStop(evt);
    this.mouseOver.emit(false);

    const dataTransfer = this._getDataTransfer(evt);
    if (!dataTransfer) return;

    this.fileOver = false;
    let files = dataTransfer.files;

    this._extractFiles(dataTransfer.files);

    if (this.archivos.length > 0) {
      // if (files.length > 0) {
      console.log("emmit dropped files");      
      this.fileDropped.emit(this.archivos[0]);
    }

  }

  private _extractFiles(fileList: FileList){
    for (const propiedad in Object.getOwnPropertyNames( fileList )) {
      if (fileList.hasOwnProperty(propiedad)) {
        const elementFile = fileList[propiedad];
        if(this._isValidFile(elementFile)){
          const newFile = new FileItem(elementFile);
          this.archivos.push(newFile);
        }        
      }
    }
    console.log(this.archivos);
  }

  private _getDataTransfer(event: any){
    return event.dataTransfer ? event.dataTransfer : event.original.dataTransfer;
  }

  // validations
  private _isValidFile( file: File): boolean{
    if (!this._fileAlreadyIn(file.name) && this._isImage(file.type)) {
      return true;
    }
    return false;
  }

  private preventAndStop( event ){
    event.preventDefault();
    event.stopPropagation();
  }

  private _fileAlreadyIn(fileName: string): boolean{
    for (const item of this.archivos) {
      if(item.name == fileName){
        console.log("el archivo ya esta:", fileName);
        return true;
      }      
    }
    return false;
  }

  private _isImage( fileType: string ) : boolean {
    return (fileType == '' || fileType == undefined ) ? false: fileType.startsWith('image');
  }

}
