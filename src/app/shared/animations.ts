import { animate, animation, keyframes, style } from '@angular/animations';

export const bubbleAnimation = animation([
  style({transform: 'scale(1)'}),
  animate('{{ timings }}', keyframes([
    style({transform: 'scale(1)', offset: 0}),
    style({transform: 'scale({{ scale }})', offset: 0.5}),
    style({transform: 'scale(1)', offset: 1})
  ]))
]);

export const fadeInAnimation = animation([
  animate('{{ timings }}', keyframes([
    style({opacity: 0, offset: 0}),
    style({opacity: 1, offset: 1})
  ]))
]);
