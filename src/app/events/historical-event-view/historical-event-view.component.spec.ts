import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalEventViewComponent } from './historical-event-view.component';

describe('HistoricalEventViewComponent', () => {
  let component: HistoricalEventViewComponent;
  let fixture: ComponentFixture<HistoricalEventViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricalEventViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoricalEventViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
