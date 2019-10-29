import { Component, OnInit } from '@angular/core';
import { HttpLoaderService } from '../../../services/http-loader.service';

@Component({
  selector: 'app-http-loader',
  templateUrl: './http-loader.component.html',
  styleUrls: ['./http-loader.component.css']
})

export class HttpLoaderComponent implements OnInit {

  loading: boolean;
  constructor(private loaderService: HttpLoaderService) {
    this.loaderService.isLoading.subscribe((v) => {
      console.log('TTTTTTTTTTTTTTTTT', v);
      this.loading = v;
    });
  }

  ngOnInit() {
  }

}
