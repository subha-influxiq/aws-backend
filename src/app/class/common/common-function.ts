import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MetaService } from '@ngx-meta/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl
} from '@angular/forms';
import { HttpServiceService } from '../../services/http-service.service';
import { type } from 'os';

@Injectable()

export class CommonFunction {

    constructor(public httpServiceService: HttpServiceService, private readonly meta: MetaService, public cookie: CookieService, public router: Router, public activeRoute: ActivatedRoute) { }

    setTitleMetaTags(): any {
        let url = this.router.url;
        var urlArr = url.split("/");
        var title = '';
        for (let loop = 1; loop < urlArr.length; loop++) {
            urlArr[loop] = urlArr[loop].replace("-", " ");
            urlArr[loop] = this.titleCase(urlArr[loop]);
            switch (urlArr[loop]) {
                case 'Admin':
                    title = 'Admin';
                    break;
                case 'Patient Record':
                    title = title + ' | View Report ';
                    break;
                case 'Tech':
                    title = 'Tech ';
                    break;
                case 'Doctor':
                    title = 'Doctor ';
                    break;
                case 'Doctor Office':
                    title = 'Doctor Office ';
                    break;
                case 'List':
                    break;
                case 'Add':
                    title = title + '- Create New ';
                    break;
                case 'Bulk Upload':
                    title = title + '- Bulk Report Upload ';
                    break;
                case 'Change Password':
                    title = title + '- Change Password ';
                    break;
                case 'Edit':
                    title = title + '- Update Record ';
                    loop = urlArr.length
                    break;
                default:
                    //title += urlArr[loop] + ' ';
                    break;
            }
        }

        let getToken: boolean = this.cookie.check('jwtToken');

        if (getToken) {
            let allData: any = this.cookie.getAll();
            let userData: any = JSON.parse(allData.user_details);
            switch (urlArr[1]) {
                case 'Doctor Office':
                    title = title + '| ' + userData.centerName + ' - AWS Backend';
                    break;
                default:
                    title = title + '| ' + userData.firstname + ' ' + userData.lastname + ' - AWS Backend';
                    break;
            }
        } else {
            title = 'Welcome to AWS Backend | ' + title;
        }

        /* Set Meta Data */
        this.meta.setTitle('Welcome to AWS Backend');
        this.meta.setTag('og:description', 'Welcome to AWS Backend.');
        this.meta.setTag('og:title', 'Welcome to AWS Backend.');
        this.meta.setTag('og:type', 'website');
        this.meta.setTag('og:image', 'favicon.ico');
    }

    titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        // Directly return the joined string
        return splitStr.join(' ');
    }

    randomNumber(length): any {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    getYoutubeEmbedUrl(url) {
        if(typeof(url) == 'string') {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var match = url.match(regExp);

            if (match && match[2].length == 11) {
                return { status: true, url: 'https://www.youtube.com/embed/' + match[2] };
            } else {
                return { status: false, url: '' }
            }
        } else {
            return { status: false, url: '' };
        }
    }

}
