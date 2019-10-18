/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
export class DragDropDirective {
    constructor() {
        this.onFileDropped = new EventEmitter();
        this.background = '#f5fcff';
        this.opacity = '1';
    }
    //Dragover listener
    /**
     * @param {?} evt
     * @return {?}
     */
    onDragOver(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#9ecbec';
        this.opacity = '0.8';
    }
    //Dragleave listener
    /**
     * @param {?} evt
     * @return {?}
     */
    onDragLeave(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#f5fcff';
        this.opacity = '1';
    }
    //Drop listener
    /**
     * @param {?} evt
     * @return {?}
     */
    ondrop(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#f5fcff';
        this.opacity = '1';
        /** @type {?} */
        let files = evt.dataTransfer.files;
        if (files.length > 0) {
            this.onFileDropped.emit(files);
        }
    }
}
DragDropDirective.decorators = [
    { type: Directive, args: [{
                selector: '[libDragDrop]'
            },] }
];
DragDropDirective.propDecorators = {
    onFileDropped: [{ type: Output }],
    background: [{ type: HostBinding, args: ['style.background-color',] }],
    opacity: [{ type: HostBinding, args: ['style.opacity',] }],
    onDragOver: [{ type: HostListener, args: ['dragover', ['$event'],] }],
    onDragLeave: [{ type: HostListener, args: ['dragleave', ['$event'],] }],
    ondrop: [{ type: HostListener, args: ['drop', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    DragDropDirective.prototype.onFileDropped;
    /** @type {?} */
    DragDropDirective.prototype.background;
    /** @type {?} */
    DragDropDirective.prototype.opacity;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1kcm9wLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2ZpbGUtdXBsb2FkLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZS9kcmFnLWRyb3AuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBUyxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU1sRyxNQUFNLE9BQU8saUJBQWlCO0lBSjlCO1FBTVksa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBRUosZUFBVSxHQUFHLFNBQVMsQ0FBQTtRQUMvQixZQUFPLEdBQUcsR0FBRyxDQUFBO0lBNkJwRCxDQUFDOzs7Ozs7SUExQnVDLFVBQVUsQ0FBQyxHQUFHO1FBQ2xELEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNyQixHQUFHLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUE7SUFDdEIsQ0FBQzs7Ozs7O0lBRzZDLFdBQVcsQ0FBQyxHQUFHO1FBQzNELEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNyQixHQUFHLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUE7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUE7SUFDcEIsQ0FBQzs7Ozs7O0lBR3dDLE1BQU0sQ0FBQyxHQUFHO1FBQ2pELEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNyQixHQUFHLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUE7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUE7O1lBQ2QsS0FBSyxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSztRQUNsQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQy9CO0lBQ0gsQ0FBQzs7O1lBckNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTthQUMxQjs7OzRCQUlFLE1BQU07eUJBRU4sV0FBVyxTQUFDLHdCQUF3QjtzQkFDcEMsV0FBVyxTQUFDLGVBQWU7eUJBRzNCLFlBQVksU0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLENBQUM7MEJBUW5DLFlBQVksU0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUM7cUJBUXBDLFlBQVksU0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUM7Ozs7SUF0QmhDLDBDQUFrRDs7SUFFbEQsdUNBQW9FOztJQUNwRSxvQ0FBa0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIE91dHB1dCwgSW5wdXQsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbGliRHJhZ0Ryb3BdJ1xufSlcblxuZXhwb3J0IGNsYXNzIERyYWdEcm9wRGlyZWN0aXZlIHtcblx0XG4gIEBPdXRwdXQoKSBvbkZpbGVEcm9wcGVkID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cdFxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmJhY2tncm91bmQtY29sb3InKSBwdWJsaWMgYmFja2dyb3VuZCA9ICcjZjVmY2ZmJ1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLm9wYWNpdHknKSBwdWJsaWMgb3BhY2l0eSA9ICcxJ1xuXHRcbiAgLy9EcmFnb3ZlciBsaXN0ZW5lclxuICBASG9zdExpc3RlbmVyKCdkcmFnb3ZlcicsIFsnJGV2ZW50J10pIG9uRHJhZ092ZXIoZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuYmFja2dyb3VuZCA9ICcjOWVjYmVjJztcbiAgICB0aGlzLm9wYWNpdHkgPSAnMC44J1xuICB9XG5cdFxuICAvL0RyYWdsZWF2ZSBsaXN0ZW5lclxuICBASG9zdExpc3RlbmVyKCdkcmFnbGVhdmUnLCBbJyRldmVudCddKSBwdWJsaWMgb25EcmFnTGVhdmUoZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuYmFja2dyb3VuZCA9ICcjZjVmY2ZmJ1xuICAgIHRoaXMub3BhY2l0eSA9ICcxJ1xuICB9XG5cdFxuICAvL0Ryb3AgbGlzdGVuZXJcbiAgQEhvc3RMaXN0ZW5lcignZHJvcCcsIFsnJGV2ZW50J10pIHB1YmxpYyBvbmRyb3AoZXZ0KSB7XG4gICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuYmFja2dyb3VuZCA9ICcjZjVmY2ZmJ1xuICAgIHRoaXMub3BhY2l0eSA9ICcxJ1xuICAgIGxldCBmaWxlcyA9IGV2dC5kYXRhVHJhbnNmZXIuZmlsZXM7XG4gICAgaWYgKGZpbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMub25GaWxlRHJvcHBlZC5lbWl0KGZpbGVzKVxuICAgIH1cbiAgfVxufSJdfQ==