import { Component, Inject, LOCALE_ID, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AboutDialogComponent } from '../about-dialog/about-dialog.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'ac-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  isBrowser: boolean;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    @Inject(PLATFORM_ID) private platformId,
    private dialog: MatDialog
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  showAbout() {
    this.dialog.open(AboutDialogComponent, {
      maxWidth: 600
    });
  }

  changeLangage(lang) {
    if (this.isBrowser) {
      location.assign(`/${lang}${location.pathname.replace(`/${this.locale}`, '')}`);
    }
  }
}
