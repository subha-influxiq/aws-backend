import { EventEmitter } from '@angular/core';
export declare class DragDropDirective {
    onFileDropped: EventEmitter<any>;
    background: string;
    opacity: string;
    onDragOver(evt: any): void;
    onDragLeave(evt: any): void;
    ondrop(evt: any): void;
}
