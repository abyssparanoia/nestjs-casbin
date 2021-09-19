import { Test, TestingModule } from '@nestjs/testing';
import { NestCasbinService } from './nest-casbin.service';
import { Provider } from '@nestjs/common';
import { CASBIN_ENFORCER } from './nest-casbin.constants';
import { newEnforcer } from 'casbin';
import * as path from 'path';

describe('NestCasbinService', () => {
  let service: NestCasbinService;

  const casbinEnforcerProvider: Provider = {
    provide: CASBIN_ENFORCER,
    useFactory: async () => {
      const e = await newEnforcer(
        path.resolve(__dirname, './rbac_model.test.conf'),
        path.resolve(__dirname, './rbac_model.test.csv')
      );
      await e.loadPolicy();
      return e;
    },
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [casbinEnforcerProvider, NestCasbinService],
      exports: [NestCasbinService],
    }).compile();

    service = module.get<NestCasbinService>(NestCasbinService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
