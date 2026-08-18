import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterLink, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template #content>
      <ng-content />
    </ng-template>

    @if (routerLink()) {
      <a [routerLink]="routerLink()" [class]="classes()">
        <ng-container [ngTemplateOutlet]="content" />
      </a>
    } @else if (href()) {
      <a [href]="href()" [target]="target()" [class]="classes()">
        <ng-container [ngTemplateOutlet]="content" />
      </a>
    } @else {
      <button [type]="type()" [class]="classes()">
        <ng-container [ngTemplateOutlet]="content" />
      </button>
    }
  `,
})
export class Button {
  readonly variant = input<ButtonVariant>('primary');
  readonly routerLink = input<string | undefined>(undefined);
  readonly href = input<string | undefined>(undefined);
  readonly target = input('_self');
  readonly type = input<'button' | 'submit'>('button');

  protected classes(): string {
    return { primary: 'btn-primary', secondary: 'btn-secondary', outline: 'btn-outline' }[
      this.variant()
    ];
  }
}
