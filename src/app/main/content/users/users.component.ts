import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../services/authorization/authorization.service';
import { GraphqlService } from '../services/graphql/graphql.service';
import { DialogAddUserComponet } from './dialogs/addUser/addUser.component';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import gql from 'graphql-tag';

const queries = {
  getUsers: gql`
    query {
      users {
        _id name email clientId type
      }
    }
  `,
};

const mutations = {
  userAdd: gql`
    mutation userAdd($user: NewUser!) {
      userAdd(user: $user) {
        _id name email clientId type
      }
    }
  `,
  userRemove: gql`
    mutation userRemove($id: ID!) {
      userRemove(id: $id) {
        _id name email clientId type
      }
    }
  `,
};

@Component({
    selector   : 'users',
    templateUrl: './users.component.html',
    styleUrls  : ['./users.component.scss']
})
export class UsersComponent implements OnInit
{
    rows: any[] = [];
    loadingIndicator = true;
    reorderable = true;

    constructor(
      private authorizationService: AuthorizationService,
      private graphqlService: GraphqlService,
      public dialog: MdDialog
    )
    {

    }

    ngOnInit()
    {
      this.authorizationService.isLogged();
      this.getUsers();
    }

    private async getUsers()
    {
      this.loadingIndicator = true;
      try {
        this.rows = this.mapUsers((await this.graphqlService.query(queries.getUsers))['data'].users);
        this.loadingIndicator = false;
      } catch(error) {
        this.loadingIndicator = false;
        console.error(error);
      }
    }

    private mapUsers (stages)
    {
      return stages.map(stage => {
        let { _id, name, email, type, clientId } = stage;
        return { _id, name, email, type, clientId };
      });
    }

    public addUser(user)
    {
      let dialogRef = this.dialog.open(DialogAddUserComponet, {
        width: '500px'
      });

      dialogRef.afterClosed().subscribe(async result => {
        if (result) {
          let variables = { user: result };
          try {
            let { _id, name, email, type, clientId } = (await this.graphqlService.mutation(
              mutations.userAdd,
              variables
            ))['data'].userAdd;
            this.rows.push({ _id, name, email, type, clientId });
          } catch(error) {
            console.error(error);
          }
        };
      });
    }

    public async removeUser(user)
    {
      try {
        let removedUser = await this.graphqlService.mutation(
          mutations.userRemove,
          { id: user._id }
        );
        let rows = [...this.rows];
        rows.splice(user.$$index, 1);
        this.rows = [...rows];
      } catch(err) {
        console.error(err);
      }
    }
}
