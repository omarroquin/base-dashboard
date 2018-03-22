import { NgModule } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';
import { AuthorizationService } from './authorization/authorization.service';
import { StagesService } from './stages/stages.service';
import { GraphqlService } from './graphql/graphql.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';

const routes = [
    {
        path     : 'services/authorization',
        component: AuthorizationService
    },
    {
        path     : 'services/stages',
        component: StagesService
    },
    {
        path     : 'services/authorization',
        component: GraphqlService
    }
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        BrowserModule,
        HttpClientModule,
        ApolloModule,
        HttpLinkModule
    ],
    declarations: [

    ],
    providers: [
      CookieService,
      AuthorizationService,
      StagesService,
      GraphqlService
    ]
})
export class ServicesModule
{
}
