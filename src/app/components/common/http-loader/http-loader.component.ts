import { Component, OnInit } from '@angular/core';
import { HttpLoaderService } from '../../../services/http-loader.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-http-loader',
  templateUrl: './http-loader.component.html',
  styleUrls: ['./http-loader.component.css']
})

export class HttpLoaderComponent implements OnInit {

  httpLoading: boolean;

  constructor(private loaderService: HttpLoaderService, public activatedRoute: ActivatedRoute, public router: Router) {
    var urlArr: any = this.router.url.split("/");
    // if(urlArr[3] == 'bulk-upload') {
      this.loaderService.isLoading.subscribe((v) => {
        this.httpLoading = v;
      });
    // }
  }

  ngOnInit() {
  }

}
