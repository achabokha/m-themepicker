import { Component, HostBinding } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemeStorage } from '../theme-picker/theme-storage/theme-storage';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

    @HostBinding("class") componentCssClass;
    initThemeName: string;

    constructor(private breakpointObserver: BreakpointObserver, public overlayContainer: OverlayContainer, private themeStorage: ThemeStorage) {

        // must do theme here, as nav a parent component for the whole app --
        this.componentCssClass = this.initThemeName = this.themeStorage.getStoredThemeName();
        this.onThemeChanged(this.initThemeName);

    }

    onThemeChanged(theme: string) {
        this.overlayContainer.getContainerElement().classList.remove(this.componentCssClass);
        this.overlayContainer.getContainerElement().classList.add(theme);
        this.componentCssClass = theme;
    }

}
