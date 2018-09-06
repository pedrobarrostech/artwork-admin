import { ProductModule } from './product.module';

describe('ProductModule', () => {
  let productsModule: ProductModule;

  beforeEach(() => {
    productsModule = new ProductModule();
  });

  it('should create an instance', () => {
    expect(productsModule).toBeTruthy();
  });
});
