import { createAction, props } from '@ngrx/store'
import { AuthApiActionsTypes } from './auth-api.actions.types'
import { AuthSignupResponse } from '../auth.service'

export const signupSuccess = createAction(
  AuthApiActionsTypes.SignupSuccess,
  props<{authSignupResponse: AuthSignupResponse}>(),
)
