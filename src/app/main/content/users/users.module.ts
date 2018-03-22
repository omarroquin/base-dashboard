import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { UsersComponent } from './users.component';
import { DialogAddUserComponet } from './dialogs/addUser/addUser.component';

const routes = [
    {
        path     : 'users',
        component: UsersComponent
    },
    {
        path     : 'users/dialogs/addUser',
        component: DialogAddUserComponet
    }
];

@NgModule({
    declarations: [
        UsersComponent,
        DialogAddUserComponet
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
        UsersComponent,
        DialogAddUserComponet
    ]
})
export class UsersModule
{
}
