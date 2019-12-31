import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-legal-terms',
  templateUrl: './legal-terms.component.html',
  styleUrls: ['./legal-terms.component.css']
})
export class LegalTermsComponent implements OnInit {

  constructor(
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Mentions légales - UTile");
  }

}
