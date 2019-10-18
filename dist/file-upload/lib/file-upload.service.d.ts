import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export declare class FileUploadService {
    private httpClient;
    BASE_URL: string;
    constructor(httpClient: HttpClient);
    upload(uploadURL: any, data: any): Observable<string | {
        status: string;
        data: any;
    }>;
    uploadBase64(uploadURL: any, data: any): Observable<any>;
}
