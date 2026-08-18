import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="heading" [class.heading--center]="center()">
      @if (eyebrow()) {
        <span class="eyebrow">{{ eyebrow() }}</span>
      }
      <h2 class="title">{{ title() }}</h2>
      @if (subtitle()) {
        <p class="subtitle">{{ subtitle() }}</p>
      }
    </div>
  `,
  styles: [
    `
      .heading {
        max-width: 640px;
        margin-bottom: clamp(2rem, 5vw, 3.5rem);
      }
      .heading--center {
        margin-inline: auto;
        text-align: center;
      }
      .eyebrow {
        display: inline-block;
        font-family: var(--font-heading);
        font-weight: 600;
        font-size: 0.8rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--color-primary);
        background: rgba(15, 106, 68, 0.08);
        padding: 0.35rem 0.9rem;
        border-radius: var(--radius-full);
        margin-bottom: 1rem;
      }
      .title {
        font-size: clamp(1.75rem, 4vw, 2.75rem);
        line-height: 1.15;
        margin: 0 0 0.75rem;
      }
      .subtitle {
        font-family: var(--font-body);
        font-size: 1.05rem;
        line-height: 1.7;
        color: var(--color-text-muted);
        margin: 0;
      }
    `,
  ],
})
export class SectionHeading {
  readonly eyebrow = input('');
  readonly title = input.required<string>();
  readonly subtitle = input('');
  readonly center = input(false);
}
