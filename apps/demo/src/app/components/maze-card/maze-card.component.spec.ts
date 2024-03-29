import { of } from 'rxjs';
import { Shallow } from 'shallow-render';
import { MazeCardComponent } from './maze-card.component';
import { ComponentsModule } from '../components.module';
import { StuffService } from '../../stuff/stuff.service';
import { LoggingService } from '../../logging/logging.service';
import { SilentLogger } from '../../logging/silent-logger';

const mockStuffService = { getStuff: jest.fn(() => of([])) };

describe('MazeCardComponent', () => {
  let component: Shallow<MazeCardComponent>;

  beforeEach(() => {
    component = new Shallow(MazeCardComponent, ComponentsModule)
      .provideMock({ provide: StuffService, useValue: mockStuffService })
      .provideMock({ provide: LoggingService, useClass: SilentLogger });
    jest.clearAllMocks();
  });

  it('should render', async () => {
    const rendering = await component.render();
    expect(rendering).toBeTruthy();
  });

  it('should have as title "Valant demo"', async () => {
    const { instance } = await component.render();
    expect(instance.title).toBe('Valant demo');
  });

  it('should render a banner message', async () => {
    const { find } = await component.render();
    expect(find('h1').nativeElement.textContent).toBe('Welcome to Valant demo');
  });

  it('gets stuff from the API on init', async () => {
    await component.render();
    expect(mockStuffService.getStuff).toHaveBeenCalledTimes(1);
  });
});
