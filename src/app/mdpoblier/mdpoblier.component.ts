import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-mdpoblier',
  templateUrl: './mdpoblier.component.html',
  styleUrls: ['./mdpoblier.component.css']
})
export class MdpoblierComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (sessionStorage.length > 1) {
      window.location.replace('Etu');

    }
  }

}
