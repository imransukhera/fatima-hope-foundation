import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="toggle"
      (click)="theme.toggle()"
      [attr.aria-label]="theme.theme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
    >
      <i class="pi" [class.pi-sun]="theme.theme() === 'dark'" [class.pi-moon]="theme.theme() === 'light'"></i>
    </button>
  `,
  styles: [
    `
      .toggle {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: var(--radius-full);
        border: 1px solid var(--color-border);
        background: transparent;
        color: var(--color-text);
        cursor: pointer;
        transition: all 0.3s var(--ease-out-expo);

        &:hover {
          border-color: var(--color-primary);
          background: rgba(15, 106, 68, 0.08);
          transform: rotate(15deg);
        }
      }
    `,
  ],
})
export class ThemeToggle {
  protected readonly theme = inject(ThemeService);
}
