import { Injectable } from '@angular/core';

import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { SpinnerOverlayComponent } from '../../spinner/spinner-overlay.component';

@Injectable({
  providedIn: 'root',
})
export class SpinnerOverlayService {
  private overlayRef: OverlayRef = null;

  private isShowing = false;

  constructor(private overlay: Overlay) {}

  public show(message = 'Loading...') {
    if (this.isShowing) return;
    // Returns an OverlayRef (which is a PortalHost)
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create();
    }

    // Create ComponentPortal that can be attached to a PortalHost
    const spinnerOverlayPortal = new ComponentPortal(SpinnerOverlayComponent);
    const component = this.overlayRef.attach(spinnerOverlayPortal); // Attach ComponentPortal to PortalHost
    component.instance.message = message;
    this.isShowing = true;
  }

  public hide() {
    if (this.isShowing) {
      if (this.overlayRef) {
        this.overlayRef.detach();
      }
    }
    this.isShowing = false;
  }
}
