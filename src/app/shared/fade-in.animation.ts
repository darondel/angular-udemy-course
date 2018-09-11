import { animate, AnimationTriggerMetadata, keyframes, style, transition, trigger } from '@angular/animations';

export function fadeIn(timings: string | number): AnimationTriggerMetadata {
  return trigger('fadeIn', [
    transition(':enter', [
      animate(timings, keyframes([
        style({opacity: 0, offset: 0}),
        style({opacity: 1, offset: 1.0})
      ]))
    ])
  ]);
}
