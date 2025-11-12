import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="app-container">
      <header class="app-header">
        <div class="container">
          <div class="header-content">
            <div class="cross-icon">☦</div>
            <h1>Orthodox Church Library</h1>
            <p class="subtitle">AI-Powered Document Search</p>
          </div>
        </div>
      </header>
      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
      <footer class="app-footer">
        <div class="container">
          <p>Byzantine Musical Notations & Feast Documents</p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .app-header {
      background: linear-gradient(90deg, var(--deep-burgundy) 0%, var(--dark-blue) 100%);
      border-bottom: 3px solid var(--primary-gold);
      box-shadow: 0 4px 6px var(--shadow);
      padding: 2rem 0;
    }

    .header-content {
      text-align: center;
    }

    .cross-icon {
      font-size: 3rem;
      color: var(--primary-gold);
      margin-bottom: 0.5rem;
      text-shadow: 0 2px 4px var(--shadow);
    }

    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      text-shadow: 2px 2px 4px var(--shadow);
    }

    .subtitle {
      font-size: 1.2rem;
      color: var(--gold-accent);
      font-style: italic;
    }

    .app-main {
      flex: 1;
      padding: 2rem 0;
    }

    .app-footer {
      background: var(--deep-burgundy);
      border-top: 2px solid var(--primary-gold);
      padding: 1.5rem 0;
      text-align: center;
      margin-top: auto;
    }

    .app-footer p {
      color: var(--ivory);
      font-size: 0.95rem;
    }
  `]
})
export class AppComponent {
  title = 'Orthodox Church Library';
}
