import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

const MIN_MS = 4000;
const start = Date.now();

const overlayAlreadyShown = sessionStorage.getItem('overlayShown') === 'true';

function hideOverlay() {
  const elapsed = Date.now() - start;
  const wait = Math.max(0, MIN_MS - elapsed);
  setTimeout(() => {
    const ov = document.getElementById('loading-overlay');
    if (ov) {
      ov.style.opacity = '0';
      setTimeout(() => ov.remove(), 500);
    }
  }, wait);
}

if (!overlayAlreadyShown) {
  sessionStorage.setItem('overlayShown', 'true');

  bootstrapApplication(AppComponent, appConfig)
    .then(hideOverlay)
    .catch((err) => {
      console.error(err);
      hideOverlay();
    });
} else {
  const ov = document.getElementById('loading-overlay');
  if (ov) ov.remove();

  bootstrapApplication(AppComponent, appConfig).catch((err) =>
    console.error(err)
  );
}
