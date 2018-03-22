import { NgModule } from '@angular/core';

import { Login2Module } from './authentication/login-2/login-2.module';
import { Error404Module } from './errors/404/error-404.module';
import { Error500Module } from './errors/500/error-500.module';

@NgModule({
    imports: [
        // Auth
        Login2Module,

        // Errors
        Error404Module,
        Error500Module
    ]
})
export class PagesModule
{
}
