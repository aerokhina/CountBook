import { TestBed } from '@angular/core/testing';

import { DashboardModelService } from './dashboard-model.service';

describe('DashboardModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardModelService = TestBed.get(DashboardModelService);
    expect(service).toBeTruthy();
  });
});
