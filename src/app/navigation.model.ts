export class NavigationModel
{
    public model: any[];

    constructor()
    {
        this.model = [
            {
                'title': 'Applications',
                'type' : 'group',
                'children': [
                    {
                        'title': 'Etapas',
                        'type' : 'item',
                        'icon' : 'email',
                        'url'  : '/stages'
                    },
                    {
                        'title': 'Usuarios',
                        'type' : 'item',
                        'icon' : 'person',
                        'url'  : '/users'
                    },
                    {
                        'title': 'Clientes',
                        'type' : 'item',
                        'icon' : 'person',
                        'url'  : '/clients'
                    }
                ]
            }
        ];
    }
}
