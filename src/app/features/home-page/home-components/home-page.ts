import { Component } from '@angular/core';
import { HighlightsWidget } from './highlightswidget';
import { HeroWidget } from './herowidget';
import { ParticipationWidget } from './participationwidget';
import { ActivitiesWidget } from "./activiteswidget";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HighlightsWidget, ParticipationWidget, HeroWidget, ActivitiesWidget],
  template: `
      <hero-widget />
      <activities-widget />
      <highlights-widget />
      <participation-widget />
 `,
})
export class HomePage {

}
