import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { GuidesComponent } from './guides.component';
import { DialogAddGuideComponent } from './dialogs/addGuide/addGuide.component';

const routes = [
    {
        path     : 'stages/:id',
        component: GuidesComponent
    },
    {
        path     : 'stages/dialogs/addGuide',
        component: DialogAddGuideComponent
    }
];

@NgModule({
    declarations: [
        GuidesComponent,
        DialogAddGuideComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports     : [
        GuidesComponent,
        DialogAddGuideComponent
    ]
})

export class GuidesModule
{
}
