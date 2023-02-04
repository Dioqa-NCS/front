import { createAction, props } from '@ngrx/store'
import { AuthRequestAccountActionsTypes } from './auth-request-account.actions.types'
import { AuthSignupRequest } from '../auth.service'

export const signup = createAction(
  AuthRequestAccountActionsTypes.Signup,
  props<{userSignupRequest: Partial<AuthSignupRequest>}>(),
)
