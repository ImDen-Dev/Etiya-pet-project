import { Action, Selector, State, StateContext } from '@ngxs/store';
import { StartLoading, StopLoading } from './ui.actions';
import { Injectable } from '@angular/core';

export interface UiStateModel {
  isLoading: boolean;
}

@State<UiStateModel>({
  name: 'UI',
  defaults: {
    isLoading: false,
  },
})
@Injectable()
export class UiState {
  @Selector()
  static isLoading({ isLoading }: UiStateModel): boolean {
    return isLoading;
  }

  @Action(StartLoading)
  startLoading({ patchState }: StateContext<UiStateModel>) {
    patchState({
      isLoading: true,
    });
  }

  @Action(StopLoading)
  stopLoading({ patchState }: StateContext<UiStateModel>) {
    patchState({
      isLoading: false,
    });
  }
}
