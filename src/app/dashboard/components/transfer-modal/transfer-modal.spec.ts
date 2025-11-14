import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferModal } from './transfer-modal';

describe('TransferModal', () => {
  let component: TransferModal;
  let fixture: ComponentFixture<TransferModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
