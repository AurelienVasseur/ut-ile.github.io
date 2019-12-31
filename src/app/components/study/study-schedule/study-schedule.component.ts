import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-study-schedule',
  templateUrl: './study-schedule.component.html',
  styleUrls: ['./study-schedule.component.css']
})
export class StudyScheduleComponent implements OnInit {
  featureStatus: string;
  featureMessage: string;
  previousRoute: string;


  constructor(
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Sched'UT");
    this.featureStatus = "Sched'UT est actuellement en cours de développement.";
    this.featureMessage = "Sched'UT permettra de générer votre emploi du temps personnel, celui des associations mais également de gérer la réservation de salles et de recevoir les notifications importantes de vos UVs.";
    this.previousRoute = this.router.url.substring(0, this.router.url.lastIndexOf('/'));
  }

}
