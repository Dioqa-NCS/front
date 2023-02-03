import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromBooks from './compte.reducer'

export const selectCompteFeature = createFeatureSelector<fromBooks.State>('comptes')

export const selectComptes = createSelector(
  selectCompteFeature,
  (state) => state.comptes,
)

export const selectComptesEnable = createSelector(
  selectComptes,
  (comptes) => comptes.filter(compte => compte.estValider === '1'),
)

export const selectComptesDisable = createSelector(
  selectComptes,
  (comptes) => comptes.filter(compte => compte.estValider === 'O'),
)
