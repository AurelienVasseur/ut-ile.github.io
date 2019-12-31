import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-wip',
  templateUrl: './wip.component.html',
  styleUrls: ['./wip.component.css']
})
export class WipComponent implements OnInit {
  @Input() featureStatus: string;
  @Input() featureMessage: string;
  @Input() previousRoute: string;

  constructor() { }

  ngOnInit() {
  }

}
