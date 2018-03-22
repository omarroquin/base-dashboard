import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';
import { SharedModule } from './core/modules/shared.module';
import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { FuseConfigService } from './core/services/config.service';
import { FuseNavigationService } from './core/components/navigation/navigation.service';
import { StagesModule } from './main/content/stages/stages.module';
import { UsersModule } from './main/content/users/users.module';
import { ClientsModule } from './main/content/clients/clients.module';
import { GuidesModule } from './main/content/guides/guides.module';
import { PagesModule } from './main/content/pages/pages.module';
import { ServicesModule } from './main/content/services/services.module';

const appRoutes: Routes = [
    {
        path      : '**',
        redirectTo: 'auth/login'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
        SharedModule,
        FuseMainModule,
        StagesModule,
        UsersModule,
        ClientsModule,
        GuidesModule,
        PagesModule,
        ServicesModule
    ],
    providers   : [
        FuseSplashScreenService,
        FuseConfigService,
        FuseNavigationService
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
