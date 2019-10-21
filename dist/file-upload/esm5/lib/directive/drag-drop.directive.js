/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
var DragDropDirective = /** @class */ (function () {
    function DragDropDirective() {
        this.onFileDropped = new EventEmitter();
        this.background = '#f5fcff';
        this.opacity = '1';
    }
    //Dragover listener
    //Dragover listener
    /**
     * @param {?} evt
     * @return {?}
     */
    DragDropDirective.prototype.onDragOver = 
    //Dragover listener
    /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#9ecbec';
        this.opacity = '0.8';
    };
    //Dragleave listener
    //Dragleave listener
    /**
     * @param {?} evt
     * @return {?}
     */
    DragDropDirective.prototype.onDragLeave = 
    //Dragleave listener
    /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#f5fcff';
        this.opacity = '1';
    };
    //Drop listener
    //Drop listener
    /**
     * @param {?} evt
     * @return {?}
     */
    DragDropDirective.prototype.ondrop = 
    //Drop listener
    /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#f5fcff';
        this.opacity = '1';
        /** @type {?} */
        var files = evt.dataTransfer.files;
        if (files.length > 0) {
            this.onFileDropped.emit(files);
        }
    };
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
    return DragDropDirective;
}());
export { DragDropDirective };
if (false) {
    /** @type {?} */
    DragDropDirective.prototype.onFileDropped;
    /** @type {?} */
    DragDropDirective.prototype.background;
    /** @type {?} */
    DragDropDirective.prototype.opacity;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZy1kcm9wLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2ZpbGUtdXBsb2FkLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZS9kcmFnLWRyb3AuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBUyxZQUFZLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVsRztJQUFBO1FBTVksa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBRUosZUFBVSxHQUFHLFNBQVMsQ0FBQTtRQUMvQixZQUFPLEdBQUcsR0FBRyxDQUFBO0lBNkJwRCxDQUFDO0lBM0JDLG1CQUFtQjs7Ozs7O0lBQ21CLHNDQUFVOzs7Ozs7SUFBaEQsVUFBaUQsR0FBRztRQUNsRCxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDckIsR0FBRyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFBO0lBQ3RCLENBQUM7SUFFRCxvQkFBb0I7Ozs7OztJQUMwQix1Q0FBVzs7Ozs7O0lBQXpELFVBQTBELEdBQUc7UUFDM0QsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQTtRQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQTtJQUNwQixDQUFDO0lBRUQsZUFBZTs7Ozs7O0lBQzBCLGtDQUFNOzs7Ozs7SUFBL0MsVUFBZ0QsR0FBRztRQUNqRCxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDckIsR0FBRyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFBO1FBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFBOztZQUNkLEtBQUssR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUs7UUFDbEMsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNwQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUMvQjtJQUNILENBQUM7O2dCQXJDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7aUJBQzFCOzs7Z0NBSUUsTUFBTTs2QkFFTixXQUFXLFNBQUMsd0JBQXdCOzBCQUNwQyxXQUFXLFNBQUMsZUFBZTs2QkFHM0IsWUFBWSxTQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQzs4QkFRbkMsWUFBWSxTQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQzt5QkFRcEMsWUFBWSxTQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQzs7SUFVbEMsd0JBQUM7Q0FBQSxBQXRDRCxJQXNDQztTQWxDWSxpQkFBaUI7OztJQUU1QiwwQ0FBa0Q7O0lBRWxELHVDQUFvRTs7SUFDcEUsb0NBQWtEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBPdXRwdXQsIElucHV0LCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2xpYkRyYWdEcm9wXSdcbn0pXG5cbmV4cG9ydCBjbGFzcyBEcmFnRHJvcERpcmVjdGl2ZSB7XG5cdFxuICBAT3V0cHV0KCkgb25GaWxlRHJvcHBlZCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXHRcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5iYWNrZ3JvdW5kLWNvbG9yJykgcHVibGljIGJhY2tncm91bmQgPSAnI2Y1ZmNmZidcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5vcGFjaXR5JykgcHVibGljIG9wYWNpdHkgPSAnMSdcblx0XG4gIC8vRHJhZ292ZXIgbGlzdGVuZXJcbiAgQEhvc3RMaXN0ZW5lcignZHJhZ292ZXInLCBbJyRldmVudCddKSBvbkRyYWdPdmVyKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmJhY2tncm91bmQgPSAnIzllY2JlYyc7XG4gICAgdGhpcy5vcGFjaXR5ID0gJzAuOCdcbiAgfVxuXHRcbiAgLy9EcmFnbGVhdmUgbGlzdGVuZXJcbiAgQEhvc3RMaXN0ZW5lcignZHJhZ2xlYXZlJywgWyckZXZlbnQnXSkgcHVibGljIG9uRHJhZ0xlYXZlKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmJhY2tncm91bmQgPSAnI2Y1ZmNmZidcbiAgICB0aGlzLm9wYWNpdHkgPSAnMSdcbiAgfVxuXHRcbiAgLy9Ecm9wIGxpc3RlbmVyXG4gIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbJyRldmVudCddKSBwdWJsaWMgb25kcm9wKGV2dCkge1xuICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB0aGlzLmJhY2tncm91bmQgPSAnI2Y1ZmNmZidcbiAgICB0aGlzLm9wYWNpdHkgPSAnMSdcbiAgICBsZXQgZmlsZXMgPSBldnQuZGF0YVRyYW5zZmVyLmZpbGVzO1xuICAgIGlmIChmaWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLm9uRmlsZURyb3BwZWQuZW1pdChmaWxlcylcbiAgICB9XG4gIH1cbn0iXX0=