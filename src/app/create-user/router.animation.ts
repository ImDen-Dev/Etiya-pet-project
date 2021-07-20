import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

const animationStyle = (isBackward = false, transitionMs = 200) => [
  style({ position: 'relative' }),
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
    }),
  ]),
  query(':enter', [style({ left: isBackward ? '-100%' : '100%' })]),
  query(':leave', animateChild()),
  group([
    query(':leave', [
      animate(
        `${transitionMs}ms ease-out`,
        style({ left: isBackward ? '100%' : '-100%' })
      ),
    ]),
    query(':enter', [
      animate(`${transitionMs}ms ease-out`, style({ left: '0' })),
    ]),
  ]),
  query(':enter', animateChild()),
];

export const slideInAnimation = trigger('routeAnimations', [
  transition('UserInfoForm => AddressForm', animationStyle()),
  transition('AddressForm => UserInfo', animationStyle()),
  transition('AddressForm => UserInfoForm', animationStyle(true)),
  transition('UserInfo => AddressForm', animationStyle(true)),
]);
