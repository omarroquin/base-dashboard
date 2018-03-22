import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { ClientComponent } from './clients.component';
import { DialogAddClientComponet } from './dialogs/addClient/DialogAddClient.component';

const routes = [
    {
        path     : 'clients',
        component: ClientComponent
    },
    {
        path     : 'clients/dialogs/addClient',
        component: DialogAddClientComponet
    }
];

@NgModule({
    declarations: [
        ClientComponent,
        DialogAddClientComponet
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
        ClientComponent,
        DialogAddClientComponet
    ]
})
export class ClientsModule
{
}
