import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { FuseConfigService } from '../../core/services/config.service';
import { AuthorizationService } from '../content/services/authorization/authorization.service';

@Component({
    selector   : 'fuse-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls  : ['./toolbar.component.scss']
})

export class FuseToolbarComponent
{
    user: object = {
      name: null
    };
    userStatusOptions: any[];
    languages: any;
    selectedLanguage: any;
    showSpinner: boolean;
    horizontalNav: boolean;

    constructor(
        private router: Router,
        private fuseConfig: FuseConfigService,
        private authorizationService: AuthorizationService
    )
    {
        this.userStatusOptions = [
            {
                'title': 'Online',
                'icon' : 'icon-checkbox-marked-circle',
                'color': '#4CAF50'
            },
            {
                'title': 'Away',
                'icon' : 'icon-clock',
                'color': '#FFC107'
            },
            {
                'title': 'Do not Disturb',
                'icon' : 'icon-minus-circle',
                'color': '#F44336'
            },
            {
                'title': 'Invisible',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#BDBDBD'
            },
            {
                'title': 'Offline',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#616161'
            }
        ];

        this.languages = [
            {
                'id'   : 'en',
                'title': 'English',
                'flag' : 'us'
            },
            {
                'id'   : 'es',
                'title': 'Spanish',
                'flag' : 'es'
            },
            {
                'id'   : 'tr',
                'title': 'Turkish',
                'flag' : 'tr'
            }
        ];

        this.selectedLanguage = this.languages[0];

        router.events.subscribe(
            (event) => {
                if ( event instanceof NavigationStart )
                {
                    this.showSpinner = true;
                }
                if ( event instanceof NavigationEnd )
                {
                    this.showSpinner = false;
                }
            });

        this.fuseConfig.onSettingsChanged.subscribe((settings) => {
            this.horizontalNav = settings.layout.navigation === 'top';
        });

    }

    async ngOnInit()
    {
      try {
        this.user = await this.authorizationService.isLogged();
      } catch(error) {
        console.error(error);
      }
    }

    loggout()
    {
      this.authorizationService.deleteToken();
    }

    search(value)
    {
        // Do your search here...
        console.log(value);
    }
}
