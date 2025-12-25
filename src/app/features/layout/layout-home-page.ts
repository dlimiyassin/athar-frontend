import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { TopbarWidget } from "../home-page/home-components/topbarwidget.component";
import { FooterWidget } from "../home-page/home-components/footerwidget";

@Component({
  selector: 'layout-home-page',
    standalone: true,
    imports: [RouterModule, RippleModule, StyleClassModule, ButtonModule, DividerModule, TopbarWidget, FooterWidget],
template: `
  <div class="w-full max-w-full  bg-surface-0 dark:bg-surface-900">
    <div id="home" class="landing-wrapper">
      
      <div class="layout-topbar bg-white bg-surface-0 dark:bg-surface-900">
        <topbar-widget style="padding: 3rem;" class="layout-topbar"/>
      </div>

      <div style="margin-top: 6rem;">
        <router-outlet></router-outlet>
      </div>
      
      <footer-widget />
    </div>
  </div>
`

})
export class LayoutHomePage {

}