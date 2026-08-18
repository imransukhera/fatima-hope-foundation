import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      class="whatsapp-fab"
      [href]="whatsappLink"
      target="_blank"
      rel="noopener"
      aria-label="Chat with us on WhatsApp"
    >
      <i class="pi pi-whatsapp"></i>
    </a>
  `,
  styles: [
    `
      .whatsapp-fab {
        position: fixed;
        right: 1.5rem;
        bottom: 1.5rem;
        width: 3.5rem;
        height: 3.5rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: #25d366;
        color: #fff;
        font-size: 1.6rem;
        box-shadow: 0 8px 24px rgba(37, 211, 102, 0.4);
        z-index: 40;
        transition: transform 0.3s var(--ease-out-expo);
        animation: pulse 2.4s infinite;

        &:hover {
          transform: scale(1.08);
        }
      }

      @keyframes pulse {
        0%, 100% { box-shadow: 0 8px 24px rgba(37, 211, 102, 0.4); }
        50% { box-shadow: 0 8px 32px rgba(37, 211, 102, 0.65); }
      }
    `,
  ],
})
export class WhatsappButton {
  protected readonly whatsappLink = `https://wa.me/${environment.contact.whatsapp}`;
}
