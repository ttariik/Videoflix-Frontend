import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosOfferComponent } from './videos-offer.component';

describe('VideosOfferComponent', () => {
  let component: VideosOfferComponent;
  let fixture: ComponentFixture<VideosOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideosOfferComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideosOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
