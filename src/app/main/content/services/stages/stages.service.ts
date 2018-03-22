import { Injectable } from '@angular/core';
import { GraphqlService } from '../graphql/graphql.service';
import { config } from '../../../../../config';
import gql from 'graphql-tag';

@Injectable()
export class StagesService
{
  baseUrl: string = config.backendUrl;

  constructor(
    private graphqlService: GraphqlService
  )
  {

  }

  public async getStages(query)
  {
    return await this.graphqlService.query(query);
  }

  public async addStage(mutation, variables)
  {
    return await this.graphqlService.mutation(mutation, variables);
  }

  public async removeStage(mutation, variables)
  {
    return await this.graphqlService.mutation(mutation, variables);
  }
}
